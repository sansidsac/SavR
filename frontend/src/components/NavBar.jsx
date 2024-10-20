import { FaBell, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold tracking-wide">SavR</span>
                    <span className="text-base italic text-gray-300">Save and Savour</span>
                </div>
                <div className="flex space-x-10">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/sender" className="hover:text-gray-300">Sender</Link>
                    <Link to="/receiver" className="hover:text-gray-300">Receiver</Link>
                    <Link to="/" className="hover:text-gray-300">Contact</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative">
                        <FaBell className="text-xl" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">3</span>
                    </button>
                    <button>
                        <FaCog className="text-xl" />
                    </button>
                    <button className="bg-white text-blue-800 px-4 py-2 rounded hover:bg-gray-200">Login</button>
                    <button className="bg-white text-blue-800 px-4 py-2 rounded hover:bg-gray-200">Signup</button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar