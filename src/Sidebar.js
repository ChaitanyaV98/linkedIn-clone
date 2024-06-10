import React from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import {selectUser} from "./features/userSlice"

function Sidebar() {
const user = useSelector(selectUser)
const recentItem=(topic)=>{

    return(        
    <div className="sidebar__recentItem">
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>
    </div> 
    )
 
}


  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210723050322/Lineargradient2-660x322.png" alt="" />
        <Avatar src={user.photoUrl} className="sidebar__avatar" >{user.email[0]}</Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">1000,1</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">1000,1</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("softwareengineering")}
        {recentItem("programming")}
        {recentItem("designing")}
        {recentItem("React native")}
        {recentItem("developer")}
      </div>

    </div>
  );
}

export default Sidebar;
