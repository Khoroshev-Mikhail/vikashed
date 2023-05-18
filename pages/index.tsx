import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr'

const TopicList: React.FC = () => {
  const { data: articles } = useSWR<ArticleWithConnections[]>(`/api/article/`)
  const { data: topics } = useSWR<TopicWithConnections[]>(`/api/topic/`)
  const { data: session, status } = useSession()


  return (
    <div>
    {topics && topics.length > 0 ? (
      topics.map((topic) => (
        <div key={topic.id}>
          <h2 className="text-4xl font-bold border-b">{topic.name}</h2>
          <ul className="text-lg">
            {articles && articles
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
    <button onClick={()=>signIn()}>sign in</button>
    <button onClick={()=>signOut()}>sign out</button>
    <div>{session ? `auth ${session.user.name}` : 'anAuth'}</div>
  </div>

  );
};

export default TopicList;
