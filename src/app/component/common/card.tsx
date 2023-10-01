"use client"
import { useState, useEffect } from "react";
import { FC } from "react";
import { cardinfo} from "../../data/carddata"

const Card: FC=({}) => {
const Clock = (time:string)=>{
    const start = Date.parse(time)
  
    const creationDate = new Date(start);// Date of creation of the nft

   const calculateTPass =(startDate:Date) =>{

    const now = new Date();
    
    const tDif = now.getTime() - startDate.getTime();
    const hours = Math.floor(tDif / (1000 * 60 * 60));
    const minutes = Math.floor((tDif % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((tDif % (1000 * 60)) / 1000);
  
    return { hours, minutes, seconds };
  
   }
 
   const [tPass, setTpass] = useState(
  calculateTPass(creationDate)
 )

 useEffect(() => {
  const interval = setInterval(() => {
    const elapsed = calculateTPass(creationDate);
    setTpass(elapsed);
  }, 1000);

}, []);

  return (
    <span className="cardCount mr-2 mb-2"> {tPass.hours}h {tPass.minutes}m {tPass.seconds}s </span>      
  );
}
    return ( <>
    <div className="flex snap-x gap-5 " >
         {cardinfo.map((cardStructure) =>(
        <div key={cardStructure.nft}className=" overflow-hidden shadow-lg bg-white border-black cardContainer rounded-2xl text-xs  scroll-smooth hover:scroll-auto snap-start">
        <img className="w-full rounded-xl cardImg " src={cardStructure.imageId} alt={cardStructure.title}/>
         <button className="cardChild"><img src="./cards/Duration.svg" alt="heart simbol" /></button> 
          {Clock(cardStructure.timeOfCreation)}  
         <div className="text-gray-400 grid grid-rows-2 grid-cols-4 px-4 gap-10">
          <div className="col-start-1 col-span-3">
          <h3 className="text-slate-900 text-base">{cardStructure.title}</h3>
            <span>APR {cardStructure.Apr}% Collateral {cardStructure.collateral}%</span>
           </div>
            <div className=" col-start-1 col-span-2 ">
            <h6>current bid</h6>
            <span className="cardBid"><img src="./ethereum.svg" alt="ethereum icon" className="inline-block"/>{cardStructure.bid}ETH</span>            
            </div>
            <button className="buttonPurple col-start-3 col-span-2  row-start-2 ">supply</button>  
          </div>  
      </div>
))}

    </div>
    </> 
   );
}
 
export default Card;
