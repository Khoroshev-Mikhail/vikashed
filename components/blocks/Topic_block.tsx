import Image from 'next/image'
import drop from '../../public/images/drop-down.svg'
import up from '../../public/images/up-down.svg'
import Link from 'next/link';
import {  useState } from 'react';
import { getArticleWord } from '@/lib/hooks';

export default function Topic_block({ id, name, article } : TopicWithConnections){
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    return (
        <div>
            <div className='flex justify-between py-1 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}>
                <h3>{name}</h3>
                <Image src={isOpen ? up : drop} alt="drop" width={24} height={29}/>
            </div>
            
            {article.map((el, i) => {
                return (
                    <Link key={i} href={`/article/${el.id}`} className={ `${isOpen ? 'flex' : 'hidden' } ${!el.isVisible && 'bg-slate-300'} _a-reset cursor-pointer flex-col text-lg border-b py-1 pl-2 ml-2 `}>
                            { el.name }
                    </Link>
                )
            })}
        </div>
    )
}