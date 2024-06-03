import React from 'react'
import './Placeorder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/SStoreContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import axios from 'axios'


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Placeorder() {
  const {cartItem, food_list,removeFromCart,getTotalCartAmount,token,Url} = useContext(StoreContext)
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"", 
    country:"",
    phone:"",

  }) 
  const onChngH = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }
  useEffect(()=>{
      console.log(data);
  },[data]);

  const placO = async(event)=>{
    event.preventDefault();
    
    let OrderItems = [];
    food_list.map((item)=>{
      
      if(cartItem[item._id]>0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItem[item._id];
        OrderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:OrderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(Url+'/api/order/place',orderData,{headers:{token}});
    console.log(response);
    if(response.data.success){
      
      window.location.reload();
      
      
    }

  }
  
  return (
    
      <form onSubmit={placO} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-feilds">
            <input required name='firstName' onChange={onChngH} value={data.firstName} type='text' placeholder="First Name" />
            <input required name='lastName' onChange={onChngH} value={data.lastName} type='text' placeholder="Last Name" />
          </div>
          <input required name='email' onChange={onChngH} value={data.email} type="text" placeholder='Email address' />
          <input required name='street' onChange={onChngH} value={data.street} type="text" placeholder='Street' />
          <div className="multi-feilds">
            <input required name='city' onChange={onChngH} value={data.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChngH} value={data.street} type="text" placeholder='State' />
          </div>
          <div className="multi-feilds">
            <input required name='zipcode' onChange={onChngH} value={data.zipcode} type="text" placeholder='Zip Code' />
            <input required name='country' onChange={onChngH} value={data.country} type="text" placeholder='Country' />
          </div>
          <input required name='phone' onChange={onChngH} value={data.phone} type="text" placeholder='Phone No' />
        </div>
        
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details"><p>Subtotal</p><p>{getTotalCartAmount()}</p></div><hr />
          <div className="cart-total-details"><p>Delivery fee</p><p>{getTotalCartAmount()===0?0:2}</p></div><hr />
          <div className="cart-total-details"><b>Total:</b><b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b></div>
          </div>
          <button type='submit'>Place Order</button>
        </div>
          
          
        </div>

      </form>
  )
}

export default Placeorder
