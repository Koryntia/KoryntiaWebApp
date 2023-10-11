'use client'
import { cardinfo } from "@/app/data/carddata"
import Card from "./card"
import './card.css'
import {FC}from 'react'


 
const Cardcontainer: FC = () => {
 const cardData = cardinfo;
  return (
    <div className="flex  items-center " >
      <Card data={cardData}></Card>
    </div>
    );
}
 
export default Cardcontainer;

