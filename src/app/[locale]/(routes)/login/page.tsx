import Login from "@/app/component/login/Login";
import { FC } from "react";
interface pageProps {

}

const page: FC<pageProps> = () => {
    return (
        <div>
            <Login />
        </div>
    );
}

export default page;