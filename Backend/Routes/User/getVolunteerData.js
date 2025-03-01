var express = require('express')
var router = express.Router()
var dbClient = require('../../DataBase/dbClient')


const getVolunteer = async(req, res) =>
{
  let response = {
    data : null
  }

  console.log(req.body)
  const {aadhar} = req.body
  let volunteerData = (await dbClient.query('select d.id, d.title, d.disastertimestamp from disaster as d join disastervolunteer ad dv on d.aadhar = dv.aadhar', [aadhar]))
  response.data = volunteerData.rows
  res.json(response)
}
