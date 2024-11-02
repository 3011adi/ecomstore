import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import QRCode from 'qrcode.react';

const Pay = () => {
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(false);
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
        const response = await axios.get(`https://ecomstore-7nii.onrender.com/cart/${userId}`);
        // Find the specific item from the cart items array
        const item = response.data.data.find(item => item._id === id);
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

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-4xl font-serif my-4 text-center'>pay</h1>
      {loading ? (
        <Spinner />
      ) : cartItem ? (
        <div className='flex flex-col border-2 border-green-500 rounded-xl w-fit p-4 mx-auto hover:shadow-lg hover:shadow-green-500'>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>Item</span>
            <span>{cartItem.object}</span>
          </div>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>price</span>
            <span>{cartItem.price}</span>
          </div>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>upi id</span>
            <span>{cartItem.upi}</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='text-xl align-middle text-gray-500'>Scan to pay with UPI</h2>
            <QRCode className='text-center p-2' value={upiString} />
          </div>
        </div>
      ) : (
        <div>Item not found</div>
      )}
    </div>
  );
};

export default Pay;