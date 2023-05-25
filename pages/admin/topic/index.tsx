import { createFetch } from '@/lib/fetchers';
import { ReqBodyPostTopic } from '@/pages/api/topic';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import useSWRMutation from 'swr/mutation'

const TopicForm = () => {
  const [name, setName] = useState('');
  const { trigger, isMutating } = useSWRMutation<any, any, any, ReqBodyPostTopic>(`/api/article`, createFetch)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    trigger({ name })
  };

  return (
    <div className='px-5'>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                    Название темы:
                </label>
                <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600">
                Сохранить
            </button>
        </form>
    </div>
  );
};
TopicForm.admin = true
export default TopicForm;
