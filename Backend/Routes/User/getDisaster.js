const express = require('express')
const router = express.Router()
const dbClient = require('../../DataBase/dbClient')

const getDisaster = async (req, res) => {
  let response = {data : null}
  console.log(req.body)
  const { disasterID, aadhar } = req.body
  response.data = (await dbClient.query('select d.*, CASE WHEN dv.aadhar is not null then true else false end as volunteered from disaster as d left join disastervolunteer as dv on d.id = dv.disasterid and dv.aadhar = $2 where d.id = $1 ', [disasterID, aadhar])).rows
  res.json(response)
}

router.post('/', getDisaster)

module.exports = router
