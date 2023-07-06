import { useState } from "react"
import useSWR from 'swr'
import parse from 'html-react-parser';
// import { getMatches } from "@/lib/hooks";

export default function Search(){
    const [search, setSearch] = useState<string>('')
    const { data } = useSWR<Article[]>(`/api/article/search?string=${search}`)
    // getMatches('1ara1 2ara2 3ara3', 'ara')
    return(
        <div className="w-full relative">
            <input value={search} onChange={ (e)=>setSearch(e.target.value) } type="text" className="w-full p-2 rounded-md font-bold text-[15px] bg-[#F2F2F2]" placeholder="Поиск статей..."/>
            {/* <div className="absolute top-5">
                { data && data.map(el => {
                    const text = parse(el.text)
                    const matches = getMatches(text as string, search)
                    return (
                        <div className="border-b py-1 flex flex-col">
                            {
                                matches && matches.map(match => {
                                    return (
                                        <div className="pl-4">
                                            {match}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}