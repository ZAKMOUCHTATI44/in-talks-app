import api from "@/lib/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await api.post("/auth/signin", credentials);
          const { token } = res.data;
          let { user } = res.data;
          user = {
            name: user.fullName,
            email: user.email,
            phone: user.phone,
            accessToken: token,
            role: user.role,
          };
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {

      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      if (account) {
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = `${token.accessToken}`;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account && account.provider != "credentials") {
        try {
          const res = await api.post("/auth/login/callback", {
            ...user,
            provider: account.provider,
            type: account.type,
            providerAccount: account.providerAccountId,
          });
          user.accessToken = res.data.token;
        } catch (error) {
          console.log(error);
          return `/login?error=true`;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
