import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import Topics from '@/components/admin/article/Topics_admin';
import useSWRMutation from 'swr/mutation'
import { updateFetch } from '@/lib/fetchers';
import { ReqBodyPutArticle } from '@/pages/api/article/[id]';


const ArticleForm = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const [name, setName] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [connections, setConnections] = useState<number[]>([]);

    const { data, error, isLoading } = useSWR<ArticleWithConnections>(id ? `/api/article/${id}` : null)
    const { trigger, isMutating } = useSWRMutation<any, any, any, ReqBodyPutArticle>(`/api/article/${id}`, updateFetch)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            trigger({ name, text, topic: connections })
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    useEffect(() => {
        if (data) {
            setName(data.name);
            setText(data.text);
            setConnections(data.topic?.map((topic) => topic.id) || []);
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
                <label htmlFor="text">Text:</label>
                <textarea
                    id="text"
                    disabled={isLoading || isMutating}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <Topics connections={connections} setConnections={setConnections}/>
            </div>
            <button type="submit" disabled={isLoading || isMutating}>
                Submit
            </button>
        </form>
    );
};

export default ArticleForm;
