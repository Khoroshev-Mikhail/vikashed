"use client"
import Image from "next/image";
import React from "react";
import { useState } from 'react';
import x from "../public/images/x-mark.svg"
import bars from "../public/images/bars.svg"
import Social from "./social";
import Link from "next/link";

export const links = ['Логика 1', 'Логика 2', 'Логика 3', 'Логика 4', ]
export const questions = ['Вопрос 1', 'Вопрос 2', 'Вопрос 3']
export default function Header(){
  const [isHidden, setIsHidden] = useState<boolean>(true);
  return (
    <header className="relative w-full border-b-2 border-blue-400 p-2">
        <div className={`${isHidden ? 'hidden' : 'block'} absolute z-40 top-0 left-0 w-full `}>
            <menu className="w-[50%] absolute p-2 right-0 top-0 text-white text-right bg-red-500 h-screen">
                <li className="flex justify-end">
                    <Image className="cursor-pointer w-[20px] h-[20px]" src={ x } alt="menu-toggle" onClick={()=> setIsHidden(true) }/>
                </li>
                {links.map((el, i) => {
                  return (
                    <li key={i}>
                      <Link className="p-2 text-[24px]" href={`/logics/${i + 1}/`}>{el}</Link>
                    </li>
                  )
                })}
                <li className="absolute w-full left-0 ">
                    <Social />
                </li>
            </menu>
        </div>
        <div className="flex justify-between">
            <Link href="/">Логотип</Link>
            <Image className="cursor-pointer w-[20px] h-[20px]" src={ bars } alt="menu-toggle" onClick={()=> setIsHidden(false) }/>
        </div>
    </header>
  )
}
