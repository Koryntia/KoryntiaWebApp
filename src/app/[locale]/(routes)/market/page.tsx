import { AvailablePositions } from "@/app/component/market/available-positions";
import { FC } from "react";
interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div>
      <AvailablePositions />
    </div>
  );
};

export default page;
