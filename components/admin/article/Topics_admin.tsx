import { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr'

type Props = {
    connections: number[]
    setConnections: Dispatch<SetStateAction<number[]>>
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>
    isPaid: boolean
    setIsPaid: Dispatch<SetStateAction<boolean>>
};

const Topics: React.FC<Props> = ({ connections, setConnections, isVisible, setIsVisible, isPaid, setIsPaid }) => {
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
            <div>
                <label className="block mb-2 font-medium">Выберите темы:</label>
                {data?.map((topic) => (
                    <div key={topic.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`topic-${topic.id}`}
                            value={topic.id}
                            checked={connections.includes(topic.id)}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor={`topic-${topic.id}`}>{topic.name}</label>
                    </div>
                ))}
            </div>

            <div className="my-2 py-2 ">
                <label className="block mb-2 font-medium">Настройки видимости:</label>
                <div>
                    <input id="isVisible" type='checkbox' checked={isVisible} onChange={()=>setIsVisible(!isVisible)} className="mr-2"/>
                    <label htmlFor='isVisible'>Отображается на сайте? </label>
                </div>
                <div>
                    <input id="isPaid" type='checkbox' checked={isPaid} onChange={()=>setIsPaid(!isPaid)} className="mr-2" />
                    <label htmlFor='isPaid'>Доступна только после оплаты?</label>
                </div>
            </div>
        </div>
    );
};

export default Topics;
