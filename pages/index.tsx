import Topic_block from '@/components/blocks/Topic_block';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useSWR from 'swr'
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
    const propsData = await prisma.topic.findMany({
        include: {
            article: {
                select: {
                    id: true,
                    name: true,
                    text: true,
                    isPaid: true,
                    isVisible: true
                },
            },
        },
    });
    return {
        props: {
            propsData: propsData
        }
    }
}

const TopicList = ({ propsData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useSWR<TopicWithConnections[]>(`/api/topic/`, { fallbackData: propsData })

  return(
      <section className="w-full px-5">
          <div className="w-full">
              <input type="text" className="w-full p-2 rounded-md font-bold text-[15px] bg-[#F2F2F2]" placeholder="Поиск статей..."/>
          </div>

          <div>
              { data && data.map((topic, i) => topic.article.length > 0 && <Topic_block key={i} id={topic.id} name={topic.name} article={topic.article}/>) }
          </div>
      </section>
  )
};

export default TopicList;
