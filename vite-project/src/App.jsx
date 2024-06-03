import React, { useState,useRef } from 'react'
import Navbar from './components/NNavbar/NNavbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/HHome'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import Loginp from './components/loginpopup/Loginp'




const App = () => {
 
  const [showl,setSL] = useState(false);
  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const mobileAppRef = useRef(null);
  const contactUsRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
    {showl?<Loginp setSL={setSL} />:<></>}
    <div className='app'>
      <Navbar setSL={setSL} menuRef={ menuRef } mobileAppRef={mobileAppRef} scrollToSection={scrollToSection}/>
      <Routes>
        <Route path='/' element={<Home menuRef={ menuRef } mobileAppRef={mobileAppRef}/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Placeorder />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
