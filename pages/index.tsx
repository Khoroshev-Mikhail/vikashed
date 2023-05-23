import Nav from '@/components/01Nav';
import Main from '@/components/03Main';
import Footer from '@/components/04Footer';

const TopicList: React.FC = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Nav />
            <Main />
            <Footer />
        </div>

  );
};

export default TopicList;
