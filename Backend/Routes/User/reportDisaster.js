var express = require('express')
// const multer = require('multer')
// const upload = multer('Uploads/')
var router = express.Router()
var dbClient = require('../../DataBase/dbClient')
/*
router.get('/', (req, res) => {
  res.render('userLogi')  
  console.log('Hit user login')
})*/
router.get('/', (req, res) => {
  console.log('Hit get ReportDisaster')
  res.render('reportDisaster')
})

router.post('/', (req, res) => 
{
  console.log(req.body)
  console.log(req.file)
})

module.exports = router