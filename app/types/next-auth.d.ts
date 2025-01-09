
// types/next-auth.d.ts

/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  interface JWT {
    accessToken?: string
    provider?:string
  }
  interface User {
    name:string
    email:string
    image?:string
    phone: string
    accessToken:string
    provider?:string
    role:string
  }
  interface Session {
    user: User
  }
}