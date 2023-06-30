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

//Query for ADMIN LOGIN
app.post("/admin", (req, res) => {
    const { username, password } = req.body;
    // Check the username and password against the database
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Error executing the query:", err);
            return res.json({ success: false });
        }
        if (results.length > 0) {
            // Credentials match a user in the database
            res.json({ success: true });
        } else {
            // Credentials do not match any user in the database
            res.json({ success: false });
        }
    });
});

//Query for INSERTING ORDERS
app.post("/orders", (req, res) => {
    const q = 
    `INSERT INTO 
        orderdetails 
            (orderDate, 
            name, 
            address,
            contact,
            orderMethod,
            paymentMethod,
            productID,
            productName,
            quantity,
            price)
        VALUES ?`
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

//Query for INCOME FOR THE DAY
app.get("/dailyincome", (req, res) => {
    const q = 
    `SELECT 
        SUM(price) 
    FROM 
        orderdetails 
    WHERE 
        orderDate = CURRENT_DATE()`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for INCOME FOR THE WEEK
app.get("/weeklyincome", (req, res) => {
    const q = 
    `SELECT 
        SUM(price) 
    FROM 
        orderdetails 
    WHERE 
        orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY);`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for COUNTING ORDER FOR THE DAY
app.get("/dailycount", (req, res) => {
    const q = 
    `SELECT 
        SUM(quantity) 
    FROM 
        orderdetails 
    WHERE 
        orderDate = CURRENT_DATE();`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for AVERAGE WEEK INCOME
app.get("/avgWeeklyIncome", (req, res) => {
    const q = 
    `SELECT 
        AVG(daily_price) 
    FROM 
        (SELECT 
            DATE(orderDate) AS order_date, 
            SUM(price) AS daily_price 
        FROM 
            orderdetails 
        WHERE 
            orderDate >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP 
            BY order_date)
    AS 
        daily_price_subquery;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for AVERAGE NO. OF ORDERS FOR THE WEEK
app.get("/avgCountOrders", (req, res) => {
    const q = 
    `SELECT 
        AVG(daily_order_count) 
    FROM 
        (SELECT 
            DATE(orderDate) 
        AS 
            order_date, 
            SUM(quantity) AS daily_order_count 
        FROM 
            orderdetails
        WHERE
            orderDate >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY
            order_date) 
    AS
        daily_orders_subquery;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for LINE GRAPH - WEEK INCOME
app.get("/groupIncome", (req, res) => {
    const q = 
    `SELECT 
        orderDate,
        SUM(price)
    FROM 
        orderdetails 
    WHERE 
        orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY)
    GROUP BY 
        orderDate 
    ORDER BY
        orderDate ASC;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for BAR GRAPH - ORDER COUNTS
app.get("/groupCount", (req, res) => {
    const q = 
    `SELECT 
        orderDate, 
        SUM(quantity)
    FROM
        orderdetails 
    WHERE
        orderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY)
    GROUP BY
        orderDate 
    ORDER BY
        orderDate ASC;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for BEST SELLING PRODUCT
app.get("/bestSelling", (req, res) => {
    const q = 
    `SELECT 
        productName
    FROM
        orderdetails
    GROUP BY
        productName
    ORDER BY
        COUNT(productID) DESC 
    LIMIT 1;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for DISPLAYING ORDERS
app.get("/displayOrders", (req, res) => {
    const q = 
    `SELECT 
        name,
        address,
        contact,
        orderMethod,
        paymentMethod,
        orders 
    FROM 
        (SELECT 
            name,
            address,
            contact,
            orderMethod,
            paymentMethod,
        GROUP_CONCAT(CONCAT(quantity, ' x ', productName) SEPARATOR ', ') AS orders,
        MAX(orderID) AS maxOrderID
        FROM 
            orderdetails
        WHERE
            DATE(orderDate) = CURDATE()
        GROUP BY
            name,
            address,
            contact,
            orderMethod,
            paymentMethod)
        AS subquery
    ORDER BY
        maxOrderID;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.send(data)
    })
})

//Query for PIE CHART - 5 BEST SELLING PRODUCTS
app.get("/groupBestSelling", (req, res) => {
    const q = `
    SELECT
        productName,
        COUNT(productID) AS totalOrders
    FROM
        orderdetails
    GROUP BY
        productName
    ORDER BY
        totalOrders DESC
    LIMIT 5;`
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.send(data);
    });
});


app.listen(8800, ()=> {
    console.log("Connected to backend!")
})