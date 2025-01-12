import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaUserPlus, FaRobot } from 'react-icons/fa';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://ecomstore-7nii.onrender.com/items')
      .then(res => res.json())
      .then(data => {
        setItems(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const addToCart = async (item) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      const newCartItem = {
        seller: item.seller,
        object: item.object,
        price: item.price,
        image: item.image,
        upi: item.upi,
      };

      const response = await fetch(`https://ecomstore-7nii.onrender.com/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCartItem),
      });
      const data = await response.json();
      console.log('Item added to cart:', data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const filteredItems = items.filter(item =>
    item.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 sm:mb-0">
            Marketplace
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-green-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <FaSearch className="absolute left-3 top-3 text-green-400" />
            </div>
            <Link to="/signup" className="transition-transform hover:scale-110">
              <FaUserPlus className="text-green-600 text-2xl" title="Sign Up" />
            </Link>
            <Link to="/items/create" className="transition-transform hover:scale-110">
              <MdOutlineAddBox className="text-green-600 text-3xl" title="Add Item" />
            </Link>
            <Link to="/cart" className="transition-transform hover:scale-110">
              <FaShoppingCart className="text-green-600 text-2xl" title="Cart" />
            </Link>
          </div>
        </div>

        {/* Floating GPT Button */}
        <Link 
          to="/chat" 
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group z-50"
        >
          <FaRobot className="text-2xl" />
          <span className="absolute right-full mr-3 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with GPT
          </span>
        </Link>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.object}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      {item.seller}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.object}
                  </h2>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-green-600">
                      ₹{item.price}
                    </p>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-black text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;