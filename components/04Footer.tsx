import Image from "next/image";
import Link from "next/link";
import telegram from '../public/images/telegram.svg'
import instagram from '../public/images/instagram.svg'

export default function Footer(){
    return(
        <footer className="flex justify-between text-center p-5 border-t">
            <div className="leading-[40px]">
                Практика психолога
            </div>
            <div className="flex justify-center gap-x-1">
                <Link href={'https://t.me/Vika_Shed'}>
                    <Image src={telegram} alt="instagram"/>
                </Link>
                <Link href={'https://t.me/Vika_Shed'}>
                    <Image src={instagram} alt="instagram"/>
                </Link>
            </div>
        </footer>
    )
}