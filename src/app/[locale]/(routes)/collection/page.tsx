import { FC } from "react";
import { ConnectButton } from "@/services/conectwallet/connectButton";
interface pageProps {
    
}
 
const page: FC<pageProps> = () => {
    return ( <ConnectButton/>  );
}
 
export default page;