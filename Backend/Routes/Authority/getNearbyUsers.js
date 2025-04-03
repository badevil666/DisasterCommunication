const express = require('express');
const router = express.Router();
const dbClient = require('../../DataBase/dbClient');

const getQuery = `SELECT 
    u.UserName, 
    u.PhoneNo,
    sqrt(power((u.CurrentLocation[0] - d.occurredLocation[0]), 2) + 
         power((u.CurrentLocation[1] - d.occurredLocation[1]), 2)) AS approx_distance
FROM Users u
JOIN Disaster d ON d.ID = $1  -- Supply Disaster ID here
WHERE 
    sqrt(power((u.CurrentLocation[0] - d.occurredLocation[0]), 2) + 
         power((u.CurrentLocation[1] - d.occurredLocation[1]), 2)) <= 10  -- Fixed radius of 10 km
ORDER BY approx_distance;
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