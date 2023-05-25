import User_Row from '@/components/admin/users/User_Row'
import { ResUsers } from '@/pages/api/user'
import useSWR from 'swr'


export default function User(){
    const { data } = useSWR<ResUsers[]>('/api/user')

    return(
        <div className=''>
            {data && data.map(el => {
                return (
                    <User_Row {...el} />
                )
            })}
        </div>
    )
}