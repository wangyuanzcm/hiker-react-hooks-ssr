import React from 'react'
import {
    NavLink
  } from "react-router-dom";
import './home.css';
const Home = ()=>{
    return (
        <div className="home">
            <h2>Home页面</h2>
            <NavLink to="/about">跳转about页面</NavLink>
        </div>
    )
}
export default Home;