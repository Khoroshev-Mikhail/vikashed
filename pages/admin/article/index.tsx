import { createFetch } from '@/lib/fetchers';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { ReqBodyPostArticle } from '@/pages/api/article';
import 'react-quill/dist/quill.snow.css'; 
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
    'link',
  ];
  
  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

const ArticleForm = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
    const { data, error, isLoading } = useSWR<TopicWithConnections[]>(`/api/topic`)
    const { trigger, isMutating } = useSWRMutation<any, any, any, ReqBodyPostArticle>(`/api/article`, createFetch)

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleTextChange = (value: string) => {
        console.log(value)
        setText(value);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const topicId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedTopics((prevSelectedTopics) => [...prevSelectedTopics, topicId]);
        } else {
            setSelectedTopics((prevSelectedTopics) => prevSelectedTopics.filter((id) => id !== topicId));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        trigger({ name, text, topics: selectedTopics })
    };

    return (
        <div className='px-5'>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">

                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Название статьи:
                    </label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div className="mb-4 h-full">
                    <label htmlFor="text" className="block mb-2 font-medium">
                        Тело статьи:
                    </label>
                    <ReactQuill id="text" theme="snow" value={text} onChange={handleTextChange} formats={formats} modules={modules} />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Выберите темы:</label>
                    {data?.map((topic) => (
                        <div key={topic.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`topic-${topic.id}`}
                                value={topic.id}
                                checked={selectedTopics.includes(topic.id)}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            <label htmlFor={`topic-${topic.id}`}>{topic.name}</label>
                        </div>
                    ))}
                </div>

                <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600" >
                    Сохранить
                </button>
            </form>
        </div>
    );
};

ArticleForm.admin = true
export default ArticleForm;
