import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Topic {
  id: number;
  name: string;
}

interface Article {
  id: number;
  name: string;
  topic: Topic[];
}

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/topic/')
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error('Error fetching topics:', error));

    fetch('/api/article/')
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div>
    {topics.length > 0 ? (
      topics.map((topic) => (
        <div key={topic.id}>
          <h2 className="text-4xl font-bold border-b">{topic.name}</h2>
          <ul className="text-lg">
            {articles
              .filter((article) =>
                article.topic.some((topicItem) => topicItem.id === topic.id)
              )
              .map((article) => (
                <li key={article.id}>
                  <Link href={`/article/${article.id}`} >
                    {article.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))
    ) : (
      <p>No topics available</p>
    )}
  </div>

  );
};

export default TopicList;
