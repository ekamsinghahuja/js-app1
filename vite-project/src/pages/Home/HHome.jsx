import React, { useState ,useRef} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Appdownload from '../../components/AppDownload/Appdownload';


function Home( { mobileAppRef,menuRef } ) {
 
  const [category,setCategory] = useState("All");
  
  return (
    <div>
        <Header />
        <ExploreMenu menuRef={menuRef} category={category} set={setCategory} />
        <FoodDisplay category={category} />
        <Appdownload mobileAppRef={mobileAppRef} />
    </div>
  )
}

export default Home
