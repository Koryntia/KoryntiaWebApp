"use client"
import { MarketPositionDetail } from "@/app/component/market/market-position-detail";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { getMarketLoan, getMarketLoans } from "@/services/api/market-loans";
import { usePathname } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
interface pageProps { }

const Page: FC<pageProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loanData, setLoanData] = useState<ILoanRequest | null>(null);
  const [marketLoans, setMarketLoans] = useState<ILoanRequest[]>([]);

  const pathname = usePathname()

  const handleGetMarketLoan = useCallback(() => {
    if (loanData) return
    const paths = pathname.split('/');
    setIsLoading(true);
    getMarketLoan(paths[2])
      .then((data) => data ? setLoanData(data) : setLoanData(null))
      .finally(() => setIsLoading(false));

    getMarketLoans()
      .then((data) => data ? setMarketLoans(data) : setMarketLoans([]))
      .finally(() => setIsLoading(false));
  }, [pathname, loanData]);


  useEffect(() => {
    handleGetMarketLoan()
  }, [handleGetMarketLoan]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <MarketPositionDetail loanData={loanData} marketLoans={marketLoans || []} />
    </div >
  );
};

export default Page;
