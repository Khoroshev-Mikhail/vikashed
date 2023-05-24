import React, { useState, ChangeEvent, FormEvent } from 'react';

const TopicForm = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/topic/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        // Успешно отправлено
        console.log('Topic submitted successfully');
      } else {
        // Обработка ошибок при отправке
        console.error('Failed to submit topic');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          Название темы:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Добавить тему
      </button>
    </form>
  );
};
TopicForm.admin = true
export default TopicForm;
