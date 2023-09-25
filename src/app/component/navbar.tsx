'use client' 
import { FC, useState } from "react";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

 
const Navbar: FC = () => {

    const linkGeneral =[
        {label:'Dashboard', route:'/', ihov:"\navbar\dashboard-purple.svg", i:"\navbar\dashboard-colorless.svg",},
        {label:'Message', route:'/message', ihov:"\navbar\message-purple.svg", i:"\navbar\message-colorless.svg",},
        {label:'settings', route:'/settings', ihov:"\navbar\settings-purple.svg", i:"\navbar\settings-colorless.svg",},        
    ]

    const linkMarketplace =[
        {label:'market', route:'/market', ihov:"\navbar\market-purple.svg", i:"\navbar\market-colorless.svg",},
        {label:'mypositions', route:'/mypositions', ihov:"\navbar\mypositions-purple.svg", i:"\navbar\mypositions-colorless.svg",},
    ]


    const linkMyprof =[
        {label:'collection', route:'/collection', ihov:"\navbar\collection-purple.svg", i:"\navbar\collection-colorless.svg",},
        {label:'wallet', route:'/wallet', ihov:"\navbar\wallet-purple.svg", i:"\navbar\wallet-colorless.svg",},
        {label:'history', route:'/history', ihov:"\navbar\history-purple.svg", i:"\navbar\history-colorless.svg",},         
    ]


    const router = useRouter();
    const pathName = usePathname()
    const [active, setActive] = useState(pathName)
    const [isHovering, setIsHovering] = useState(false)
    const [hoverActive, setHoverActive] = useState('')
    const handleMouseOver = (label: string) =>{
    setIsHovering(true);
    setHoverActive(label)
    };
    const handleMouseOut=()=>{
        setIsHovering(false);
        setHoverActive('');
    };

    return ( <>
    <nav>
        <h3>General</h3> 
        <ul>
            <li>
            <Link href="/"><img src="\navbar\history-colorless.svg" alt="Setting icon" /> Dashboard</Link>
            </li>
            <li>
            <Link href="/message"><img src="\navbar\history-colorless.svg" alt="Setting icon" />Message</Link>
            </li>
            <li>
            <Link href="/settings"><img src="\navbar\history-colorless.svg" alt="Setting icon" />Settings</Link>
            </li>
        </ul>
    
        <h3>Marketplace</h3>
        <ul>
            <li>
            <Link href="/market"><img src="\navbar\history-colorless.svg" alt="Setting icon" />Market</Link>
            </li>
            <li>
            <Link href="/mypositions"><img src="\navbar\history-colorless.svg" alt="Setting icon" />My Positions</Link>
            </li>
        </ul>
        <h3>My profile</h3>
        <ul>
            <li>
            <Link href="/collection"><img src="\navbar\history-colorless.svg" alt="Setting icon" />Collection</Link>
            </li>
            <li>
            <Link href="/wallet"><img src="\navbar\history-colorless.svg" alt="Setting icon" />Wallet</Link>
            </li>
            <li>
            <Link className="" href="/history"><img src="\navbar\history-colorless.svg" alt="Setting icon" /> history</Link>
            </li>
        </ul>
    </nav>
    </> );
    
    
    
    
    
    
    /*             <nav className=''>
          <h1>General</h1>
          <Link href="/"> Dashboard</Link>
          <Link href="/message">Message</Link>
          <Link href="/settings">Settings</Link>
          <h1>Marketplace</h1>
          <Link href="/market">Market</Link>
          <Link href="/mypositions">My Positions</Link>
          <h1>My profile</h1>
          <Link href="/collection">Collection</Link>
          <Link href="/wallet">Wallet</Link>
          <Link href="/history">History</Link>
         </nav> */
}
 
export default Navbar;