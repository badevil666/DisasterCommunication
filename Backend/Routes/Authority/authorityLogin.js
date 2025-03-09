const express = require('express')
const router = express.Router()
const dbClient = require('../../DataBase/dbClient')
const path = require('path');

const authorityLogin = async (req, res) => {
    const {id, password} = req.body
    console.log(req.body)
    let result = await dbClient.query('select * from authorityCredentials where id = $1 and authoritypassword = $2', [id, password])
    console.log(result)

    if(result.rowCount)
    {
        console.log(result)
        res.json({redirect : '/authorityDashboard', authorityId : id})
    }
}

router.post('/', authorityLogin)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Public', 'authorityLogin.html'))
})
module.exports = router