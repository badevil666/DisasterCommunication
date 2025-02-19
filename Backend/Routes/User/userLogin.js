const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const hashPassord = require('../../Middleware/hashPassword')
const dbClient = require('../../DataBase/dbClient')
const saltRounds = 10;

let response = {
  aadharPresent : false,
  passwordPresent : false,
  invalidCredentials : false
};

router.get('/', (req, res) => {
  res.render('userLogin')  
  console.log('Hit user login')
})

const userLogin = async(req, res) => 
{
  try 
  {
    const {aadhar, password} = req.body
    console.log(aadhar, password)
    if(!aadhar || !password)
    {
      return res.json(response);
    }
    response.aadharPresent = true;
    response.passwordPresent = true;
    console.log(req.body);
    
    let result = await dbClient.query('select * from credentials where aadhar = $1', [aadhar]);
    
    if(result.rowCount)
    {
      console.log(result.rows[0].hashedpassword)
    }
    else
    {
      return res.send("Invalid credentials.")
    }
    const isPasswordCorrect = await bcrypt.compare(password, result.rows[0].hashedpassword);
    if(isPasswordCorrect)
    {
      result = await dbClient.query('select email from users where aadhar = $1', [aadhar]);
      let user = result.rows[0];
      console.log("login success");
      const token = jwt.sign({ aadhar: aadhar, eMail : user.email}, JWT_SECRET, {expiresIn : '1h'});
      console.log(token);
      return res.json({authorizationToken : token})
    }
    else
    {
      console.log("Invalid credentials.")
      response.invalidCredentials = true;
      return res.json(response)
    }
  }
  catch(error)
  {
    console.log(error);
  }
}

router.post('/', userLogin)

const generateToken = () =>
{

}

module.exports = router
