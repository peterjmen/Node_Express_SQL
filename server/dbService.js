const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error(err.message);
    } 
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance(){
            return instance ? instance : new DbService();
    }
  
        async getAllData(){
        try {
            const response = await new Promise((resolve, reject) => { 
                const query = "SELECT * FROM names";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response); // Comment/un this line to log the response data in console on refresh
            return response;  // Add this line to return the response
        } catch (error){
            console.log(error);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date(); 
            // stored in year, month, day
            const insertId = await new Promise((resolve, reject) => { 
                const query = "INSERT INTO names (name, date_added) VALUES (?, ?)";
    
                connection.query(query, [name, dateAdded], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(results.insertId);
                    }
                });
            });
            console.log(insertId); // Comment/un this line to log the response data in console on refresh
            return insertId;  // Add this line to return the response
        } catch (error){
            console.log(error);
        }
    }
}

module.exports = DbService;insertId