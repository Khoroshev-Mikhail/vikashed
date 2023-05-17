import { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr'

type Props = {
    connections: number[];
    setConnections: Dispatch<SetStateAction<number[]>>
};

const Articles: React.FC<Props> = ({ connections, setConnections }) => {
    const { data, error, isLoading } = useSWR<Article[]>('/api/article');

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
            {data?.map((el) => (
                <label key={el.id}>
                <input
                    type="checkbox"
                    value={el.id}
                    checked={connections.includes(el.id)}
                    onChange={handleCheckboxChange}
                />
                    {el.name}
                </label>
            ))}
        </div>
    );
};

export default Articles;
