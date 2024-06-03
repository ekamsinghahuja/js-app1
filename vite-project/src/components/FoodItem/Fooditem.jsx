import React, { useContext, useState } from 'react'
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/SStoreContext';





const Fooditem = ({id,name,price,description,image}) => {

   
  
  const {cartItem,setCartItem,addToCart,removeFromCart,Url,token} = useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className = "food-item-image" src={Url +"/images/"+image} alt="" />
            {
              !cartItem[id]
              ?<img className ="add" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
              :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id,token)} src={assets.remove_icon_red} alt="" />
                <p>{cartItem[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }

            
        </div>
        
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" className='food-item-image-rating'/>
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
            
        </div>
    </div>
  )
}

export default Fooditem;
