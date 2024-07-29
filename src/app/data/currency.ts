import { CurrencyOption, CurrencyInfo } from "@/types/liquidation";

export const requestAmountOptions: CurrencyOption[] & CurrencyInfo[] = [
  { name: "USDT", value: "usdt", address: "", image: "/tokens/usdt.svg" },
  { name: "BTC", value: "btc", address: "", image: "/tokens/btc.svg" },
  { name: "USDC", value: "usdc", address: "", image: "/tokens/usdc.svg" },
  { name: "ETH", value: "eth", address: "", image: "/tokens/eth.svg" },
  { name: "LINK", value: "link", address: "", image: "/tokens/link.svg" },
  { name: "MATIC", value: "matic", address: "", image: "/tokens/matic.svg" },
];

export const collateralAmountOptions: CurrencyOption[] & CurrencyInfo[] = [
  { name: "USDT", value: "usdt", address: "", image: "/tokens/usdt.svg" },
  { name: "BTC", value: "btc", address: "", image: "/tokens/btc.svg" },
  { name: "USDC", value: "usdc", address: "", image: "/tokens/usdc.svg" },
  { name: "ETH", value: "eth", address: "", image: "/tokens/eth.svg" },
  { name: "LINK", value: "link", address: "", image: "/tokens/link.svg" },
  { name: "MATIC", value: "matic", address: "", image: "/tokens/matic.svg" },
];
