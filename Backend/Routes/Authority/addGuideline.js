const express = require('express');
const router = express.Router();
const dbClient = require('../../DataBase/dbClient');


function getFormattedTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
const addGuideline = async (req, res) =>
{
    const {disasterID, guideline} = req.body
    console.log(req.body)
    await dbClient.query('insert into disasterguidelines(disasterID, guideline, issuedtime) values($1, $2, $3)',[disasterID, guideline, getFormattedTimestamp()])
    res.json({success : true});
}

router.post('/', addGuideline)
module.exports = router