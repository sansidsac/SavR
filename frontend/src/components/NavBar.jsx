import React from 'react'

const NavBar = () => {
  return (
    <div>
        <nav className="bg-green-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">SavR</span>
                <span className="text-sm italic">Save and Savour</span>
            </div>
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Home</a>
                <a href="#" className="hover:text-gray-300">Link 1</a>
                <a href="#" className="hover:text-gray-300">Link 2</a>
            </div>
            <div className="flex items-center space-x-4">
                <button className="relative">
                    <span className="material-icons">notifications</span>
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
                </button>
                <button>
                    <span className="material-icons">settings</span>
                </button>
                <button className="bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-100">Login</button>
                <button className="bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-100">Signup</button>
            </div>
        </nav>
    </div>
  )
}

export default NavBar