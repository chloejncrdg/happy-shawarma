import React from 'react'



export default function Checkout({ orderList, setOrderList, setShowOrder }) {

    const customer = orderList[0]
    const totalPrice = orderList.reduce((total, item) => 
    total + item.price, 0);

    function resetOrder() {
        setShowOrder(prevState => !prevState)
        setOrderList([])
    }
    

  return (
    <div className='modal-bg'>
        <div className='orders-container'>
        <p className='checkout-text'>We've received your order!</p>
                <div className='customer-details-checkout'>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Address:</strong> {customer.address}</p>
                    <p><strong>Contact:</strong> {customer.contact}</p>
                    <p><strong>Order Method:</strong> {customer.orderMethod}</p>
                    <p><strong>Mode of Payment:</strong> {customer.paymentMethod}</p>
                </div>
                <hr></hr>
                <div className='checkout-orders'>
                   <div className='checkout-label'>
                        <p><strong>Order</strong></p>
                        <p><strong>Price</strong></p>
                   </div>
                    {orderList.map((item) => (
                        <div className='checkout-order' key={item.tempID}>
                            <p>{item.quantity} {item.productName}</p>
                            <p>{item.price}</p>
                        </div>
                    ))}
                     <div className='checkout-total'>
                        <p>Total:</p>
                        <p>{totalPrice}</p>
                    </div>
                </div>
                <hr></hr>
                <button onClick={resetOrder}>CLOSE</button>
        </div>
        
    </div>
  )
}