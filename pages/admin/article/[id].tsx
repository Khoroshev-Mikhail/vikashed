import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ArticleForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState<any>({});
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/article/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setArticle(data);
          setName(data.name);
          setText(data.text);
        })
        .catch((error) => console.error('Error fetching article:', error));
    }
  }, [id]);

  useEffect(() => {
    fetch('/api/topic')
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => console.error('Error fetching topics:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const selectedTopicIds = topics
      .filter((topic: any) => topic.checked)
      .map((topic: any) => topic.id);
  
    const payload = {
      name,
      text,
      topicIds: selectedTopicIds,
    };
  
    try {
      const response = await fetch(`/api/article/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };
  

  const handleCheckboxChange = (topicId: number) => {
    // Handle checkbox change
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label>Topics:</label>
        {article && topics?.map((topic: any) => {
          const isChecked = article?.topicIds?.includes(topic.id);
          return (
            <div key={topic.id}>
              <input
                type="checkbox"
                id={topic.id}
                value={topic.id}
                checked={isChecked}
                onChange={() => handleCheckboxChange(topic.id)}
              />
              <label htmlFor={topic.id}>{topic.name}</label>
            </div>
          );
        })}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ArticleForm;
