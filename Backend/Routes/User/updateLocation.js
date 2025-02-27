const express = require('express')
const dbClient = require('../../DataBase/dbClient')

const Router = express.Router()

const updateLocation = async (req, res) =>
{
  let response =
  {
    success: false
  }
  console.log(req.body)
  try
  {
      const {locationX, locationY, aadhar} = req.body;
      if(locationX && locationY && aadhar)
      {
          console.log(locationX , locationY, aadhar);
          await dbClient.query('update users set currentLocation = POINT($1, $2) where aadhar = $3 ',[locationX, locationY, aadhar]);
      }
      else
      {
          return res.json(response)
      }
      response.success = true
      return res.json(response)
  }
  catch(err)
  {
    console.log(err)
  }
}

Router.post('/', updateLocation)

module.exports = Router
