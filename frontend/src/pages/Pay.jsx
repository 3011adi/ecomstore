import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import QRCode from 'qrcode.react';
const Pay = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/cart/${id}`)
      .then((response) => {
        setCart(response.data); // corrected here
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // added id as a dependency

  const upiString = `upi://pay?pa=${cart.upi}&pn=YourName&cu=INR`;

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-4xl font-serif my-4 text-center'>pay</h1>
      {loading ? (
        <Spinner />
      ) : (<div className='flex flex-col border-2 border-green-500 rounded-xl w-fit p-4 mx-auto hover:shadow-lg hover:shadow-green-500'>
       
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>Item</span>
            <span>{cart.object}</span>
          </div>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>price</span>
            <span>{cart.price}</span>
          </div>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>upi id</span>
            <span>{cart.upi}</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
  <h2 className='text-xl align-middle text-gray-500'>Scan to pay with UPI</h2>
  <QRCode className='text-center p-2' value={upiString} />
</div>
        </div>
      )}
    </div>
  );
};

export default Pay;