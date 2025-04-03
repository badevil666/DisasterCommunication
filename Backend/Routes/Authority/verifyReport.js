const express = require('express')
const router = express.Router()
const dbClient = require('../../DataBase/dbClient')
const {sendMulticastNotification} = require('../../Config/firebase/firebaseNotifications')

const getQuery = `
            SELECT u.firebaseToken,
                   sqrt(power((u.CurrentLocation[0] - $1), 2) + power((u.CurrentLocation[1] - $2), 2)) AS approx_distance
            FROM Users u
            WHERE u.districttalukid = $3  -- Ensure users are in the same Taluk
            OR sqrt(power((u.CurrentLocation[0] - $1), 2) + power((u.CurrentLocation[1] - $2), 2)) <= $4  -- Adjust threshold
            ORDER BY approx_distance;
        `;

const verifyReport = async (req, res) =>
{
    const {id, title, description, occurredLocation, disasterTimeStamp, volunteerCount, taluk, skills} = req.body;
    console.log(req.body)
    

    await dbClient.query('insert into disaster(title, disasterDescription, occurredlocation, disasterTimeStamp, maxPersonnel, reportID) values($1, $2, POINT($3, $4), $5, $6, $7)', [title, description, occurredLocation.x, occurredLocation.y, disasterTimeStamp, volunteerCount, id])
    
    let tokens = await dbClient.query(getQuery, [occurredLocation.x, occurredLocation.y, taluk, 0.05]);
    
    if(tokens.rowCount)
    {
      console.log(tokens.rows);
      sendMulticastNotification(tokens.rows.map(row => row.firebasetoken), title, description)
    }
    res.json({success : true})
}

router.post('/', verifyReport)

module.exports = router