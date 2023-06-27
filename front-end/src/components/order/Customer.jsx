import React from 'react'

import OrderList from './OrderList'

export default function Customer({ orderList, setOrderList, checkOut, cart }) { 


    function handleChange(event) {
        const { name, value } = event.target;
      
        setOrderList((prevOrders) =>
          prevOrders.map((order) => ({
            ...order,
            [name]: value
          }))
        );
      }

      const customerDetails = orderList.length > 0 ? orderList[0] : {};

  return (
    <div className='cart'>
        <div className='customer-details'>
            <h3 className='step'>Step 2: Enter your details</h3>
            <center><h3>My Details</h3></center>
            <br/>

        {/* Customer name input */}  
            <input 
                type="text" 
                className='input' 
                placeholder='Name' 
                name='name'
                id='customerName' 
                onChange={handleChange}
                value={customerDetails.name || ""}
                disabled={orderList.length === 0}
                required


            />

        {/* Customer address input */}
            <input 
                type="text" 
                className='input' 
                placeholder='Address' 
                name='address'
                id='customerAddress'
                onChange={handleChange}
                value={customerDetails.address || ""}
                disabled={orderList.length === 0}
                required
            />

        {/* Customer contact input */}
            <input 
                type="text" 
                className='input' 
                placeholder='Contact No.' 
                name='contact'
                id='customerContact'
                onChange={handleChange}
                value={customerDetails.contact || ""}
                disabled={orderList.length === 0}
                required = {orderList.length > 0}
            />
        
        {/* Order and Payment Method */}

            <div className='method=container'>
                <select name='orderMethod' id='orderMethod' onChange={handleChange} value={customerDetails.orderMethod || ""} disabled={orderList.length === 0} required>
                    <option value="" hidden>Order Method</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Pickup">Pick-Up</option>
                </select>

                <select name='paymentMethod' id="paymentMethod" onChange={handleChange} value={customerDetails.paymentMethod || ""} disabled={orderList.length === 0} required>
                    <option value="" hidden>Payment Method</option>
                    <option value="Cash on Delivery">COD</option>
                    <option value="Gcash">GCash</option>
                    <option value="PayMaya">PayMaya</option>
                </select>
            </div>
        </div>
        <OrderList
            orderList = {orderList}
            setOrderList = {setOrderList}
            checkOut = {checkOut}
            cart = {cart}
        />
    </div>
  )
}