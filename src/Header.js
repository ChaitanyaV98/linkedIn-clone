import React from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HeaderOption from './HeaderOption';
import  BusinessCenterIcon  from '@mui/icons-material/BusinessCenter';
import ChatIcon from "@mui/icons-material/Chat"
import  NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch } from 'react-redux';
import { logout } from "./features/userSlice";
import {auth} from "./firebase";


function Header() {
  const dispatch=useDispatch();

  const logoutOfApp=()=>{
    dispatch(logout());
    auth.signOut()
  }
  return (
    <div className="header">
      <div className="header__left">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" alt=""/>
        
        <div className="header__search">
         <SearchIcon/>
            <input type="text" placeholder="Search"/>
        </div>
      </div>

      <div className="header__right">
        <HeaderOption Icon={HomeIcon}title="Home"/>
        <HeaderOption Icon={SupervisorAccountIcon}title="My Network"/>
        <HeaderOption Icon={BusinessCenterIcon}title="Jobs"/>
        <HeaderOption Icon={ChatIcon}title="Messages"/>
        <HeaderOption Icon={NotificationsIcon}title="Notifications"/>
        <HeaderOption avatar="https://www.freepik.com/icon/profile-picture_12225935"title="Me" onClick={logoutOfApp}/>
      
      </div>

      
    </div>
  )
}

export default Header
