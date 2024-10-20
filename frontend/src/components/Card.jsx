import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';

const Card = ({ itemName, quantity, price, location, preparedTime, expiryTime }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2 bg-white">
            <div className="font-bold text-xl mb-2">{itemName}</div>
            <p className="text-gray-700 text-base">Quantity: {quantity}</p>
            <p className="text-gray-700 text-base">Price: ${price}</p>
            <p className="text-gray-700 text-base flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {location}
            </p>
            <p className="text-gray-700 text-base">Prepared Time: {preparedTime}</p>
            <p className="text-gray-700 text-base">Expiry Time: {expiryTime}</p>
        </div>
    );
};

export default Card;
