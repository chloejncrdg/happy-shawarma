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


  // for linechart
  const [groupIncome, setGroupIncome] = useState([])
  const [sumPriceArray, setSumPriceArray] = useState([])
  const [orderDateArray, setOrderDateArray] = useState([])
  

  // for barchart
  const [groupCount, setGroupCount] = useState([])
  const [countArray, setCountArray] = useState([])
  const [countDateArray, setCountDateArray] = useState([])

  useEffect(() => {
    handleDailyIncome()
    handleWeeklyIncome()
    handleCountOrders()
    handleAvgDailyIncome()
    handleAvgOrderCount()
    handleGroupIncome()
    handleGroupCount()
    handleBestSelling()
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
  }, [groupIncome, groupCount]);

  
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
      const avgResult = response.data[0]['AVG(price)'];
      setAvgDailyIncome(avgResult)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAvgOrderCount() {
    try {
      const response = await axios.get("http://localhost:8800/avgCountOrders")
      const avgOrderCount = response.data[0]['AVG(quantity)'];
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


  return (
    <div>

      <div>

      {/* Divs for navbar here */}

      </div>

      <main>

        <div>

        {/* Divs for cover here */}

        </div>

        <div>
          <div className='dailyIncome'>
            <h1>Total Income for today:</h1>
            <h1>{dailyIncome}</h1>
          </div>
          <div className='weeklyIncome'>
            <h1>Weekly Income:</h1>
            <h1>{weeklyIncome}</h1>
          </div>
          <div className='orderCount'>
            <h1>Daily order count:</h1>
            <h1>{orderCount}</h1>
          </div>
          <div className='avgDailyIncome'>
            <h1>Average Daily Income:</h1>
            <h1>{avgDailyIncome}</h1>
          </div>
          <div className='avgCountOrder'>
            <h1>Average Orders for the Week: </h1>
            <h1>{avgOrderCount}</h1>
          </div>
          <div className='bestSelling'>
            <h1>Best Selling Product: </h1>
            <h1>{bestSelling}</h1>
          </div>

          <div className='lineChart'>
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

          <div className='barChart'>
            <CChart
            type="bar"
            data={{
              labels: countDateArray,
              datasets: [
                {
                  label: 'Order Count',
                  backgroundColor: ' #FF8C00',
                  data: countArray,
                },
              ],
            }}
            labels="months"
          />
          </div>

          <div className='pieChart'>
          <CChart
            type="doughnut"
            data={{
              labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
              datasets: 
              [
                {
                  backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                  data: [40, 20, 80, 10],
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

