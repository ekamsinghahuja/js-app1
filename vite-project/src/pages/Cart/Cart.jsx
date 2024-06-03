import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/SStoreContext'
import { useNavigate } from 'react-router-dom';

function Cart() {
  const {cartItem, food_list,removeFromCart,getTotalCartAmount,Url,token} = useContext(StoreContext)
  const navigate = useNavigate();
  const check = (cartItem)=>{
    for (let key in cartItem) {
      if (cartItem[key] > 0) {
        return true;
      }
    }
    return false;
  }
  return (
    <>
    {check(cartItem)?
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
      
      <br />
      <hr />
      {food_list.map((item,index)=>{
        if(cartItem[item._id]>0){
          return (
          <div>
          <div className='cart-items-title cart-items-item'>
            <img src={Url + "/images/" +item.image} alt="" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{cartItem[item._id]}</p>
            <p>${item.price*cartItem[item._id]}</p>
            <p className='cross'onClick={()=>removeFromCart(item._id,token)}>x</p>
           
          </div>
          <hr />

          </div>
          )
        }
      })

      }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details"><p>Subtotal</p><p>{getTotalCartAmount()}</p></div><hr />
          <div className="cart-total-details"><p>Delivery fee</p><p>{getTotalCartAmount()===0?0:2}</p></div><hr />
          <div className="cart-total-details"><b>Total:</b><b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>checkout</button>
        </div>
       
      <div className="cart-promocode">
        <div>
          <p>apply code:</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='Code' name="" id="" />
            <button>Submit</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    :<h1 className="empty-cart-message">Look like there is nothing in your cart !!</h1>
    }
    </>
  )
}

export default Cart
