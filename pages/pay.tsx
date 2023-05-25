import Link from "next/link";

export default function About(){
    return(
        <div className="px-5 space-y-3">
            Для открытия доступа к платным материалам, пожалуйста свяжитесь со мной в <Link className="text-black underline" href={'https://t.me/Vika_Shed'}>telegram.</Link>
        </div>
    )
}