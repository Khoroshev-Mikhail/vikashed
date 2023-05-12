import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

const ArticleForm: React.FC = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);

  useEffect(() => {
    fetch('/api/topics/')
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error('Error fetching topics:', error));
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const topicId = parseInt(e.target.value);

    if (e.target.checked) {
      setSelectedTopics((prevSelectedTopics) => [
        ...prevSelectedTopics,
        topicId,
      ]);
    } else {
      setSelectedTopics((prevSelectedTopics) =>
        prevSelectedTopics.filter((id) => id !== topicId)
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/article/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, text, topics: selectedTopics }),
      });

      if (response.ok) {
        // Успешно отправлено
        console.log('Article submitted successfully');
      } else {
        // Обработка ошибок при отправке
        console.error('Failed to submit article');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          Название статьи:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="text" className="block mb-2 font-medium">
          Тело статьи:
        </label>
        <textarea
          id="text"
          value={text}
          onChange={handleTextChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Выберите темы:</label>
        {topics.map((topic) => (
          <div key={topic.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`topic-${topic.id}`}
              value={topic.id}
              checked={selectedTopics.includes(topic.id)}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor={`topic-${topic.id}`}>{topic.name}</label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Отправить
      </button>
</form>

  );
};

export default ArticleForm;
