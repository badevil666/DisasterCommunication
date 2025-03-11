const express = require('express')
const dbClient = require('../../DataBase/dbClient')
const router = express.Router()

function parseDisasterData(rawData) {
    return rawData.map(item => {
        // Extract the raw string from the "getnearbydisaster" key
        let rawString = item.getnearbydisaster ? item.getnearbydisaster : item.gettalukdisaster;
        
        // Use regex to correctly extract values from the string
        let match = rawString.match(/\((\d+),\s*"([^"]+)",\s*"\(([\d.\-]+),\s*([\d.\-]+)\)",\s*"([\d\-:\s]+)",\s*(\d+)\)/);
        
        if (match) {
            return {
                id: parseInt(match[1]),
                description: match[2],
                location: {
                    latitude: parseFloat(match[3]),
                    longitude: parseFloat(match[4])
                },
                timestamp: match[5],
                volunteerCount: parseInt(match[6])
            };
        }
        return null; // Return null if the data format is incorrect
    }).filter(item => item !== null); // Remove null values if any invalid data exists
}

const getDashboard = async (req, res) => 
{
    try
    {
       let response = {
        disastersInTaluk : null,
        disasterNearby : null,
        reportInTaluk : null,
        reportsNearby : null
       } 
        let talukReportQuery = 'SELECT R.* FROM Report R JOIN Users U ON U.districttalukid = R.taluk WHERE U.Aadhar = $1'
       let nearbyReportQuery = `SELECT 
       D.*,
       ( 
           6371 * acos(
               cos(radians(U.CurrentLocation[1])) * cos(radians(D.occurredLocation[1])) * 
               cos(radians(D.occurredLocation[0]) - radians(U.CurrentLocation[0])) + 
               sin(radians(U.CurrentLocation[1])) * sin(radians(D.occurredLocation[1]))
           )
       ) AS distance_km
   FROM Disaster D
   JOIN Users U ON U.Aadhar = $1
   WHERE 
       ( 
           6371 * acos(
               cos(radians(U.CurrentLocation[1])) * cos(radians(D.occurredLocation[1])) * 
               cos(radians(D.occurredLocation[0]) - radians(U.CurrentLocation[0])) + 
               sin(radians(U.CurrentLocation[1])) * sin(radians(D.occurredLocation[1]))
           )
       ) <= 5
   ORDER BY distance_km` 
        const {aadhar} = req.body
       console.log(req.body)
       let nearByDisasters = await dbClient.query('select getnearbydisaster($1)', [aadhar])
       console.log(nearByDisasters.rows)
       response.disasterNearby = parseDisasterData(nearByDisasters.rows)
       let talukDisaster = await dbClient.query('select gettalukdisaster($1)', [aadhar])
       console.log(talukDisaster.rows)
       console.log(response)
       response.disastersInTaluk = parseDisasterData(talukDisaster.rows)
       let talukReport = await dbClient.query(talukReportQuery, [aadhar])

       response.reportInTaluk = talukReport.rows
       
       let nearbyReport = await dbClient.query(nearbyReportQuery, [aadhar])
       response.reportsNearby = nearbyReport.rows
       console.log(response.disasterNearby)
       console.log(response)

       res.json(response)
    } 
    catch (error) 
    {
        
    }
}

router.post('/', getDashboard)

module.exports = router