const express = require('express')
const router = express.Router()
const dbClient = require('../../DataBase/dbClient')

const verifyReport = async (req, res) =>
{
    const {id, title, description, occuredLocation, disasterTimeStamp, volunteerCount} = req.body;
    console.log(req.body)
}

router.post('/', verifyReport)

module.exports = router