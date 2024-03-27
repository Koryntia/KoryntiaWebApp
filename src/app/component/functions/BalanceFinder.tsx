import { useAccount, useBalance } from "wagmi";
import { FC } from "react";

interface pageProps {
  address: any;
}

const Balance: FC<pageProps> = ({ address }) => {
  const { data, isLoading, isError } = useBalance({
    address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
};

export default Balance;
