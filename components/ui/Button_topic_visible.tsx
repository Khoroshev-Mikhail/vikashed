import { updateFetch } from "@/lib/fetchers"
import { ReqBodyPutVisibleTopic } from "@/pages/api/admin/topic/visible"
import useSWRMutation from 'swr/mutation'
import useSWR, { mutate } from 'swr'
import { Topic } from "@prisma/client"
import Spinner from "./Spinner"
import { useState } from "react"

export default function Button_topic_visible( { id }: { id: number} ){
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { data } = useSWR<Topic>(id ? `/api/admin/topic/${id}` : null)  
    const { trigger: toggleVisible, isMutating } = useSWRMutation<any, any, any, ReqBodyPutVisibleTopic>(`/api/admin/topic/visible`, updateFetch)

    const handleVisible  = async (isVisible: boolean) =>{
        setIsLoading(true)
        await toggleVisible({ id, isVisible})
        await mutate(`/api/admin/topic/${id}`)
        await mutate(`/api/admin/topic/`)
        setIsLoading(false)
    }

    return(
        <>
            {data && 
                <button className={`w-36 border-2 p-2 bg-black text-white rounded-lg ${data.isVisible ? 'bg-green-600' : 'bg-black'}`} onClick={()=>handleVisible(!data.isVisible)}>
                    { isLoading
                        ? <Spinner white /> 
                        : data.isVisible 
                            ? 'Отображается' 
                            : 'Скрыта'
                    }
                </button>
            }
        </>
    )
}