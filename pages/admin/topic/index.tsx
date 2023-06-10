import { createFetch, updateFetch } from '@/lib/fetchers';
import { ReqBodyPostTopic } from '@/pages/api/topic';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import Image from 'next/image';
import { ReqBodyPutVisibleTopic } from '@/pages/api/admin/topic/visible';
import Button_topic_visible from '@/components/ui/Button_topic_visible';
import Button_topic_delete from '@/components/ui/Button_topic_delete';
import { getArticleWord } from '@/lib/hooks';
import Link from 'next/link';
import edit from '../../../public/images/edit.svg'
import Spinner from '@/components/ui/Spinner';


const TopicForm = () => {
  const [name, setName] = useState('');
  const { trigger, isMutating } = useSWRMutation<any, any, any, ReqBodyPostTopic>(`/api/admin/topic`, createFetch)
  const { data } = useSWR<TopicWithConnections[]>(`/api/admin/topic`)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await trigger({ name })
        setName('')
  };


  return (
    <div className='px-5 max-w-lg mx-auto'>
        <form onSubmit={handleSubmit} className="">
            
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                    Название темы:
                </label>
                <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <button type="submit" className="w-32 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600">
                { isMutating ? <Spinner white /> : 'Сохранить'}
            </button>
        </form>

        <div className='flex flex-col border-t mt-5 pt-5'>
            <h3 className='text-center'>Все темы:</h3>
            <div className='mt-5'>
                {data?.map(el => {
                    return (
                        <div className='flex flex-col border-b-2 border-black py-2 '>
                            <div>
                                {el.name} 
                                <span className='text-[#848484]'>
                                    ({getArticleWord(el.article.length)})
                                </span>
                            </div>
                            <div className='flex justify-end gap-x-1'>
                                <Link href={`/admin/topic/${el.id}`} className='border-2 p-2 text-white rounded-lg no-underline'>
                                    <Image src={edit} alt='Редактировать'/>
                                </Link>
                                <Button_topic_visible {...el} />
                                <Button_topic_delete {...el} />
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    </div>
  );
};
TopicForm.admin = true
export default TopicForm;
