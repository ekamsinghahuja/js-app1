import React from 'react';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import {Route, Routes} from 'react-router-dom'
import Additems from './pages/additem/Additems';
import Listitem from './pages/listitem/Listitem';
import Orders from './pages/orders/OOrders';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr style={{ border: '1px solid black' }} />
      <div className='app-contents'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Additems />}/>
          <Route path='/list' element={<Listitem />}/>
          <Route path='/orders' element={<Orders />}/>

        </Routes>
        
      </div>
    </div>
  );
}

export default App;