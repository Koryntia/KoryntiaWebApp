import * as React from "react";
const WalletConnect = (props: any) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000000"
    {...props}
    className="h-12 w-12"
  >
    <path d="m44 34-6 6-6-6-6 6-6-6" />
    <path d="M23.51 27.51a12 12 0 0 1 17 0" />
    <circle cx={32} cy={32} r={24} />
  </svg>
);
export default WalletConnect;
