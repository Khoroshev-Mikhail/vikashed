import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TopicForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const [topic, setTopic] = useState<any>({});
  const [name, setName] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/topic/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTopic(data);
          setName(data.name);
          setArticles(data.articles || []);
        })
        .catch((error) => console.error('Error fetching topic:', error));
    }
  }, [id]);

  useEffect(() => {
    fetch('/api/article')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Articles:</label>
        {topic &&
          articles?.map((article: any) => {
            const isChecked = article.topic.some((obj: any) => obj.id === topic.id);
            return (
              <div key={article.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={article.id}
                  value={article.id}
                  checked={isChecked}
                  onChange={() => {
                    // Handle checkbox change
                  }}
                  className="mr-2"
                />
                <label htmlFor={article.id}>{article.name}</label>
              </div>
            );
          })}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default TopicForm;
