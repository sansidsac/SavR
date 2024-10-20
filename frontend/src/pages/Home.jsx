import Navbar from '../components/NavBar';
import SenderPage from '../pages/SenderPage';
import ReceiverPage from '../pages/ReceiverPage';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-950">
            <Navbar />
            {/* <SenderPage/> */}
            <ReceiverPage/>
        </div>
    );
};

export default Home;
