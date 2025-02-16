const express = require('express')
const router = express.Router();
const dbClient = require('../../DataBase/dbClient')

router.get('/', (req, res) => {
    console.log('Hit viewDisaster Endpoint')
    const limitDate = req.body
    dbClient.connect().then(
        console.log('Database connection Successfull')
    ).catch((err) => 
    {
        console.log(err)
    })
    dbClient.query('SELECT * FROM disaster where disastertimestamp >= $1', [limitDate], (err, res) => {
        if(err)
        {
            console.error("Errot occured while exectiong query")
        }
        else
        {
            console.log("Executed the query successfully")
            result = res.rows
        }
    })
    res.send(result)
})