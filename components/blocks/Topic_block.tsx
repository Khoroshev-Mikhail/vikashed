import Image from 'next/image'
import user_avatar from '../../public/images/user-avatar.svg'
import drop from '../../public/images/drop-down.svg'
import up from '../../public/images/up-down.svg'
import Link from 'next/link';
import { useState } from 'react';
import { calcReadTime, formatDate, getArticleWord } from '@/lib/hooks';

export default function Topic_block({ name, article } : Omit<TopicWithConnections, 'id'>){
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    return (
        <div>
            <div className='flex justify-between border-b py-5 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}>
                <h3>{name} <span className='pl-2 text-xs'>({ article && getArticleWord(article.length) })</span></h3>
                <Image src={isOpen ? up : drop} alt="drop"/>
            </div>
            
            {article.map(el => {
                return (
                    <Link href={'#'} className={ `${isOpen ? 'flex' : 'hidden' } flex-col text-xs border-b py-5 pl-2 `}>
                        <div className="font-medium flex text-xs">
                            <Image src={ el.author.image || user_avatar } alt="Ава" width={24} height={24} className='rounded-full'/>
                            <span className='leading-6 pl-1'> { el.author.name } </span> 
                            { el.author.role == 'ADMIN' && <span className='text-[#999] leading-6 pl-1'> (admin)</span>}
                        </div>
                        <div className="text-lg mt-2">
                            { el.name }
                        </div>
                        <div className="mt-2 text-sm">
                            { el.text } {/* когда будешь парсить добавить в интерфейсе ARticle-> | JSON */}
                        </div>
                        <div className="mt-1.5 text-xs text-[#999] flex justify-between">
                            <div>
                                { formatDate(el.date) }
                            </div>
                            <div>
                                { calcReadTime(el.text) } мин {/* или комментарии 0 */}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}