import "@/app/css/auth.css";
import LoginForm from "@/components/auth/LoginForm";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";

interface LangProps {
  params: Promise<{ lang: Locale }>; 
}

const page = async ({ params }: LangProps) => {
  const { lang } = await params; 
  const { login } = await getDictionary(lang);
  return (
    <>
      <section className="text-white">
        <h2 className="text-3xl font-semibold">{login.title}</h2>
        <h4>{login.subtitle}</h4>
      </section>
      <LoginForm content={login.form} />
    </>
  );
};

export default page;