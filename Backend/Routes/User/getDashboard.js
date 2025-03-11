const express = require('express')
const dbClient = require('../../DataBase/dbClient')
const router = express.Router()
const getUserReportsQuery = `
    SELECT R.*
    FROM Report R
    JOIN Users U ON U.Aadhar = $1
    WHERE R.taluk = U.districttalukid;
`;

const getNearbyReportsQuery = `
    SELECT 
        R.*
    FROM Report R
    JOIN Users U ON U.Aadhar = $1
    WHERE 
        (6371 * acos(
            cos(radians(U.CurrentLocation[1])) * cos(radians(R.ReportLocation[1])) *
            cos(radians(R.ReportLocation[0]) - radians(U.CurrentLocation[0])) +
            sin(radians(U.CurrentLocation[1])) * sin(radians(R.ReportLocation[1]))
        )) <= 5;
`;
const getNearbyDisastersQuery = `
    SELECT 
        D.ID, 
        D.DisasterDescription, 
        D.OccurredLocation, 
        D.DisasterTimeStamp, 
        D.MaxPersonnel,
        (6371 * acos(
            cos(radians(U.CurrentLocation[1])) * cos(radians(D.OccurredLocation[1])) *
            cos(radians(D.OccurredLocation[0]) - radians(U.CurrentLocation[0])) +
            sin(radians(U.CurrentLocation[1])) * sin(radians(D.OccurredLocation[1]))
        )) AS distance_km
    FROM Disaster D
    JOIN Users U ON U.Aadhar = $1
    WHERE 
        (6371 * acos(
            cos(radians(U.CurrentLocation[1])) * cos(radians(D.OccurredLocation[1])) *
            cos(radians(D.OccurredLocation[0]) - radians(U.CurrentLocation[0])) +
            sin(radians(U.CurrentLocation[1])) * sin(radians(D.OccurredLocation[1]))
        )) <= 5  
    ORDER BY distance_km;
`;

const getTalukDisastersQuery = `
    SELECT 
        D.ID, 
        D.DisasterDescription, 
        D.OccurredLocation, 
        D.DisasterTimeStamp, 
        D.MaxPersonnel
    FROM Disaster D
    JOIN Report R ON R.ID = D.ReportID
    JOIN Users U ON U.Aadhar = $1
    WHERE R.taluk = U.districttalukid;
`;




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
        const {aadhar} = req.body
       console.log(req.body)
       
       let nearByDisasters = await dbClient.query(getNearbyDisastersQuery, [aadhar])
       console.log(nearByDisasters.rows)
       response.disasterNearby = nearByDisasters.rows
      
       let talukDisaster = await dbClient.query(getTalukDisastersQuery, [aadhar])
       console.log(talukDisaster.rows)
       response.disastersInTaluk = talukDisaster.rows
      
       let talukReport = await dbClient.query(getUserLocationQuery, [aadhar])
       response.reportInTaluk = talukReport.rows

       let nearbyReport = await dbClient.query(getUserReportsQuery, [aadhar])
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