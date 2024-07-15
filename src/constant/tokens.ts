import config from "@/utils/config";
export const getTokenAddress = (tokenName: string) => {
  if (config.NETWORK_ID == "11155111") {
    switch (tokenName) {
      case "ETH/USD":
        return "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
      case "BTC/USD":
        return "0x66194F6C999b28965E0303a84cb8b797273B6b8b";
      case "USDC/USD":
        return "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
      case "LINK/USD":
        return "0x779877a7b0d9e8603169ddbd7836e478b4624789";
      default:
        return "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
    }
  } else {
    return "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
  }
};
