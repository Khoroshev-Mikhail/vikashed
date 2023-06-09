import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import useSWR from 'swr'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import edit from '../../public/images/edit.svg'
import usd from '../../public/images/usd.svg'
import Link from 'next/link';


const Article: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading } = useSWR<Article>(id ? `/api/article/${id}` : null)
    const { data: session } = useSession()
    return (
        //breadcrumbs
        <>
            {data && 
                <div className='px-5 w-full md:w-2/3  mx-auto'>

                    {session?.user?.role === 'ADMIN' &&
                        <div className='flex'>
                            <Link href={`/admin/article/${data.id}`}><Image src={edit} alt='Редактировать'/></Link>
                        </div>
                    }

                    <h1 className='w-full border-b pb-2 mt-4'>
                        { data.isPaid && session?.user.role === 'ADMIN' && <Image src={usd} alt='$$$' className='inline'/> } {data.name}
                    </h1>
                    <div className='mt-2'>
                        {data?.text && parse(data.text)}
                    </div>
                </div>
            }
        </>
    );
};

export default Article;
