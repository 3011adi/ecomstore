import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateItems from './pages/CreateItems'
import Cart from './pages/Cart'
import Chat from './pages/Chat'
import Pay from './pages/Pay'
import Signup from './pages/Signup'
import LogIn from './pages/LogIn'
const App = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>}></Route>
      <Route path='/items/create' element={<CreateItems/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<LogIn/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/chat' element={<Chat/>}> </Route>
      <Route path='/cart/pay/:id' element={<Pay/>}></Route>
    </Routes>
  )
}

export default App