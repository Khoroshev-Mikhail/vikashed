"use client"
import React from "react";
import { links } from '@/components/header'
import Link from "next/link";
export default function Home() {

  return (
    <main className="flex flex-col">
        {links.map((el, i )=> {
            return (
                <section className="p-2" key={i}>
                    <h2 className="text-[36px] pl-[20px] underline">
                      <Link className="" href={`/logics/${i + 1}/`}>{el}</Link>  
                    </h2>
                    <p>{el} - - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, </p>
                </section>
            )
        })}
        <section className="p-2">
            <h2 className="text-[36px] pl-[20px]">Видео</h2>
            <p></p>
        </section>
    </main>
  )
}
