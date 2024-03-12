import React, { FC } from "react";

type PageTitleProps = {
  title: string;
};

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return (
    <header>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl font-raleway">
        {title}
      </h1>
    </header>
  );
};

export default PageTitle;
