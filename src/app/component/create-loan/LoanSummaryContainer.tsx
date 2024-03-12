import React, { ReactNode } from "react";

interface LoanSummaryContainerProps {
  children: ReactNode;
  title: string;
}

const LoanSummaryContainer = ({
  children,
  title,
}: LoanSummaryContainerProps) => {
  return (
    <div className="w-full mx-auto flex flex-col gap-2">
      <h3 className="text-textBlack text-lg font-semibold font-raleway leading-[23.4px] mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default LoanSummaryContainer;
