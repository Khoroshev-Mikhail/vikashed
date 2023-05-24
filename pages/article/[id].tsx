import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import useSWR from 'swr'


interface Article {
  id: string;
  name: string;
  text: string;
}

const Article: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR<Article>(id ? `/api/article/${id}` : null)

  return (
    //breadcrumbs
    <>{data && 
        <div className='px-5'>
            <h2>{data.name}</h2>
            <div>
                {parse(data.text)}
            </div>
        </div>
    }</>
  );
};

export default Article;
