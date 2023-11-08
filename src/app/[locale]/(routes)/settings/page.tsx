import { FC } from "react";
interface pageProps {
    
}
 
const page: FC<pageProps> = () => {
    return ( <>
         <div>
            <div>
               <h1>hola</h1>
               <h3>hola</h3>
            </div>
            <div>
              <span>hola</span>
              <button className="buttonPurple">hola</button>
              <button className="disabledButton">hola</button>
            </div>
         </div>
    </> );
}
 
export default page;