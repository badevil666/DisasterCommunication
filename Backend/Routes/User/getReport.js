const express = require('express')
const dbClient = require('../../DataBase/dbClient')

const router = express.Router()

const getReport = async (req, res) => 
{
    let response = {
        data : null
    }
    try
    {
        console.log(req.body)
        const {reportID} = req.body
        console.log(req.body)
        if(reportID)
        {
            let result = await dbClient.query('select * from report where id = $1', [reportID])
            response.data = result.rows;
            console.log(response)
            res.json(response)
        }
    }
    catch (err)
    {
        console.log('Error in getguidelines')
        console.log(err)
    }
}

router.post('/', getReport)

module.exports = router