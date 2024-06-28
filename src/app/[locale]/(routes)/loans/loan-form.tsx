import { Input } from "@/app/component/elements/Input";
import { revalidatePath } from "next/cache";
import SubmitButton from "./submit-button";

const emptyData = {
   userAddress: "",
   collateralAmount: "",
   collateralToken: "",
   loanAmount: "",
   loanToken: "",
   loanPeriod: new Date(),
   initialThreshold: "",
   interestRate: "",
   liquidationThreshold: "",
   investorAddress: "",
   loanRequestPeriod: new Date(),
   healthFactor: "",
   nftManager: "",
   nftVersion: "",
   borrowedStatus: "",
   creationDate: new Date(),
   updatedDate: new Date(),
};

export default function LoanForm() {
   async function action(data: FormData) {
      "use server";
      let _data = emptyData;
      data.forEach((value, key) => (_data = { ..._data, [key]: value }));

      _data.loanPeriod = new Date(_data.loanPeriod);
      _data.loanRequestPeriod = new Date(_data.loanRequestPeriod);
      _data.creationDate = new Date(_data.creationDate);
      _data.updatedDate = new Date(_data.updatedDate);
      _data.investorAddress = "0x0000000000000000000000000000000000000000";

      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/new-loan", {
         method: "POST",
         body: JSON.stringify(_data),
      });

      revalidatePath("/loans");
   }

   return (
      <form
         action={action}
         key={Math.random()}
         className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center my-16"
      >
         <Input name="collateralAmount" placeholder="Collateral Amount" />
         <Input name="collateralToken" placeholder="Collateral Token" />
         <Input name="loanAmount" placeholder="Loan Amount" />
         <Input name="loanToken" placeholder="Loan Token" />
         <div className="flex gap-2">
            <label htmlFor="loadPeriod">Loan Repay Deadline</label>
            <Input name="loadPeriod" placeholder="Loan Repay Deadline" type="date" />
         </div>
         <div className="flex gap-2">
            <label htmlFor="loanRequestPeriod">Loan Request Deadline</label>
            <Input name="loanRequestPeriod" placeholder="Loan Request Deadline" type="date" />
         </div>
         <Input name="healthFactor" placeholder="Health Factor" />
         <Input name="interestRate" placeholder="Interest Rate" />
         <Input name="initialThreshold" placeholder="Initial Threshold" />
         <Input name="liquidationThreshold" placeholder="Liquidation Threshold" />
         <Input name="userAddress" placeholder="Borrower Address" />
         <Input name="investorAddress" placeholder="Lender Address" />
         <Input name="nftManager" placeholder="Manager NFT" />
         <Input name="nftVersion" placeholder="Manager NFT Version" />
         <Input name="borrowedStatus" placeholder="Borrowed Status" />
         <Input name="creationDate" placeholder="Creation Date" type="date" />
         <Input name="updatedDate" placeholder="Updated Date" type="date" />

         {/* <button className="px-4 py-1 text-white rounded bg-green-500">Add</button> */}
         <SubmitButton />
      </form>
   );
}
