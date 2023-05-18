import { useState } from "react"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr'

export default function Nav(){
    const [ isOpen, setIsOpen ] = useState<boolean>(true)
    const { data: topics } = useSWR<TopicWithConnections[]>(`/api/topic`)

    return (
        <div className="w-full">
            <div className={`${isOpen ? 'block' : 'hidden'} absolute top-0 right-0 bg-red-500`}>
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