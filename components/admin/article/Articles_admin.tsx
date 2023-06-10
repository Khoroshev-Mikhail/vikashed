import { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr'

type Props = {
    connections: number[];
    setConnections: Dispatch<SetStateAction<number[]>>
};

const Articles: React.FC<Props> = ({ connections, setConnections }) => {
    const { data, error, isLoading } = useSWR<Article[]>('/api/admin/article');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const topicId = Number(event.target.value);
        if (connections.includes(topicId)) {
            setConnections(connections.filter( id => id !== topicId));
        } else {
            setConnections([...connections, topicId]);
        }
    };

    return (
        <div>
            <label className="mt-2 block mb-2 font-medium">Связанные статьи:</label>
            {data?.map((el) => (
                <div key={el.id}>
                    <input
                        type="checkbox"
                        value={el.id}
                        checked={connections.includes(el.id)}
                        onChange={handleCheckboxChange}
                        id={`article-${el.id}`}
                        className='mr-2'
                    />
                    <label htmlFor={`article-${el.id}`}>{el.name}</label>

                </div>
            ))}
        </div>
    );
};

export default Articles;
