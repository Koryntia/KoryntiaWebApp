import { MarketPositionDetail } from "@/app/component/market/market-position-detail";
import { FC } from "react";
interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div>
      <MarketPositionDetail />
    </div>
  );
};

export default page;
