import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root123",
    database:"happy_shawarma"
})

app.use(express.json())
app.use(cors())

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database!");
});

app.get("/", (req, res) => {
    res.json("Hello, this is the backend!")
})

  
app.post("/orders", (req, res) => {
    const q = "INSERT INTO orderdetails (orderDate, name, address, contact, orderMethod, paymentMethod, productID, productName, quantity, price) VALUES ?"
    const bulkValues = req.body.map((values) => [
        values.orderDate,
        values.name,
        values.address,
        values.contact,
        values.orderMethod,
        values.paymentMethod, 
        values.productID,
        values.productName, 
        values.quantity, 
        values.price
      ]);

      db.query(q, [bulkValues], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
      })
    
})

app.get("/dailyincome", (req, res) => {
    const q = "SELECT SUM(price) FROM orderdetails WHERE orderDate = CURRENT_DATE()"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

app.get("/weeklyincome", (req, res) => {
    const q = "SELECT SUM(price) FROM orderdetails WHERE orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY);"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

app.get("/dailycount", (req, res) => {
    const q = "SELECT SUM(quantity) FROM orderdetails WHERE orderDate = CURRENT_DATE();"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

app.get("/avgDailyIncome", (req, res) => {
    const q = "SELECT AVG(price) FROM orderdetails WHERE orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY);"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

app.get("/avgCountOrders", (req, res) => {
    const q = "SELECT AVG(quantity) FROM orderdetails WHERE orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY);"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

app.get("/groupIncome", (req, res) => {
    const q = "SELECT orderDate, SUM(price) FROM orderdetails WHERE orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) GROUP BY orderDate ORDER BY orderDate ASC;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

app.get("/groupCount", (req, res) => {
    const q = "SELECT orderDate, SUM(quantity) FROM orderdetails WHERE orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) GROUP BY orderDate ORDER BY orderDate ASC;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

app.get("/bestSelling", (req, res) => {
    const q = "SELECT productName FROM orderdetails WHERE quantity = (SELECT MAX(quantity) FROM orderdetails);"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})


app.listen(8800, ()=> {
    console.log("Connected to backend!")
})