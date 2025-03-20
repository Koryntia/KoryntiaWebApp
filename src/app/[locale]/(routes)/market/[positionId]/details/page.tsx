"use client"

import { MarketPositionDetail } from "@/app/component/market/market-position-detail";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { getMarketLoan, getMarketLoans } from "@/services/api/market-loans";
import { usePathname } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { Spinner } from '@/app/component/common/Spinner';

interface pageProps { }

const Page: FC<pageProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loanData, setLoanData] = useState<ILoanRequest | null>(null);
  const [marketLoans, setMarketLoans] = useState<ILoanRequest[]>([]);

  const pathname = usePathname();

  const handleGetMarketLoan = useCallback(() => {
    if (loanData) {
      return;
    }
    const paths = pathname.split('/');
    const loanIdParam = paths[3];

    setIsLoading(true);

    getMarketLoan(loanIdParam)
      .then((data) => {
         if (data) {
           setLoanData(data);
         } else {
           setLoanData(null);
         }
      })
      .catch((err) => {
         console.error("handleGetMarketLoan: Error in getMarketLoan:", err);
      })
      .finally(() => {
         setIsLoading(false);
      });

    getMarketLoans()
      .then((data) => {
         if (data) {
           setMarketLoans(data);
         } else {
           setMarketLoans([]);
         }
      })
      .catch((err) => {
         console.error("handleGetMarketLoan: Error in getMarketLoans:", err);
      })
      .finally(() => {
         setIsLoading(false);
      });
  }, [pathname, loanData]);

  useEffect(() => {
    handleGetMarketLoan();
  }, [handleGetMarketLoan]);

  if (isLoading) {
    return (
      <div className="justify-center flex items-center w-full mt-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <MarketPositionDetail loanData={loanData} marketLoans={marketLoans || []} />
    </div>
  );
};

export default Page;
