import { deleteFetch } from "@/lib/fetchers"
import useSWRMutation from 'swr/mutation'
import useSWR, { mutate } from 'swr'
import { Topic } from "@prisma/client"
import Spinner from "./Spinner"
import { useState } from "react"

export default function Button_topic_delete( { id }: { id: number} ){
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { data } = useSWR<Topic>(id ? `/api/admin/topic/${id}` : null)  
    const { trigger, isMutating } = useSWRMutation<any, any, any, {id: number}>(`/api/admin/topic/${id}`, deleteFetch)

    const handleVisible  = async (isVisible: boolean) =>{
        setIsLoading(true)
        await trigger({ id })
        await mutate(`/api/admin/topic`)
        setIsLoading(false)
    }

    return(
        <>
            {data && 
                <button className={`w-16 border-2 p-2 rounded-lg ${data.isVisible || isLoading ? 'bg-gray-300' : 'bg-red-500'}`} disabled={data.isVisible} onClick={()=>handleVisible(!data.isVisible)}>
                    {isLoading ? <Spinner /> : 'Del'}
                </button>
            }
        </>
    )
}