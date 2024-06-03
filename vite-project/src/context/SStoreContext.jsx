import { createContext , useEffect, useState} from "react";
export const StoreContext = createContext(null);
import axios from 'axios'

const StoreContextProvider = (props) => {
    const [cartItem,setCartItem] = useState({});
    const Url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);
    

    const addToCart = async(itemId)=>{
        console.log(token);
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(Url + '/api/cart/add',{itemId},{headers:{token}})
        }
    }
    
    const removeFromCart = async (itemId, token) => {
        
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        try {
            console.log(token)
            if (token) {
                const response = await axios.post(Url + "/api/cart/remove", { itemId }, { headers: { token } });
                console.log(response.data); 
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    useEffect(()=>{
        console.log(cartItem)

    },[cartItem])

    const fetchfl = async()=>{
        const response = await axios.get(Url+"/api/food/list");
        console.log(response)
        setFoodList(response.data.data);
    }
    const loadCartData = async(token)=>{
       
        const response = await axios.get(Url+"/api/cart/get",{headers:{token}});
        setCartItem(response.data.cartData);

    }
    useEffect(()=>{
        
        async function loadData(){
            await fetchfl();
            if(localStorage.getItem("token")){
                const storedToken = localStorage.getItem("token");
                setToken(storedToken);
                console.log("hello");
                await loadCartData(storedToken); 
            }
        }
        loadData();


    },[])

    const getTotalCartAmount = ()=>{

        let totalAmount = 0
        for(const item in cartItem){
            if(cartItem[item]>0){
                let item_info = food_list.find((product)=>product._id === item);
                totalAmount += item_info.price*cartItem[item];
            }
        }
        return totalAmount;
    }
    
    const contextValue = {
        food_list,cartItem,
        setCartItem,addToCart,
        removeFromCart,
        getTotalCartAmount,
        Url,
        token,
        setToken,
    }
    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
