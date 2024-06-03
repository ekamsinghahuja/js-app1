import React, { useEffect, useState } from 'react'
import './orders.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const url = 'http://localhost:4000'

  const [list,setlist] = useState([]);

  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/order/list`);
    console.log(response.data.data)
    if(response.data.success){
      setlist(response.data.data)
    }
    else{
      toast.error('Error');
    }
  }
  useEffect(()=>{
    fetchList(); 
  },[])

  return (
    <div>
       <div className='Olist add flex-col'>
      <p>All Order List</p>
        <div className="Olist-table">
          <div className="Olist-table-format title">
            <b>S.No.</b>
            <b>Name</b>
            <b>address</b>
            <b>phone no.</b>
            <b>Order</b>
            <b>Bill</b>
            <b>Status</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
            <div key = {index} className='Olist-table-format'>
                <p>{index+1}</p>
                <p>{item.address.firstName}</p>
                <p>{item.address.street + " ," + item.address.city + " ," + item.address.state + " ," + item.address.country + " ," + item.address.zipcode}</p>
                <p>{item.address.phone}</p>
                <p>{item.items.map((x,ind)=>{
                  return(
                    <>
                    <p>{x.name}</p>
                    <p>{x.quantity}</p>
                    </>

                  );
                })}</p>
                <p>${item.amount}</p>
                <p>{item.status}</p>
                <p className='Ocross01' onClick={()=>removeFood(item._id)}>X</p>
            </div>
            )
          })}
        </div>
    </div>

      
      
    </div>
  )
}

export default Orders
