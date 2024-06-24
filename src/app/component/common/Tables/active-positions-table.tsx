"use client";
import { LoanData } from "@/services/api/my-position";
import Image from "next/image";
import { FC } from "react";

import { TbCurrencyEthereum } from "react-icons/tb";

interface TablePorp {
   data: LoanData[];
}
const ActivePositionsTable: FC<TablePorp> = ({ data }) => {
   // const keys = Object.values(data);
   let growt = {};
   const handleColor = (e: string) => {
      let numberGrowt = parseFloat(e);
      if (numberGrowt > 0) {
         growt = {
            color: "lime",
         };

         return (
            <span className="font-semibold " style={growt}>
               +{e}%
            </span>
         );
      }
      if (numberGrowt < 0) {
         growt = {
            color: "red",
         };

         return (
            <span className="font-semibold " style={growt}>
               {e}%
            </span>
         );
      }
      return <span className="font-semibold ">{e}%</span>;
   };

   return (
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
         <thead className="text-xs bg-gray-50 text-gray-400">
            <tr>
               <th scope="col" align="left" className=" py-3">
                  Collection
               </th>
               <th scope="col" align="left" className=" py-3">
                  Amount
               </th>
               <th scope="col" align="left" className=" py-3">
                  APR
               </th>
               <th scope="col" align="left" className=" py-3">
                  Fees
               </th>
               <th scope="col" align="left" className=" py-3">
                  Supplier
               </th>
               <th scope="col" align="center" className=" py-3">
                  Health factor
               </th>
            </tr>
         </thead>
         <tbody>
            {data.map((key, index) => (
               <tr key={index} className="bg-white border-b-2  border-zinc-50">
                  <th scope="row" className="flex items-center py-2 w-[20%]  text-gray-900 whitespace-nowrap text">
                     <Image
                        className="w-8 h-8 rounded-full"
                        src={"/assets/placeholder/image.png"}
                        width={10}
                        height={10}
                        alt="Jese image"
                     />
                     <div className="pl-4">
                        <p className="text-[16px] font-semibold not-italic leading-[20.8px]">{"static"}</p>
                        <p className="font-medium text-[12px] text-slate-400">{"static"}</p>
                     </div>
                  </th>
                  <td className="py-4 w-[10%] text-black font-semibold">
                     <span>
                        <TbCurrencyEthereum className="inline-block  text-appColor1" />
                        {key.loanAmount}
                     </span>
                  </td>
                  <td className="py-4 w-[10%]">
                     <div className="flex items-center">{handleColor("-8")}</div>
                  </td>
                  <td className="py-4 w-[10%]  text-black font-semibold">
                     <span>
                        <TbCurrencyEthereum className="inline-block  text-appColor1" />
                        {"static"}
                     </span>
                  </td>
                  <td className="w-[10%] py-4 text-black font-semibold">
                     <span>{"static"}</span>
                  </td>
                  <td className="w-[20%] py-4 text-black text-center font-semibold">
                     <span className="bg-[#8CB10C] text-[14px] rounded-3xl px-[15px] py-1 text-white">{"static"}</span>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default ActivePositionsTable;
