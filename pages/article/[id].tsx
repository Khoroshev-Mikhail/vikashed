import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  text: string;
  // Другие поля статьи
}

const Article: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);

  // Отправляем GET-запрос к API для получения статьи по id
  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/article/${id}`);
      if (response.ok) {
        const articleData: Article = await response.json();
        setArticle(articleData);
      } else {
        console.error('Failed to fetch article');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  // Вызываем функцию fetchArticle при монтировании компонента
  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  return (
    <div>
      {article ? (
        <>
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <p className="text-lg">{article.text}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Article;
