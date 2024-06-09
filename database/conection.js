const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createConnection(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_DATABASE,
        port:process.env.DB_PORT

    }
)

pool.connect((error)=>{
    if(error){
        console.log('fatal conection:' + error)
        
    }else{
        console.log('db okidoki')
    }
})

module.exports = pool;