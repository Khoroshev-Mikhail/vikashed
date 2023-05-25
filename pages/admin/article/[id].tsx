import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import Topics from '@/components/admin/article/Topics_admin';
import useSWRMutation from 'swr/mutation'
import { updateFetch } from '@/lib/fetchers';
import { ReqBodyPutArticle } from '@/pages/api/article/[id]';
import dynamic from 'next/dynamic';
import { FORMATS, MODULES } from '@/lib/consts';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; 


const ArticleForm = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const [name, setName] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [connections, setConnections] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [isPaid, setIsPaid] = useState<boolean>(false)

    const { data, error, isLoading } = useSWR<ArticleWithConnections>(id ? `/api/article/${id}` : null)
    const { trigger, isMutating, error: isMutatingError } = useSWRMutation<any, any, any, ReqBodyPutArticle>(`/api/article/${id}`, updateFetch)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await trigger({ name, text, isVisible, isPaid, topic: connections })
        if(!isMutatingError){
            router.push(`/article/${id}`)
        }
    };

    const handleTextChange = (value: string) => {
        setText(value);
    };

    useEffect(() => {
        if (data) {
            setName(data.name);
            setText(data.text);
            setConnections(data.topic?.map((topic) => topic.id) || []);
            setIsVisible(data.isVisible)
            setIsPaid(data.isPaid)
        }
    }, [data]);

    return (
        <div className='px-5'>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                {/* <button type='button' onClick={()=>setIsVisible(!isVisible)}>
                    { isVisible ? <Image src={eye_hidden} alt='Скрыть'/> : <Image src={eye} alt='Показать'/> }
                </button> */}
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Название статьи:
                    </label>
                    <input type="text" id="name" value={name} onChange={ (e)=>setName(e.target.value) } className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                <div className="mb-4 h-full">
                    <label htmlFor="text" className="block mb-2 font-medium">
                        Тело статьи:
                    </label>
                    <ReactQuill id="text" theme="snow" value={text} onChange={handleTextChange} formats={FORMATS} modules={MODULES} />
                </div>

                <div>
                    <Topics connections={connections} setConnections={setConnections} isVisible={isVisible} setIsVisible={setIsVisible} isPaid={isPaid} setIsPaid={setIsPaid} />
                </div>
                
                <div className='flex gap-x-2'>
                    <button type="submit" className="px-4 py-2 bg-black text-white rounded-md" disabled={isLoading || isMutating} >
                        Сохранить
                    </button>
                </div>
                
            </form>
        </div>
    );
};
ArticleForm.admin = true
export default ArticleForm;
