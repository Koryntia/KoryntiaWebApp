"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { navLinks } from "@/constant/nav";

const Navbar = () => {
  return (
    <nav>
      {navLinks.map((section, index) => (
        <div key={index}>
          <h3>{section.section}</h3>
          <ul>
            {section.links.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href as Route}>
                  <Image src={link.imageSrc} alt="Setting icon" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
