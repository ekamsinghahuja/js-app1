import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link , useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/SStoreContext';
import { useContext } from 'react';

const Navbar = ({setSL,scrollToSection,menuRef,mobileAppRef}) => {


  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")


  }
  return (
    <div className='navbar'>
      <Link to='/'>
      <img src={assets.logo} alt="" className='logo'/>
      </Link>
      <ul className='navbar-menu'>
      <Link to='/'>
        <li onClick = {()=>setMenu("home")} className={menu === "home"?"active":""}>home</li>
      </Link>
      <li onClick={() => { setMenu("menu"); scrollToSection(menuRef); }} className={menu === "menu" ? "active" : ""}>menu</li>
      <li onClick={() => { setMenu("mobile-app"); scrollToSection(mobileAppRef); }} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
        <li onClick = {()=>setMenu("contact-us")} className={menu === "contact-us"?"active":""}>contact-us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'>
          <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        {!token
        ?<button onClick={()=>setSL(true)}>sign in</button>
        :<>
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li><img src={assets.bag_icon} alt="" /><p>orders</p></li>
            <hr />
            <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>logout</p></li>
          </ul>

        </div>
        
        </>}
       

      </div>
    </div>
  )
}

export default Navbar
