
import useSWR from 'swr'
import Topic_block from './blocks/Topic_block'


export default function Main(){
    const { data } = useSWR<TopicWithConnections[]>(`/api/topic/`)

    return(
        <section className="w-full px-5">
            <div className="w-full">
                <input type="text" className="w-full p-2 rounded-md font-bold text-[15px] bg-[#F2F2F2]" placeholder="Поиск статей..."/>
            </div>

            <div>
                {data && data.map(topic => <Topic_block name={topic.name} article={topic.article}/>)}

                

            </div>
        </section>
    )
}