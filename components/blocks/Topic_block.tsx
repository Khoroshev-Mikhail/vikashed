import Image from 'next/image'
import user_avatar from '../../public/images/user-avatar.svg'
import drop from '../../public/images/drop-down.svg'
import up from '../../public/images/up-down.svg'
import Link from 'next/link';
import { useState } from 'react';

export default function Topic_block({ name, article } : Omit<TopicWithConnections, 'id'>){
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    return (
        <div>
            <div className='flex justify-between border-b py-5'>
                <h3>{name} <span className='pl-2 text-xs'>({article && article.length} статей)</span></h3>
                <Image src={isOpen ? up : drop} alt="drop" onClick={()=>setIsOpen(!isOpen)}/>
            </div>
            
            {article.map(el => {
                return (
                    <Link href={'#'} className={`${isOpen ? 'flex' : 'hidden'} flex-col text-xs border-b py-5 pl-2 `}>
                        <div className="font-medium flex text-xs">
                            <Image src={user_avatar} alt="Ава" className='rounded-full'/>
                            <span className='leading-6'> Vika Shed </span>
                            <span className='text-[#999] leading-6'> (admin)</span>
                        </div>
                        <div className="text-lg mt-2">
                            {el.name}
                        </div>
                        <div className="mt-2 text-sm">
                            {el.text} {/* когда будешь парсить добавить в интерфейсе ARticle-> | JSON */}
                        </div>
                        <div className="mt-1.5 text-xs text-[#999] flex justify-between">
                            <div>
                                12/05
                            </div>
                            <div>
                                5 мин {/* или комментарии 0. А время на прочтение можно считать по длине символов в статье */}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}