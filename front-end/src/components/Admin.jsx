import React from 'react'
import { useState, useEffect } from "react";
import { CChart } from '@coreui/react-chartjs'

import logo from "../images/logo.png"
import bg from "../video/video.mp4"

import axios from "axios";

export default function Admin() {

  const [dailyIncome, setDailyIncome] = useState(0)
  const [weeklyIncome, setWeeklyIncome] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [avgDailyIncome, setAvgDailyIncome] = useState(0)
  const [avgOrderCount, setAvgOrderCount] = useState(0)
  const [bestSelling, setBestSelling] = useState("")

  // for daily orders 
  const [dailyOrders, setDailyOrders] = useState([])


  // for linechart
  const [groupIncome, setGroupIncome] = useState([])
  const [sumPriceArray, setSumPriceArray] = useState([])
  const [orderDateArray, setOrderDateArray] = useState([])
  

  // for barchart
  const [groupCount, setGroupCount] = useState([])
  const [countArray, setCountArray] = useState([])
  const [countDateArray, setCountDateArray] = useState([])

  //for piechart
  const [groupBestSelling, setGroupBestSelling] = useState([]);
  const [sellingProductsArray, setSellingProductsArray] = useState([]);
  const [sellingCountArray, setSellingCountArray] = useState([]);

  useEffect(() => {
    handleDailyIncome()
    handleWeeklyIncome()
    handleCountOrders()
    handleAvgDailyIncome()
    handleAvgOrderCount()
    handleGroupIncome()
    handleGroupCount()
    handleBestSelling()
    displayOrderList()
    handleGroupBestSelling()
  }, [])

  useEffect(() => {
    setSumPriceArray(groupIncome.map(obj => obj['SUM(price)']));
    setOrderDateArray(    //Code to ensure that the date posted as labels for the line graph is PH date which is exactly the same as that of the database.
      groupIncome.map(obj => {
        const currentDate = new Date(obj.orderDate);
        currentDate.setUTCHours(currentDate.getUTCHours() + 8);
        return currentDate.toISOString().slice(0, 10).replace('T', ' ');
      })
    );

    setCountArray(groupCount.map(obj => obj['SUM(quantity)']))
    setCountDateArray(    //Code to ensure that the date posted as labels for the bar graph is PH date which is exactly the same as that of the database.
      groupIncome.map(obj => {
        const currentDate = new Date(obj.orderDate);
        currentDate.setUTCHours(currentDate.getUTCHours() + 8);
        return currentDate.toISOString().slice(0, 10).replace('T', ' ');
      })
    );

    setSellingProductsArray(groupBestSelling.map((obj) => obj.productName));
    setSellingCountArray(groupBestSelling.map((obj) => obj.totalOrders));
  }, [groupIncome, groupCount, groupBestSelling]);

  
  async function handleDailyIncome() {
    try {
      const response = await axios.get("http://localhost:8800/dailyincome");
      const dIncomeSum = response.data[0]['SUM(price)'];
      setDailyIncome(dIncomeSum);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWeeklyIncome() {
    try {
      const response = await axios.get("http://localhost:8800/weeklyincome");
      const wIncomeSum = response.data[0]['SUM(price)'];
      setWeeklyIncome(wIncomeSum);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCountOrders() {
    try {
      const response = await axios.get("http://localhost:8800/dailycount")
      const dailyCount = response.data[0]['SUM(quantity)'];
      setOrderCount(dailyCount)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAvgDailyIncome() {
    try {
      const response = await axios.get("http://localhost:8800/avgDailyIncome")
      const avgResult = response.data[0]['AVG(daily_price)'];
      setAvgDailyIncome(avgResult)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAvgOrderCount() {
    try {
      const response = await axios.get("http://localhost:8800/avgCountOrders")
      const avgOrderCount = response.data[0]['AVG(daily_order_count)'];
      setAvgOrderCount(avgOrderCount)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGroupIncome() {
    try {
      const response = await axios.get("http://localhost:8800/groupIncome")
      const weekGroupIncome = response.data;
      setGroupIncome(weekGroupIncome)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGroupCount() {
    try {
      const response = await axios.get("http://localhost:8800/groupCount")
      const weekGroupCount = response.data;
      setGroupCount(weekGroupCount)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBestSelling() {
    try {
      const response = await axios.get("http://localhost:8800/bestSelling")
      const bestSelling = response.data[0]['productName'];
      setBestSelling(bestSelling)
    } catch (error) {
      console.log(error);
    }
  }

  // to handle daily orders
  async function displayOrderList() {
    try {
      const response = await axios.get("http://localhost:8800/displayOrders")
      setDailyOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleGroupBestSelling() {
    try {
      const response = await axios.get("http://localhost:8800/groupBestSelling");
      const bestSellingData = response.data;
      setGroupBestSelling(bestSellingData);
    } catch (error) {
      console.log(error);
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
                    <a className="nav-link" href="/menu" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">
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
        <video className="admin-video" src={bg} autoPlay loop muted></video>
          <div className='admin-home-text'>
            <h1>Hello, Admin!</h1>
            {/* <p>Check your daily and weekly report here!</p> */}
          </div>
        </div>
        
       
        <div className='admin-details-bg'>
          <div className='admin-stuff'>
            <br/>
              <div className='admin-grid'>
                <div className='admin-report'>
                  <h1 className='report-title'>Total Income for today:</h1>
                  <h1>₱ {dailyIncome}</h1>
                </div>
                <div className='admin-report'>
                  <h1 className='report-title'>Weekly Income:</h1>
                  <h1>₱ {weeklyIncome}</h1>
                </div>
                <div className='admin-report'>
                  <h1 className='report-title'>Daily order count:</h1>
                  <h1>{orderCount}</h1>
                </div>
                <div className='admin-report'>
                  <h1 className='report-title'>Average Weekly Income:</h1>
                  <h1>₱ {avgDailyIncome}</h1>
                </div>
                <div className='admin-report'>
                  <h1 className='report-title'>Average Orders for the Week: </h1>
                  <h1>{avgOrderCount}</h1>
                </div>
                <div className='admin-report'>
                  <h1 className='report-title'>Best Selling Product: </h1>
                  <h1>{bestSelling}</h1>
                </div>
            </div>
          </div>
        </div>

        <div className='admin-orderList'>
          <h1>TODAY'S ORDERS</h1>
          <table className='admin-orders-table'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Order Method</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
            {dailyOrders.map(order => (
            <tr className='admin-order' key={order.name}>
                  <td className='check-td'><input type='checkbox'/></td>
                  <td className='name-td'>{order.name}</td>
                  <td className='address-td'>{order.address}</td>
                  <td className='contact-td'>{order.contact}</td>
                  <td className='method-td'>{order.orderMethod}</td>
                  <td className='order-td'>{order.orders}</td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>

        <div className='grid-charts'>
          <div className='chart'>
            <h1>7 DAYS INCOME</h1>
                <CChart
                type="line" 
                data={{
                  labels: orderDateArray,
                  datasets: [
                    {
                      label: "Daily Income",
                      backgroundColor: "#FFA836",
                      borderColor: "#FFA836",
                      pointBackgroundColor: "#FFA836",
                      pointBorderColor: "#fff",
                      data: sumPriceArray,
                    }
                  ]
                }}
                options ={{
                  tooltips: false
                }}
              />
            </div>

            <div className='chart'>
              <h1>7 DAYS ORDER COUNT</h1>
              <CChart
              type="bar"
              data={{
                labels: countDateArray,
                datasets: [
                  {
                    label: 'Order Count',
                    backgroundColor: ['#E55E25', '#FFB374', '#A92A00', '#4E0000', '#DB9D84'],
                    data: countArray,
                  },
                ],
              }}
              labels="months"
            />
            </div>

            <div className='chart'>
              <h1>5 BEST-SELLING PRODUCTS</h1>
              <CChart
                className="pieChart"
                type="doughnut"
                data={{
                  labels: sellingProductsArray,
                  datasets: 
                  [
                    {
                      backgroundColor: ['#E55E25', '#FFB374', '#A92A00', '#4E0000', '#DB9D84'],
                      data: sellingCountArray,
                    },
                  ],
                }}
              />
          </div>
        </div>
      </main>
    </div>
  )
}

