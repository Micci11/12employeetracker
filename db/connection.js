import mysql from 'mysql2';

// Configuration for database
const dbConfig = {
    host: 'localhost',
    user: 'root', 
    password: 'Chiante1!', 
    database: 'employeeTracker_db' 
};

const connection = mysql.createConnection(dbConfig);

export default connection;
