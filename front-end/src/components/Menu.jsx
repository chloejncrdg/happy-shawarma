import React from 'react'
import { useState } from 'react'
import axios from "axios"
import "bootstrap/dist/js/bootstrap.min.js"


import logo from "../images/logo.png"
import bg from "../video/video.mp4"

import shawarmaMeals from "../products/shawarma"
import silogCheese from "../products/silogCheese"
import beverages from "../products/beverages"

import Customer from './order/Customer'
import Checkout from './order/Checkout'


export default function Menu() {


  const currentDate = new Date()
  currentDate.setUTCHours(currentDate.getUTCHours() + 8)
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  const [orderList, setOrderList] = useState([]);
  const cart = orderList.map(({ tempID, basePrice, ...rest }) => rest);  // To put in the database

  const [showOrder, setShowOrder] = useState(false)
 

    function addProduct(product) {
    const existingItem = orderList.find((item) => item.productName === product.title)
    if (existingItem) {
      const updatedItems = orderList.map((item) => {
        if (item.productName === product.title) {
          return {...item, quantity: item.quantity + 1, price: product.price * (item.quantity + 1)}
        }
        return item
      })
      setOrderList(updatedItems)
    } else {
      const newOrder = {
        ...orderList[0], // Take the first order details object from the array
        tempID: crypto.randomUUID(),
        orderDate: formattedDate,
        productID: product.id,
        productName: product.title,
        quantity: +1,
        basePrice: product.price,
        price: product.price
      }; 
      setOrderList(prevOrders => [...prevOrders, newOrder]);
    }
  }

  function addUpgrade(product) {
    const existingItem = orderList.find((item) => item.productName === product.upgrade)
    if (existingItem) {
      const updatedItems = orderList.map((item) => {
        if (item.productName === product.upgrade) {
          return {...item, quantity: item.quantity + 1, price: product.upgradePrice * (item.quantity + 1)}
        }
        return item
      })
      setOrderList(updatedItems)
    } else {
      const newOrder = {
        ...orderList[0], // Take the first order details object from the array
        tempID: crypto.randomUUID(),
        orderDate: formattedDate,
        productID: product.id,
        productName: product.upgrade,
        quantity: +1,
        basePrice: product.upgradePrice,
        price: product.upgradePrice
      };
      setOrderList(prevOrders => [...prevOrders, newOrder]);
    }
  }

    async function checkOut(event) {
      event.preventDefault()
      setShowOrder(prevState => !prevState)
      console.log(cart)
      try {
        await axios.post("http://localhost:8800/orders", cart)
      } catch (err) {
        console.log(err)
      }
    }
    

    
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
                <li className="nav-item">
                  <a className="nav-link" href="/menu" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    MENU
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href='/admin'>ADMIN</a>
                </li>
              </ul>
            </div>
        </nav>
      </div>


      <main>
        <div className='cover'>
        <video className="home-video-container" src={bg} autoPlay loop muted></video>
          <div className='text-container'>
            <h1>What are you craving for?</h1>
            <p>We offer a wide range of meals from Shawarma to Silog meals!</p>
          </div>
        </div>
        <div className='content'>
          <div className='menu'>
            <h2 className='menu-category' id='shawarma'>Shawarma Meals</h2>
            <br/>
            <div className='menu-grid'>
              {shawarmaMeals.map((product) => (
                <div className='menu-item' key={product.id}>
                  <img className='item-picture' src={require(`../images/${product.image}`)} alt='Shawarma Meal'/>
                  <h5 className='item-name'>{product.title}</h5>
                  <hr className='solid'></hr>

                  <h5 className='item-price'>₱ {product.price}.00</h5>
                  <button onClick={() => addProduct(product)} className='order-item'>Ala Carte</button>

                  <h5 className='item-price'>₱ {product.upgradePrice}.00</h5>
                  <button onClick={() => addUpgrade(product)} className='order-item'>Buy 1 Take 1</button>
                </div>
              ))}
            </div>
            <br/><br/>
            <h2 className='menu-category' id='silog'>Silog with Cheese Meals</h2>
            <br/>

            <div className='menu-grid'>
              {silogCheese.map((product) => (
                <div className='menu-item' key={product.id}>
                  <img className='item-picture' src={require(`../images/${product.image}`)} alt='Silog Meal'/>
                  <h5 className='item-name'>{product.title}</h5>
                  <hr className='solid'></hr>

                  <h5 className='item-price'>₱ {product.price}.00</h5>
                  <button onClick={() => addProduct(product)} className='order-item'>Ala Carte</button>

                  <h5 className='item-price'>₱ {product.upgradePrice}.00</h5>
                  <button onClick={() => addUpgrade(product)} className='order-item'>Buy 1 Take 1</button>
                </div>
              ))}
            </div>

            <br/><br/>

            <h2 className='menu-category' id='silog'>Beverages</h2>
            <br/>
            
            <div className='menu-grid'>
              {beverages.map((product) => (
                <div className='menu-item' key={product.id}>
                  <img className='item-picture' src={require(`../images/${product.image}`)} alt='Beverages'/>
                  <h5 className='item-name'>{product.title}</h5>
                  <hr className='solid'></hr>

                  <h5 className='item-price'>₱ {product.price}.00</h5>
                  <button onClick={() => addProduct(product)} className='order-item'>16 oz</button>

                  <h5 className='item-price'>₱ {product.upgradePrice}.00</h5>
                  <button onClick={() => addUpgrade(product)} className='order-item'>22 oz</button>
                </div>
              ))}
            </div>
          </div>
           {/* Cart component: */}
           <Customer 
              orderList={orderList}
              setOrderList = {setOrderList}
              checkOut = {checkOut}
              cart = {cart}
  
           /> 
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
      {showOrder && <Checkout
        orderList = {orderList}
        setOrderList = {setOrderList}
        setShowOrder = {setShowOrder}
      />}



    </div>
  )
}