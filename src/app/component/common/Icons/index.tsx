import { AiOutlineDollarCircle } from "react-icons/ai";
import { PiCurrencyBtcFill } from "react-icons/pi";
import { FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { SiEightsleep } from "react-icons/si";
import { BiSolidDollarCircle } from "react-icons/bi";

interface IconMapProps {
  currencyName?: string;
  className?: string;
}

const IconMap: React.FC<IconMapProps> = ({ currencyName, className }) => {
  const iconStyle = className
    ? `${className} h-6 w-6 inline text-appColor1`
    : "h-6 w-6 inline text-appColor1";

  switch (currencyName) {
    case "USDT":
      return <AiOutlineDollarCircle className={iconStyle} />;
    case "BTC":
      return <PiCurrencyBtcFill className={iconStyle} />;
    case "USDC":
      return <BiSolidDollarCircle className={iconStyle} />;
    case "ETH":
      return <FaEthereum className={iconStyle} />;
    case "MATIC":
      return <SiEightsleep className={`${iconStyle} -rotate-45`} />;
    case "SOL":
      return <TbCurrencySolana className={iconStyle} />;
    default:
      return null;
  }
};

export default IconMap;
