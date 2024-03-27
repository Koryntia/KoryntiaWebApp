"use server";
import React, { FC } from "react";
import { _TLoan } from "@/models/loan";
import { deleteLoanAction } from "@/app/_action";

type Props = {
  loans: _TLoan[];
  results: number;
};

const Loans: FC<Props> = ({ loans, results }) => {
  async function action(data: FormData) {
    const id = data.get("id");
    if (!id || typeof id !== "string") {
      return;
    }

    // Invoke server action to delete loan
    await deleteLoanAction({ id, path: "/loans" });
  }

  return (
    <section className="space-y-16">
      <p className="my-8">Results: {results}</p>

      {loans.map((loan) => (
        <dl
          key={loan.id}
          className="grid grid-cols-2 md:grid-cols-4 place-items-start text-sm sm:text-base [&>*]:w-full [&>*]:border-b-2 [&>*]:border-dotted [&>*]:py-2 [&>*]:max-w-sm [&>*]:truncate gap-x-4"
        >
          <dt>ID:</dt>
          <dd>{loan.id}</dd>
          <dt>Borrower Address:</dt>
          <dd>{loan.borrowerAddress}</dd>
          <dt>Lender Address:</dt>
          <dd>{loan.lenderAddress}</dd>
          <dt>Collateral Amount:</dt>
          <dd>{loan.collateralAmount}</dd>
          <dt>Collateral Token:</dt>
          <dd>{loan.collateralToken}</dd>
          <dt>Loan Amount:</dt>
          <dd>{loan.loanAmount}</dd>
          <dt>Loan Token:</dt>
          <dd>{loan.loanToken}</dd>
          <dt>Loan Repay Deadline:</dt>
          <dd>{new Date(loan.loanRepayDeadline).toLocaleDateString()}</dd>
          <dt>Loan Request Deadline:</dt>
          <dd>{new Date(loan.loanRequestDeadline).toLocaleDateString()}</dd>
          <dt>Initial Threshold:</dt>
          <dd>{loan.initialThreshold}</dd>
          <dt>Interest Rate:</dt>
          <dd>{loan.interestRate}</dd>
          <dt>Manager NFT</dt>
          <dd>{loan.managerNFT}</dd>
          <dt>Manager NFT Version</dt>
          <dd>{loan.managerNFTVersion}</dd>
        </dl>
      ))}
      <form
        action={action}
        key={Math.random()}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center my-16"
      >
        <input
          type="text"
          name="id"
          placeholder="ID"
          className="border rounded px-2 py-1 flex-1"
        />
        <button className="px-4 py-1 text-black rounded bg-pink-500">
          Delete
        </button>
      </form>
    </section>
  );
};

export default Loans;
