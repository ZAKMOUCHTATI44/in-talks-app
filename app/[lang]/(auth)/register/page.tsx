import RegisterForm from "@/components/auth/RegisterForm";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";

interface LangProps {
  params: Promise<{ lang: Locale }>; 
}

const page = async ({ params }: LangProps) => {
  const { lang } = await params; 
  const { register } = await getDictionary(lang);
  return (
    <>
   <section>
        <h2 className="text-3xl font-semibold">{register.title}</h2>
        <h4>{register.subtitle}</h4>
      </section>
      <RegisterForm content={register.form} />
    </>
  );
};

export default page;