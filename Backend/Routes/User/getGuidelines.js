const express = require('express')
const dbClient = require('../../DataBase/dbClient')

const router = express.Router()

const getGuidelines = async (req, res) => 
{
    let response = {
        guidelines : null
    }
    try
    {
        console.log(req.body)
        const {disasterID} = req.body
        console.log(req.body)
        if(disasterID)
        {
            let result = await dbClient.query('select issuedtime, guideline from guidelines where disasterid = $1', [disasterID])
            response.guidelines = result.rows;
            res.json(response)
        }
    }
    catch (err)
    {

    }
}
