import { useState } from "react"
import Link from 'next/link';
import useSWR from 'swr'
import burger from '../public/images/burger.svg'
import Image from "next/image";

export default function Nav(){
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const { data: topics } = useSWR<TopicWithConnections[]>(`/api/topic`)

    return (
        <div className="w-full">
            <div className="p-5 flex justify-between">
                <h1 className="font-bold text-2xl">Практика психолога</h1>
                <Image src={burger} alt="menu" onClick={()=>setIsOpen(true)}/>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} absolute w-1/2 top-0 right-0 p-2 pt-5 bg-red-500`}>
                <nav>
                    <menu>
                        {topics?.map(el => {
                            return (
                                <li className="">
                                    <Link href={`/topics/${el.id}`}>{el.name}</Link>
                                </li>)
                        })}
                    </menu>   
                </nav>
            </div>
            {/* <div className="">
                <nav>
                    <menu className="flex">
                        {topics?.map(el => {
                            return (
                                <li className="px-2">
                                    <Link href={`/topics/${el.id}`}>{el.name}</Link>
                                </li>)
                        })}
                    </menu>
                </nav>
            </div> */}
            
        </div>
    )
}