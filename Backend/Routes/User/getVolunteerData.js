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
  if(aadhar)
  {
    let volunteerData = (await dbClient.query('select d.id, d.title, d.disastertimestamp from disaster as d join disastervolunteer as dv on d.id = dv.disasterid where dv.aadhar = $1', [aadhar]))
    response.data = volunteerData.rows
    console.log(response)
    res.json(response)
  }
}

router.post('/', getVolunteer)
module.exports = router