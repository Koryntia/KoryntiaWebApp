'use client'
import { FC, useState } from "react"
import positionsInfo from "@/app/data/carddata";
import ActivePositionsTable from "./active-positions-table";

const ActivePositions: FC = () => {
    const [active, setActive] = useState(true);
   let activePositionsTableData = active? positionsInfo.slice(0,2):positionsInfo
    const handleClick = ()=>{
        if(active){
          setActive(false)
        }else{
          setActive(true)
        }
        
    }
    onchange
    const tableButtonInfo:string = active?"View All":"View Less"

    return ( 
        <>
        <div className="flex justify-between" > 
         <h1 className="text-2xl font-bold" >Your active positions</h1>
        <button  className="text-appColor1 font-bold" onClick={handleClick}>{tableButtonInfo}</button>
        </div>
        <ActivePositionsTable data={activePositionsTableData} />
        </>
      
    );
}
 
export default ActivePositions;