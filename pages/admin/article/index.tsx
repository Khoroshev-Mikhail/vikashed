import { createFetch } from '@/lib/fetchers';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useSWRMutation from 'swr/mutation'
import parse from 'html-react-parser';
import useSWR from 'swr'
import { ReqBodyArticle } from '@/pages/api/article';
import 'react-quill/dist/quill.snow.css'; 
import dynamic from 'next/dynamic';
import { FORMATS, MODULES } from '@/lib/consts';
import Topics from '@/components/admin/article/Topics_admin';
import Spinner from '@/components/ui/Spinner';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const ArticleForm = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [connections, setConnections] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [isPaid, setIsPaid] = useState<boolean>(false)
    const { trigger, isMutating } = useSWRMutation<any, any, any, ReqBodyArticle>(`/api/admin/article`, createFetch)

    const handleTextChange = (value: string) => {
        setText(value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await trigger({ name, text, isVisible, isPaid, topics: connections })
        setName('')
        setText('')
        setConnections([])
        setIsVisible(true)
        setIsPaid(false)
    };

    return (
        <div className='px-5 max-w-md mx-auto'>
            <form onSubmit={handleSubmit} className="">

                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Название статьи:
                    </label>
                    <input type="text" id="name" value={name} onChange={ (e)=>setName(e.target.value) } className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div className="mb-4 h-full">
                    <label htmlFor="text" className="block mb-2 font-medium">
                        Тело статьи:
                    </label>
                    <ReactQuill id="text" theme="snow" value={text} onChange={handleTextChange} formats={FORMATS} modules={MODULES}
                      
                        // placeholder="Введите текст..."
                        // // Опции для загрузки изображений
                        // onChangeImage={handleImageUpload}
                        // modules={{
                        //   toolbar: {
                        //     container: '#toolbar',
                        //     handlers: {
                        //       image: handleImageUpload,
                        //     },
                        //   },
                        // }}
                    
                    />
                </div>

                <Topics connections={connections} setConnections={setConnections} isVisible={isVisible} setIsVisible={setIsVisible} isPaid={isPaid} setIsPaid={setIsPaid}/>

                <button type="submit" className="w-40 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600" >
                    { isMutating ? <Spinner white /> : 'Добавить новую статью' }
                </button>
            </form>

            <div className='mt-5 pt-5 border-t'>
                {parse(text)}
            </div>
        </div>
    );
};

ArticleForm.admin = true
export default ArticleForm;
