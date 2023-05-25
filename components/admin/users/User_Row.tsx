import { updateFetch } from '@/lib/fetchers'
import { ResUsers } from '@/pages/api/user'
import { ReqBodyUser } from '@/pages/api/user/[id]'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function User_Row({ id, name, isPremium: props_isPremium } :ResUsers){
    const [isPremium, setIsPremium] = useState<boolean>(props_isPremium)
    const { trigger, isMutating, error: isMutatingError } = useSWRMutation<any, any, any, ReqBodyUser>(`/api/user/${id}`, updateFetch)
    
    const handler = async () => {
        const result = !isPremium
        setIsPremium(result)
        trigger({ id, isPremium: result })
    }

    return(
        <div className='flex justify-between px-5'>
            <div className='flex flex-col justify-center'>
                <div className=''>{name}</div>
            </div>
            <div>
                <button 
                    onClick={handler}
                    className={`${isPremium ? 'bg-green-400' : 'bg-red-400'} border-black border-2 p-2 rounded-xl`}
                >
                    {isPremium ? 'Оплачен' : 'Неоплачен'}
                </button>
            </div>
        </div>
    )
}