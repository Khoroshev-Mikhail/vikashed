import Search from '@/components/blocks/Search';
import Topic_block from '@/components/blocks/Topic_block';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useSWR from 'swr'

// export const getStaticProps: GetStaticProps = async () => {
//     const res = await fetch(`https://www.psiho-logika.ru/api/topic`)
//     const propsData = await res.json()
//     return {
//         props: {
//             propsData: propsData
//         }
//     }
// }
// const TopicList = ({ propsData }: InferGetStaticPropsType<typeof getStaticProps>) => {
//     const { data } = useSWR<TopicWithConnections[]>(`/api/topic`, {fallbackData: propsData})

//ЗДЕСЬ НАДО ПЕРЕПИСАТЬ ТАК, ЧТОБЫ ПОЛУЧАТЬ ВСЕ СТАТЬИ, А ПОТОМ ОТОБРАЖАТЬ ИХ В ЗАВИСИМОСТИ ОТ ВИДИМОСТИ ЮЗЕРА

const TopicList = () => {
  const { data } = useSWR<TopicWithConnections[]>(`/api/topic`)

  return(
      <section className="w-full px-5">
            {/* <Search /> */}

          <div>
              { data && data.length > 0 && data.map((topic, i) => topic.article.length > 0 && <Topic_block key={i} {...topic}/>) }
          </div>
      </section>
  )
};

export default TopicList;
