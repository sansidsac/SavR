import { FaBell, FaCog } from 'react-icons/fa';

const NavBar = () => {
return (
    <div>
        <nav className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold tracking-wide">SavR</span>
                <span className="text-base italic text-gray-200">Save and Savour</span>
            </div>
            <div className="flex space-x-10">
                <a href="#" className="hover:text-gray-200">Home</a>
                <a href="#" className="hover:text-gray-200">Features</a>
                <a href="#" className="hover:text-gray-200">Pricing</a>
                <a href="#" className="hover:text-gray-200">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
                <button className="relative">
                    <FaBell className="text-xl" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">3</span>
                </button>
                <button>
                    <FaCog className="text-xl" />
                </button>
                <button className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-100">Login</button>
                <button className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-100">Signup</button>
            </div>
        </nav>
    </div>
)
}

export default NavBar