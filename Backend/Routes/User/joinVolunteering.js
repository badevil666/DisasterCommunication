const express = require('express')
const router = express.Router()
const dbClient = require('../../DataBase/dbClient')

const joinVolunteering = (req, res) =>
{
  let response = { success : false }
  console.log(req.body)
  const {aadhar, disasterID} = req.body
  dbClient.query('insert into disastervolunteer VALUES($1, $2)', [aadhar, disasterID])
  response.success = true
  res.json(response)
}

router.post('/', joinVolunteering)

module.exports = router
