const express = require('express');
const router = express.Router();
const dbClient = require('../../DataBase/dbClient');

const getQuery = `SELECT 
    u.UserName, 
    u.PhoneNo, 
    u.CurrentLocation,
    COALESCE(STRING_AGG(s.skill, ', '), 'No Skills') AS Skills  -- Ensure NULL values are handled
FROM DisasterVolunteer dv
JOIN Users u ON dv.Aadhar = u.Aadhar
LEFT JOIN UserSkills us ON u.Aadhar = us.Aadhar
LEFT JOIN Skills s ON us.skill = s.id
WHERE dv.DisasterID = $1  -- Replace with actual DisasterID
GROUP BY u.Aadhar, u.UserName, u.PhoneNo;
`;


const getJoinedVolunteers = async (req, res) => {
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

router.post('/', getJoinedVolunteers)
module.exports = router