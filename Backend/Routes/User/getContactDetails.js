const express = require('express')
const dbClient = require('../../DataBase/dbClient')

const router = express.Router()

const getContactDetails = async (req, res) => 
{
    let response = {
        contacts : null
    }
    try
    {
        
        
        {
            let result = await dbClient.query('select * from contacts')
            response.contacts = result.rows;
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

router.post('/', getContactDetails)

module.exports = router