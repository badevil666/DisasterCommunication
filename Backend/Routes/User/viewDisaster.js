const express = require('express')
const router = express.Router();
const dbClient = require('../../DataBase/dbClient')

const viewDisaster = async (req, res) =>
{
  let response = {
    disasterData : null
  }
  const {disasterID} = req.body
  console.log('Hit viewDisaster Endpoint')
  const disaster = dbClient.query('SELECT * FROM disaster where id = $1', [disasterID])
  response.disasterData = disaster;
  res.json(response)
}
router.get('/', viewDisaster)

module.exports = router
