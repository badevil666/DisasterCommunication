const router = (require('express')).Router
const dbClient = require('../../DataBase/dbClient')

const getDisaster = (req, res) => {
  let response = {data : null}
  console.log(req.body)
  const { disasterID } = req.body
  response.data = (dbClient.query('select * from disaster where id = $1', [disasterID])).rows
  res.json(response)
}

router.post('/', getDisaster)

module.exports = router
