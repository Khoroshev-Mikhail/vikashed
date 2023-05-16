import { useState, useEffect } from 'react';

type Topic = {
  id: number;
  name: string;
};

type Article = {
  id: number;
  name: string;
  text: string;
  topic: { id: number }[];
};

type Props = {
  id: string;
};

const Topics: React.FC<Props> = ({ id }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [connectionTopics, setConnectionTopics] = useState<number[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
        const response = await fetch('/api/topic');
        const data = await response.json();
        setTopics(data);
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    if(id){
        const fetchConnectionTopics = async () => {
            const response = await fetch(`/api/article/${id}`);
            const data: Article = await response.json();
            setConnectionTopics(data.topic?.map((topic) => topic.id) || []);
        };
        fetchConnectionTopics();
    }
  }, [id]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const topicId = Number(event.target.value);
    if (connectionTopics.includes(topicId)) {
        setConnectionTopics(connectionTopics.filter((id) => id !== topicId));
    } else {
        setConnectionTopics([...connectionTopics, topicId]);
    }
  };

  return (
    <div>
      {topics?.map((topic) => (
        <label key={topic.id}>
          <input
            type="checkbox"
            value={topic.id}
            checked={connectionTopics.includes(topic.id)}
            onChange={handleCheckboxChange}
          />
          {topic.name}
        </label>
      ))}
    </div>
  );
};

export default Topics;
