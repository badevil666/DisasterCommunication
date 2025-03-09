const express = require('express')
const dbClient = require('../../DataBase/dbClient')
const router = express.Router()

const getDashboard = async (req, res) => 
{
    try
    {
       let response = {
        disastersInTaluk : null,
        disasterNearby : null,
        reports : null
       } 
       const {aadhar} = req.body
       console.log(req.body)
       let nearByDisasters = await dbClient.query('select getnearbydisaster($1)', [aadhar])
       let disastersInTaluk = await dbClient.query('select getnearbydisaster($1)', [aadhar])
       response.disastersInTaluk = disastersInTaluk.rows
       response.disasterNearby = nearByDisasters.rows;
       console.log(disastersInTaluk)
       console.log('hiii')

       res.json(response)
    } 
    catch (error) 
    {
        
    }
}

router.post('/', getDashboard)

module.exports = router