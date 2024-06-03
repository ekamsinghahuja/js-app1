import React, { useEffect, useState } from 'react'
import './additems.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { ToastContainer, toast} from 'react-toastify';
const Additems = () => {
    const url = "http://localhost:4000" ;
    const [image,setimg] = useState(false)
    const [data,setdata] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad",


    })
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setdata(data=>({...data,[name]:value}));


    }
    useEffect(()=>{
        console.log(data);
    },[data]);
    const onSubmitHandle = async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("price",Number(data.price));
        formData.append("image",image);
        const response = await axios.post(`${url}/api/food/add`,formData);
        if(response.data.success){
            setdata({
                name:"",
                description:"",
                price:"",
                category:"Salad",
            })
            setimg(false);
            toast.success('food added');
        }
        else{
            toast.error('something went wrong');
        }

    }
  return (
    <div className='add'>
        <form action="" className="flex-col" onSubmit={onSubmitHandle}>
            <div className='add-image-upload flex-col'>
                <p>
                    UploadImage
                </p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setimg(e.target.files[0])} type='file' id='image' hidden required/>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder = 'Type here'/>
                </div>
                <div className='add-product-des flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} rows="6" name="description" placeholder="Write content here..."></textarea>
                </div>
                <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select name="category" onChange={onChangeHandler} value={data.category}>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                     <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
                </div>
            </div>
            </div>
            <button type = 'submit' className='add-btn'>Add</button>
        </form>

      
    </div>
  )
}

export default Additems
