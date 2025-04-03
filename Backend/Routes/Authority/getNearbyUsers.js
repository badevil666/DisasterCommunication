const express = require('express');
const router = express.Router();
const dbClient = require('../../DataBase/dbClient');

const getQuery = `SELECT 
    u.UserName, 
    u.PhoneNo,
    ( 6371 * acos(
        cos(radians(d.occurredLocation[1])) * cos(radians(u.CurrentLocation[1])) * 
        cos(radians(u.CurrentLocation[0]) - radians(d.occurredLocation[0])) + 
        sin(radians(d.occurredLocation[1])) * sin(radians(u.CurrentLocation[1]))
    )) AS approx_distance_km
FROM Users u
JOIN Disaster d ON d.ID = $1  -- Supply Disaster ID here
WHERE 
    ( 6371 * acos(
        cos(radians(d.occurredLocation[1])) * cos(radians(u.CurrentLocation[1])) * 
        cos(radians(u.CurrentLocation[0]) - radians(d.occurredLocation[0])) + 
        sin(radians(d.occurredLocation[1])) * sin(radians(u.CurrentLocation[1]))
    )) <= 10  -- 10 km radius
ORDER BY approx_distance_km;

`;


const getNearbyUsers = async (req, res) => {
    let response = {
        users : null
    }
    try
    {
         
        {
            let {disasterID} = req.body
            console.log(req.body)
            let result = await dbClient.query(getQuery, [disasterID])
            response.users = result.rows;
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

router.post('/', getNearbyUsers)
module.exports = router