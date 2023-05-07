"use client"
import { links, questions } from "@/components/header"

export default function Logics({params}){

    return (
        <div>
            <h1 className="text-[36px] pl-[20px]">{links[params.id - 1]}</h1>
            {questions.map((el, i) => {
                return (
                    <div className="" key={i}>
                        {el}
                    </div>
                )
            })}
        </div>
    )
}