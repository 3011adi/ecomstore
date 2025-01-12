import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaQrcode, FaCopy } from 'react-icons/fa';
import QRCode from 'qrcode.react';

const Pay = () => {
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCartItem = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://ecomstore-7nii.onrender.com/cart/${userId}`);
        const data = await response.json();
        const item = data.data.find(item => item._id === id);
        setCartItem(item);
      } catch (error) {
        console.error('Error fetching cart item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItem();
  }, [id]);

  const upiString = cartItem ? `upi://pay?pa=${cartItem.upi}&pn=YourName&cu=INR` : '';

  const copyUpiId = () => {
    if (cartItem) {
      navigator.clipboard.writeText(cartItem.upi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/cart" className="mr-4">
            <FaArrowLeft className="text-green-600 text-xl hover:text-green-800 transition-colors" />
          </Link>
          <h1 className="text-4xl font-bold text-green-800">Payment Details</h1>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : cartItem ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Order Summary */}
            <div className="bg-green-50 p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Order Summary</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={cartItem.image}
                  alt={cartItem.object}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{cartItem.object}</h3>
                  <p className="text-gray-600">Seller: {cartItem.seller}</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">₹{cartItem.price}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-6 space-y-6">
              {/* UPI ID Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">UPI ID</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-gray-50 rounded-lg font-mono text-gray-800">
                    {cartItem.upi}
                  </div>
                  <button
                    onClick={copyUpiId}
                    className="p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Copy UPI ID"
                  >
                    <FaCopy />
                  </button>
                </div>
                {copied && (
                  <p className="text-green-600 text-sm">UPI ID copied to clipboard!</p>
                )}
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaQrcode className="text-xl" />
                  <span className="font-medium">Scan QR Code to Pay</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <QRCode 
                    value={upiString} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Open your UPI app and scan this code to make the payment
                </p>
              </div>

              {/* Payment Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-blue-800 font-medium mb-2">Payment Instructions</h3>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li>Open your preferred UPI payment app</li>
                  <li>Scan the QR code above or copy the UPI ID</li>
                  <li>Enter the amount: ₹{cartItem.price}</li>
                  <li>Complete the payment using your UPI PIN</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-400 text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Item not found</h3>
            <p className="text-gray-500 mb-4">The requested payment item could not be found.</p>
            <Link
              to="/cart"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Return to Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pay;