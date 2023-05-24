import { useState } from "react"
import Link from 'next/link';
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
                <h1 className="font-bold text-2xl">
                    <Link href="/" className="_a-reset">Практика психолога</Link>
                </h1>
                <Image src={burger} alt="open menu" onClick={()=>setIsOpen(true)}/>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} text-xl absolute w-full text-right top-0 right-0 p-5  bg-black text-white `}>
                <nav className="text-white">


                    <menu>
                        <li className="flex justify-end">
                            <Image src={cross} alt="close menu" onClick={()=>setIsOpen(false)}/>
                        </li>

                        <li>
                            <Link href="/" className=" text-white no-underline">Главная</Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-white no-underline">Обо мне</Link>
                        </li>
                        <li>
                            <Link href="/pay" className="text-white no-underline">Доступ к платным материалам</Link>
                        </li>
                        <li>
                            <button className="" onClick={()=>session ? signOut() : signIn()}>{session ? `Выйти (${session.user.name})` : 'Войти'}</button>
                        </li>
                    </menu>   

                                
                    {session?.user.role === 'ADMIN' &&
                        <menu className="mt-5 pt-5 border-t">
                            <li>
                                <Link href="/admin/topic" className=" text-white no-underline">Добавиь тему</Link>
                            </li>
                            <li>
                                <Link href="/admin/article" className=" text-white no-underline">Добавиь статью</Link>
                            </li>
                        </menu>
                    }
                </nav>
            </div>
        </div>
    )
}