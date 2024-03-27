"use client";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("HelpCenter");
  return (
    <section>
      <div>{t("title")}</div>
    </section>
  );
};

export default Page;
