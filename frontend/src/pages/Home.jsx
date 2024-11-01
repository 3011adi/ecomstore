import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineAddBox } from 'react-icons/md';
//adi👀
const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://ecomstore-7nii.onrender.com/items')
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const addToCart = async (item) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        // Redirect to login page or show login prompt
        return;
      }

      const newCartItem = {
        seller: item.seller,
        object: item.object,
        price: item.price,
        image: item.image,
        upi: item.upi,
      };

      const response = await axios.post(`https://ecomstore-7nii.onrender.com/cart/${userId}`, newCartItem);
      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-5xl my-4 font-mono'>Items List</h1>
        <div className='flex'>
          <Link to='/items/create' className='px-5'>
            <MdOutlineAddBox className='text-green-500 text-4xl hover:bg-green-200' />
          </Link>
          <Link to='/signup' className='px-5'>
            <MdOutlineAddBox className='text-green-500 text-4xl hover:bg-green-200' />
          </Link>
          <Link to='/cart'>
            <FaShoppingCart className='text-green-700 text-4xl hover:bg-green-200' />
          </Link>
          <Link to='/chat'><h1 className='bg-green-400 rounded-lg p-1 m-1 mx-6 shadow-lg shadow-green-300 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-300'>gpt</h1></Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {items.map((item, index) => (
            <div key={item._id} className='border-2 border-gray-500 rounded-lg p-4 relative  bg-slate-50 hover:shadow-xl hover:shadow-green-800'>
              <h2 className='absolute top-1 left-2 px-4 py-1 my-2 bg-green-500 rounded-lg'>{item.seller}</h2>
              <img src={item.image} alt={item.object} className='w-full h-52 object-contain' />
              <div className='flex flex-col my-5 items-center'>
                <p className='text-3xl my-3 font-serif'>{item.object}</p>
                
                <p className='text-lg my-1 text-gray-700 font-semibold'>rs. {item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className='mt-4 text-md absolute bottom-1 right-2 px-4 py-2  text-white bg-black rounded-lg hover:text-black hover:bg-green-500 hover:shadow-black hover:shadow-md'
                >
                  Add to Cart
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
          











