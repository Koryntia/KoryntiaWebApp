import { getLoans } from "@/lib/loan-db";
import React from "react";
import NoLoansFound from "./no-loans-found";
import Loans from "./loans";
import LoanForm from "./loan-form";

const page = async () => {
   let markup: JSX.Element;

   //   const res = await getLoans();

   //   if (res.success) {
   //     if (res.data.loans) {
   //       if (res.data.results) {
   //         markup = <Loans loans={res.data.loans} results={res.data.results} />;
   //       } else {
   //         markup = <NoLoansFound />;
   //       }
   //     } else {
   //       markup = <NoLoansFound />;
   //     }
   //   } else {
   //     markup = <NoLoansFound message={String(res.error)} />;
   //   }

   const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/loan");
   const loans = await res.json();

   if (res.status === 200) {
      if (loans.length > 0) {
         markup = <Loans loans={loans} results={loans.length} />;
      } else {
         markup = <NoLoansFound />;
      }
   } else {
      markup = <NoLoansFound message={String(res.statusText)} />;
   }

   return (
      <>
         <LoanForm />
         {markup}
      </>
   );
};

export default page;
