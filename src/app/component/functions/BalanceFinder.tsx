//This function can be used to calculate the account balance
//used to verify if the account has the funds to make the loan
import { useAccount, useBalance } from "wagmi";
import { FC } from "react";

interface pageProps {
  address: any;
}
const Balance: FC<pageProps> = ({ address }) => {
  // const { address } = useAccount();

  // const { data, isError, isLoading } = useBalance({
  //   address: address,
  //   formatUnits: "wei",
  //   staleTime: 2_000,
  //   scopeKey: "wagmi",
  //   onSettled(data, error) {
  //     console.log("Settled", { data, error });
  //   },
  // });
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
