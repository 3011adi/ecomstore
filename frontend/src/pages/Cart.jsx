import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(`https://ecomstore-7nii.onrender.com/cart/${id}`);

      if (!response.status === 200) {
        throw new Error('Error deleting item');
      }

      // Remove the deleted item from the local state
      setCarts(carts.filter(cart => cart._id !== id));
      setLoading(false)
    } catch (err) {
      setError(err.message);
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
        const response = await axios.get(`https://ecomstore-7nii.onrender.com/cart/${userId}`);
        setCarts(response.data.data);
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
    <div className='p-4'>
      <BackButton />
      <div className='flex justify-between items-center'>
        <h1 className='text-5xl my-6 px-8 font-mono'>cart </h1>
        <h2 className='bg-green-500 roundeds-md text-xl font-thin text-white px-2 shadow-lg shadow-green-500 '>Total: rs. {totalPrice}</h2>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {carts.map((cart, index) => (
            <div key={cart._id} className='border border-green-500 rounded-md p-4 hover:shadow-lg hover:shadow-green-500'>
              <p className='top-0 left-0'>{index + 1})</p>
               <div className='flex'>
                <div className='px-6'> 
                  <img className='w-24' src={cart.image}/>
                </div>
                <div className='px-6'>
                  <p className='text-center'> seller={cart.seller}</p>
                  <p className='text-center'> item={cart.object}</p>
                  <p className='text-center'>rs .{cart.price}</p>
                 
                </div>
              </div>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/cart/pay/${cart._id}`}>
                  <h1 className='text-md px-2  text-white bg-black rounded-lg m-1  hover:text-black hover:bg-green-500  hover:shadow-black hover:shadow-md'>buy</h1>
                </Link>
                <button  onClick={() => deleteItem(cart._id)}><h1 className='bg-black rounded-lg px-2 text-white text-md hover:bg-red-500 hover:shadow-black hover:shadow-md'>Delete</h1></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Cart;