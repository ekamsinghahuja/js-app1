import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';


function ExploreMenu({menuRef,category,set}){
  
    return (
        <div ref={menuRef} className='explore-menu' id='explore-menu'>
          <h1>Explore</h1>
          <p className="explore-menu-text">Indulge in a culinary journey with our delectable menu. From savory delights to sweet temptations, we cater to every craving. Order now and experience the ultimate fusion of flavors, crafted with passion and served fresh to your table.</p>
          <div className='explore-menu-list'>
          {menu_list.map((item, index) => {
            const key = item.menu_id || index; // Use menu_id if available, otherwise use index
            return (
                <div onClick={() => set(prev => prev === item.menu_name ? "All" : item.menu_name)} key={key} className='explore-menu-list-item'>
                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
                <p>{item.menu_name}</p>
                </div>
            );
            })}
          </div>
        </div>
      );
}

export default ExploreMenu
