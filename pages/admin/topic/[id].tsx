import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetch } from '@/lib/fetchers';
import Articles from '@/components/admin/article/Articles_admin';


const TopicForm = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    
    const [name, setName] = useState<string>('');
    const [connections, setConnections] = useState<number[]>([]);

    const { data, error, isLoading } = useSWR<TopicWithConnections>(id ? `/api/topic/${id}` : null)
    const { trigger, isMutating } = useSWRMutation(`/api/topic/${id}`, updateFetch)

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    disabled={isLoading || isMutating}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <Articles connections={connections} setConnections={setConnections}/>
            </div>
            <button type="submit" disabled={isLoading || isMutating}>
                Submit
            </button>
        </form>
    );
};
TopicForm.admin = true
export default TopicForm;
