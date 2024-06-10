import React, { useEffect, useState } from 'react'
import './Listitem.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Listitem = () => {
  const url = 'https://js-app1.onrender.com'
  const [list,setlist] = useState([]);
  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if(response.data.success){
      setlist(response.data.data)
    }
    else{
      toast.error('Error');
    }
  } 
  const removeFood = async(foodId)=>{
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
      await fetchList();
      if(response.data.success){
        toast.success("item successfully removed");
      }
      else{
        toast.success("something went wrong");
      }

  }
  useEffect(()=>{
    fetchList(); 
  },[])
  return (
    <div className='list add flex-col'>
      <p>All food List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
            <div key = {index} className='list-table-format'>
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className='cross01' onClick={()=>removeFood(item._id)}>X</p>
            </div>
            )
          })}
        </div>
    </div>
  )
}

export default Listitem
