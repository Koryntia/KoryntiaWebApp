'use client'
import  positionsInfo  from "@/app/data/carddata"
import Card from "./card"
import './card.css'
import {FC}from 'react'


 
const Cardcontainer: FC = () => {
 const cardData = positionsInfo;
  return (
    <div className="flex items-center " >
      <Card data={cardData}></Card>
    </div>
    );
}
 
export default Cardcontainer;

