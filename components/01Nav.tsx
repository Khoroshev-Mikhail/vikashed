import { useState } from "react"
import Link from 'next/link';
import useSWR from 'swr'
import burger from '../public/images/burger.svg'
import cross from '../public/images/cross.svg'
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav(){
    const { data: session } = useSession()
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    return (
        <div className="w-full">
            <div className="p-5 flex justify-between">
                <h1 className="font-bold text-2xl">Практика психолога</h1>
                <Image src={burger} alt="open menu" onClick={()=>setIsOpen(true)}/>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} absolute w-full text-right top-0 right-0 p-5 bg-white border-b border-black`}>
                <nav>
                    <menu>
                        <li className="flex justify-end"><Image src={cross} alt="close menu" onClick={()=>setIsOpen(false)}/></li>
                        <li><Link href="https://www.psiho-logika.ru/">Главная</Link></li>
                        <li><Link href="https://www.psiho-logika.ru/about">Обо мне</Link></li>
                        <li><Link href="https://www.psiho-logika.ru/pay">Доступ к платным материалам</Link></li>
                        <li>
                            <button className="" onClick={()=>session ? signOut() : signIn()}>{session ? `Выйти (${session.user.name})` : 'Войти'}</button>
                        </li>
                    </menu>   
                </nav>
            </div>
        </div>
    )
}