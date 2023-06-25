import React from 'react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom';


export default function OrderList({ orderList, setOrderList, checkOut}) {
    
    const totalPrice = orderList.reduce((total, item) => 
    total + item.price, 0);

    const requiredProperties = ['name', 'address', 'contact', 'orderMethod', 'paymentMethod'];

    const allPropertiesExist = orderList.length > 0 && orderList.every((order) =>
    requiredProperties.every((property) => order.hasOwnProperty(property))
    );
    

    function resetCart() {
        setOrderList([])
    }

    function handleSubtract(id) {
        setOrderList((prevItems) => {
            const updatedList = prevItems.map((product) => {
                if (product.tempID === id) {
                    const newQuantity = Math.max(product.quantity - 1, 0);
                    const newPrice = product.basePrice * newQuantity;
                    return { ...product, quantity: newQuantity, price: newPrice };
                }
                return product
            })
            const filterList = updatedList.filter((product) => product.quantity !== 0)
            return filterList
        })
    }

    function handleAdd(id) {
        setOrderList((prevItems) => {
            const updatedList = prevItems.map((product) => {
                if (product.tempID === id) {
                    const newQuantity = product.quantity + 1;
                    const newPrice = product.basePrice * newQuantity;
                    return { ...product, quantity: newQuantity, price: newPrice };
                }
                return product
            })
            return updatedList
        })
    }




  return (
    <div>
        <br/>
        <center><h3>My Cart</h3></center>

        <div className='cart-list' id='cartList'>
            {orderList.map((item) => (
                <div className='cart-item' key={item.tempID}>
                    <div className='quantity-container'>
                        <button onClick={() => handleSubtract(item.tempID)} className='quantity-btn'>-</button>
                        <span className='quantity'>{item.quantity}</span>
                        <button onClick={() => handleAdd(item.tempID)} className='quantity-btn'>+</button>
                    </div>
                    <span className='item-name'>{item.productName}</span>
                    <span className='price'>₱{item.price}.00</span>
                </div>
            ))}
        </div>

        <hr/> 

        <div id="totalPriceContainer">
            <span id="totalText">Total</span>
            <span id="totalPrice">₱ {totalPrice}.00</span>
        </div>

        <div className="buttons-container"> 
            {orderList.length > 0 && 
                (
                <button className="reset" onClick={resetCart}>RESET</button>
                )}

            {(allPropertiesExist && orderList.length) > 0 && 
                (
                    <button onClick={checkOut} className="checkout">CHECKOUT</button>
                )}
        </div>
    
    </div>
  )
}