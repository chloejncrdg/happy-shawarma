import React from 'react'
import "bootstrap/dist/js/bootstrap.min.js"

import logo from "../images/logo.png"
import bg from "../video/video.mp4"
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div>
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-color fixed-top'>
          <a className='navbar-brand' href='/'><img src={logo} alt='Company Logo'/></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">HOME</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/menu" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    MENU
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="menu.html#silog">Silog Meals</a>
                    <a className="dropdown-item" href="menu.html#shawarma">Shawarma Meals</a>
                    <a className="dropdown-item" href="menu.html#beverages">Beverages</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href='/admin'>ADMIN</a>
                </li>
              </ul>
            </div>
        </nav>
      </div>
      
      <main className='main-section'>
      <div className="home-cover">
          <video className="home-video-container" src={bg} autoPlay={true} loop></video>
          <div className="home-text-container">
            <h2>Welcome to</h2>
            <h1 id="dynamicText">Happy Shawarma!</h1>
            <button className="dig-in"><Link className='dig-in-text' to= "/menu">DIG IN</Link></button>
          </div>
        </div>
      </main>

      <footer>
        <div className='bottom-page'>
          <div className="bottom-page left"> 
            <nav className="footer-menu">
                <a href='/'>HOME</a>
                <a href="/menu">MENU</a>
                <a href="/admin">ADMIN</a>
            </nav>
            <h4>ADVDBL Final Project</h4>
            <p>Bala • Carandang • Chaingan • De Jesus • Gulmatico • Sibunga</p>
          </div>
          <div className="bottom-page right"> 
            <h2>Happy Shawarma</h2>
            <p>Lets you taste those Mediterranean Shawarma Pita Bread!<br/> 
              © 2023 Happy Shawarma. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
  
    </div>
  )
}


