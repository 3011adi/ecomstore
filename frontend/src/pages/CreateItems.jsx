import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaImage, FaRupeeSign, FaUser, FaBox, FaQrcode } from 'react-icons/fa';

const CreateItems = () => {
  const [seller, setSeller] = useState('');
  const [object, setObject] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [upi, setUpi] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!seller || !object || !price || !image || !upi) {
      setError('All fields are required');
      return false;
    }
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { seller, object, price, image, upi };
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://ecomstore-7nii.onrender.com/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create item');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <FaArrowLeft className="text-green-600 text-xl hover:text-green-800 transition-colors" />
          </Link>
          <h1 className="text-4xl font-bold text-green-800">List New Item</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Seller Input */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FaUser className="mr-2" />
                Seller Name
              </label>
              <input
                type="text"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>

            {/* Item Name Input */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FaBox className="mr-2" />
                Item Name
              </label>
              <input
                type="text"
                value={object}
                onChange={(e) => setObject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter item name"
              />
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FaRupeeSign className="mr-2" />
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter price"
                min="0"
              />
            </div>

            {/* Image URL Input */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FaImage className="mr-2" />
                Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter image URL"
              />
            </div>

            {/* UPI ID Input */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FaQrcode className="mr-2" />
                UPI ID
              </label>
              <input
                type="text"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter UPI ID"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                'List Item for Sale'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItems;