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
                    <Link key={i} href={`/article/${el.id}`} className={ `${isOpen ? 'flex' : 'hidden' } _a-reset flex-col text-xs border-b py-1 pl-2 `}>

                        <div className="text-lg">
                            { el.name }
                        </div>

                    </Link>
                )
            })}
        </div>
    )
}