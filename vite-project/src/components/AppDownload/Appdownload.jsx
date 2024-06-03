import React from 'react'
import './Appdownload.css'
import { assets } from '../../assets/assets'
const Appdownload = ({mobileAppRef}) => {
  return (
    <div ref = {mobileAppRef} className='app-download' id='app-download'>
      <p>for better experience download our app</p>
      <div className="adp">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default Appdownload
