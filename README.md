# Happy Shawarma 
Happy Shawarma (National University-Manila Branch) is a popular food stall located just outside the gate of the university. The stall specializes
in serving up delicious and filling meals that are perfect for students on the go. The menu features a variety of Silog meals,
which are traditional Filipino breakfast dishes made up of garlic rice, fried egg, and a choice of meat (such as tocino, tapa, or
longganisa). They also offer a selection of mouth-watering Shawarma meals, which are made up of tender and flavorful meat,
fresh vegetables, and tangy sauces wrapped in warm pita bread.

### Objectives 
- To obtain the necessary information of customers needed in registering their orders,
- To identify the corresponding product details and prices of a customer’s selected order,
- To document the orders of each customer in the database,
- To integrate the needed SQL queries to utilize the database for tracking orders and performance, and
- To display graphs and tables that show the information on the business’s overall performance and income.


### Languages & Tools
- React JS
- Express JS
- MySQL Workbench
- Github

***The following is a list of the steps that need to be taken in order to make the application work on your local machine:***
## Cloning the repository:
1. In the repository link, click on ***"<> Code" > "Download ZIP"***
## Installing Node JS:
Node js is the main JavaScript runtime environment and library for running web applications outside the client's browser.

To install Node, follow these steps:
1. Go to this link: https://nodejs.org/en
2. Download the 18.16.0 LTS version which is the recommended one for most users
3. Follow the instructions in Node's installer (just keep on clicking "Next")
4. To verify if node is successfully installed, open the Windows Command Prompt and type ***node -v***. This should display the version number of Node js in your computer.
```
node -v
```
## Starting the Application
1. Open the downloaded ZIP file code in **Visual Studio Code**. 
2. Open the terminal by clicking on **"View" > "Terminal"** 

3.3 Type ***cd front-end*** in your terminal to move inside the front-end directory.
```
cd front-end
```
4.4 Type ***npm start.*** This will automatically open a React application in your default browser.
```
npm start
```

In case ***"npm start"*** did not work, the issue is most probably caused by a missing file in your node modules. To fix this issue, follow these steps:
1. Go to the ***"package.json"*** file in the front-end folder.
2. Check if ***"react-scripts"*** is present in package.json.
3. If it is present, type ***npm install*** in your terminal.
```
npm install
```
Otherwise type 
```
npm install react-scripts --save
```
in your terminal. 

4. Run the application again by typing ***npm start*** in your terminal.
```
npm start
```
## Installing MySQL Workbench:
Since our full-stack application is using MySQL to handle data sent by the client in the application, you'll need to install MySQL to insert the data from the client to the server.
1. After installing MySQL, create a schema called ***happy_shawarma***.
2. Expand the happy_shawarma schema. Right-click on ***"Tables"*** and select ***"Create Table".***
3. Create a table named ***orderdetails*** with the following columns:

    - **orderID** - INT - ✔PK ✔NN ✔AI	
    - **orderDate** - DATE - ✔NN	
    - **name** - VARCHAR(255) - ✔NN		
    - **address** - VARCHAR(255) - ✔NN	
    - **contact** - VARCHAR(100) - ✔NN
    - **orderMethod** - VARCHAR(50) - ✔NN	
    - **paymentMethod** - VARCHAR(50) - ✔NN	
    - **productID** - INT - ✔NN
    - **productName** - VARCHAR(500) - ✔NN
    - **quantity** - INT - ✔NN
    - **price** - INT - ✔NN
    
***Note: The column names in the code are case sensitive. Please type each column name as it is.***

4. Click **"Apply" > "Finish"** to create the table.
5. Since our server has a password, we need to match the password of our server to the password provided in our code. 
To match the password, type the SQL query: **ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'root123'**. Execute the query.
6. Restart MySQL workbench by closing it, then opening it again. When opening the localhost server, you will be asked to enter the password. 
Instead of entering the old password you made upon installation and setup, enter the password **root123**. This should successfully open the server.

Failure to change the server password will result to an authentication error
***(Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol).***
**Make sure to follow step 5 and 6.**

## Connecting the application to the back-end:
1. After creating the schema and table, go back to VS Code and add a new terminal for the backend. To add a new terminal, click on "+".
2. Type cd back-end to move inside the back-end directory. 
3. Type **npm start** to run our database. You must get the ***"Connected to backend! Connected to the database!"*** text displayed on the terminal. 
This means that the server is now running and that our application is now currently connected to our server and database.

## Restarting the front-end:
1. To restart the front-end part, go back to the terminal where you typed **cd front-end** and **npm start**.
2. Press **"Ctrl + C"** on your keyboard to restart the process. This will ask for a confirmation: **"Terminate batch job (Y?N)"**. Press **"Y"** on your keyboard.
3. Type **cd front-end** then **npm start** again to restart the application.

## Notes to Remember:
- Whenever you start the application, remember to run both front-end and back-end. 
Always use two terminals. One for the front-end by typing **cd front-end** to move inside the front-end directory, 
and one for the back-end by typing **cd back-end**. Type **npm start** on both terminals to run both front-end and back-end simultaneously. 

- Since the overall functionality of the application is done, the rest of the work will be focused on applying CSS styles in the Admin. 
The CSS file of the application is located inside the **front-end** folder, named **App.css**. If you wish to modify the style of the application, 
all code must go inside the **App.css** file. 

- If there are any bug reports or feature requests to improve the application, please create a ticket inside the Github repository. 
You can create a ticket by clicking on **"Issues" > "New issue"**. As of now, there is no template for this. I will create an issue 
template sometime this week.

- The completion of this project will partially satisfy the requirements for our course ***Advanced Database Systems***. 
Hence, in the event that you have any inquiries or considerations, please do not hesitate to send us a message.

**Thank you and have a great day ahead!**

## Project Developers
- **Carandang, Chloe Jadyn N.**  - carandangjn@students.national-u.edu.ph
- **Chaingan, Sharlene Mae F.**  - chaingansf@students.national-u.edu.ph
- **Bala, Justin T.**            - balajt@students.national-u.edu.ph
- **De Jesus, Jaster F.**        - dejesusjf@students.national-u.edu.ph
- **Gulmatico, Renz Kervy D.**      - gulmaticord@students.national-u.edu.ph
- **Sibunga, Jy James Luke V.**  - sibungajv@students.national-u.edu.ph
