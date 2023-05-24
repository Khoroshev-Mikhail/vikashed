import React, { ReactNode } from 'react';
import Nav from '@/components/01Nav';
import Footer from '@/components/04Footer';
import { Plus_Jakarta_Sans } from 'next/font/google'

const main_font = Plus_Jakarta_Sans({ subsets: ['latin'] })

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`${main_font.className} flex flex-col min-h-screen`} >
        <Nav />
        <div className='flex-grow mt-5'>
            {children}
        </div>
        <Footer />
    </div>
  );
};

export default Layout;
