import { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr'

type Props = {
    connections: number[];
    setConnections: Dispatch<SetStateAction<number[]>>
};

const Topics: React.FC<Props> = ({ connections, setConnections }) => {
    const { data, error, isLoading } = useSWR<Topic[]>('/api/topic');

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
            {data?.map((topic) => (
                <label key={topic.id}>
                <input
                    type="checkbox"
                    value={topic.id}
                    checked={connections.includes(topic.id)}
                    onChange={handleCheckboxChange}
                />
                    {topic.name}
                </label>
            ))}
        </div>
    );
};

export default Topics;
