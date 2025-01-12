import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaShoppingBag } from 'react-icons/fa';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (id) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not logged in');
        return;
      }

      setLoading(true);
      const response = await fetch(
        `https://ecomstore-7nii.onrender.com/cart/${userId}/${id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setCarts(carts.filter(cart => cart._id !== id));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not logged in');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://ecomstore-7nii.onrender.com/cart/${userId}`);
        const data = await response.json();
        setCarts(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const totalPrice = carts.reduce((total, cart) => total + cart.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <FaArrowLeft className="text-green-600 text-xl hover:text-green-800 transition-colors" />
          </Link>
          <h1 className="text-4xl font-bold text-green-800">Shopping Cart</h1>
        </div>

        {/* Total Price Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Total Amount:</span>
            <span className="text-2xl font-bold text-green-600">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        ) : (
          /* Cart Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carts.map((cart, index) => (
              <div
                key={cart._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                {/* Item Header */}
                <div className="bg-green-50 px-4 py-2 flex justify-between items-center">
                  <span className="text-green-800 font-medium">Item #{index + 1}</span>
                  <span className="text-green-600 font-bold">₹{cart.price.toLocaleString()}</span>
                </div>

                {/* Item Content */}
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={cart.image}
                        alt={cart.object}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{cart.object}</h3>
                      <p className="text-gray-600">Seller: {cart.seller}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      onClick={() => deleteItem(cart._id)}
                      className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="mr-2" />
                      Remove
                    </button>
                    <Link
                      to={`/cart/pay/${cart._id}`}
                      className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaShoppingBag className="mr-2" />
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Cart State */}
        {!loading && carts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add some items to your cart to get started!</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;