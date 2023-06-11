import Image from "next/image";
import Link from "next/link";
import telegram from '../public/images/telegram.svg'
import instagram from '../public/images/instagram.svg'
import vk from '../public/images/vk.svg'

export default function Footer(){
    return(
        <footer className="flex justify-between text-center mt-5 p-5 border-t border-black">
            <div className="leading-[40px]">
                Логика психолога
            </div>
            <div className="flex justify-center gap-x-1">
                <Link href={'https://t.me/Vika_Shed'}>
                    <Image src={telegram} alt="instagram"/>
                </Link>
                <Link href={'https://www.instagram.com/shedvika.psy'}>
                    <Image src={instagram} alt="instagram"/>
                </Link>
                <Link href={'https://vk.com/shedvika'}>
                    <Image src={vk} alt="instagram"/>
                </Link>
            </div>
        </footer>
    )
}