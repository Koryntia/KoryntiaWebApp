import { getLoans } from "@/lib/loan-db";
import React from "react";
import NoLoansFound from "./no-loans-found";
import Loans from "./loans";
import LoanForm from "./loan-form";

const page = async () => {
  let markup: JSX.Element;

  const res = await getLoans();

  if (res.success) {
    if (res.data.loans) {
      if (res.data.results) {
        markup = <Loans loans={res.data.loans} results={res.data.results} />;
      } else {
        markup = <NoLoansFound />;
      }
    } else {
      markup = <NoLoansFound />;
    }
  } else {
    markup = <NoLoansFound message={String(res.error)} />;
  }

  return (
    <>
      <LoanForm />
      {markup}
    </>
  );
};

export default page;
