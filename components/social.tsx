import React from "react"
import tg from "../public/images/telegram.svg"
import inst from "../public/images/instagram.svg"
import Image from "next/image"

export default function Social(){
    return (
        <div className="flex justify-end">
            <a href="https://t.me/Vika_Shed">
                <Image className="cursor-pointer" src={ tg } alt="telegram"/>
            </a>
            <a href="https://instagram.com">
                <Image className="cursor-pointer" src={ inst } alt="instagram"/>
            </a>
        </div>
    )
}