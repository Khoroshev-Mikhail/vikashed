import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetch } from '@/lib/fetchers';
import Articles from '@/components/admin/article/Articles_admin';
import Spinner from '@/components/ui/Spinner';


const TopicForm = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    
    const [name, setName] = useState<string>('');
    const [connections, setConnections] = useState<number[]>([]);

    const { data, error, isLoading } = useSWR<TopicWithConnections>(id ? `/api/admin/topic/${id}` : null)
    const { trigger, isMutating } = useSWRMutation(`/api/admin/topic/${id}`, updateFetch)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            trigger({ name, connections }) //добавить тип
        } catch (error) {
            console.error('Error updating topic:', error);
        }
    };

    useEffect(() => {
        if (data) {
            setName(data.name);
            setConnections(data.article?.map((el) => el.id) || []);
        }
    }, [data]);

    return (
        <div className='px-5 max-w-lg mx-auto'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name"  className="block mb-2 font-medium">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        disabled={isLoading || isMutating}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div  className="flex items-center mb-2">
                    <Articles connections={connections} setConnections={setConnections}/>
                </div>
                <button type="submit" disabled={isLoading || isMutating} className="w-32 px-4 py-2 bg-black text-white rounded-md">
                    {(isLoading || isMutating) ? <Spinner white/> : 'Сохранить'}
                </button>
            </form>
        </div>
    );
};
TopicForm.admin = true
export default TopicForm;
