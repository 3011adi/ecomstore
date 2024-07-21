import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateItems = () => {
    const [seller, setSeller] = useState('');
  const [object, setObject] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [upi,setUpi]=useState('');
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      seller,
      object,
      price,
      image,
      upi
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/items', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
    <BackButton />
    <h1 className='text-5xl my-8 font-extralight px-6'>Sell product</h1>
    {loading ? <Spinner /> : ''}
    <div className='flex flex-col border-2 border-green-500 rounded-xl w-[600px] p-4 mx-auto shadow-lg shadow-black'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Seller</label>
        <input
          type='text'
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Object</label>
        <input
          type='text'
          value={object}
          onChange={(e) => setObject(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Price</label>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
        
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Image</label>
        <input
          type='text'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
        
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>upi id</label>
        <input
          type='text'
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
        
      </div>
      <button className='p-2 bg-green-500 rounded-lg m-8 hover:bg-black hover:text-green-500 hover:shadow-lg hover:shadow-green-500' onClick={handleSaveBook}>
        Save
      </button>
    </div>
  </div>
  )
}

export default CreateItems