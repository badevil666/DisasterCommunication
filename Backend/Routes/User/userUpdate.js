var express = require('express')
var hashPassord = require('../../Middleware/hashPassword')
var router = express.Router()
var dbClient = require('../../DataBase/dbClient')
//var passwordHasher = hashPassord.passwordHasher



const userUpdate = async (req, res) =>
{
    let response = {
        success : false
    }
    console.log(req.body)
    const {aadhar, userName, dob, gender, eMail, phoneNo, currentLocationX, currentLocationY, districtTaluk, skills, password} = req.body;
    if((aadhar && userName && dob && gender, eMail && currentLocationX && currentLocationY && districtTaluk))
    {
        try
        {
            await dbClient.query('update users set username = $2, dob = $3, gender = $4, email = $5, phoneno = $6, currentLocation = POINT($7, $8), districttalukid = $9 where aadhar = $1 ', [aadhar, userName, dob, gender, eMail, phoneNo, currentLocationX, currentLocationY, districtTaluk]);

            await dbClient.query('delete from userSkills where aadhar = $1', [aadhar])
            
            for(let skill of skills)
            {
                await dbClient.query('insert into userskills values($1, $2)', [aadhar, skill]);
            }
            if(password)
            {
              const hashedPassword = await hashPassord(password);
              await dbClient.query('insert into credentials values($1, $2)', [aadhar, hashedPassword]);
            }
            response.success = true;
            console.log("Updation Successful")
            return res.json(response)

        }
        catch(error)
        {
            console.log(error);
            response.internalServerError = true;
            return res.status(500).json(response)
        }
    }
    else
    {
        response.aadharExists = null;
        response.eMailExists = null;
        return res.json(response)
    }

}

router.get('/', (req, res) =>
{
    console.log('Hit UserRegister')
    res.render('userRegister')
})

router.post('/',  userUpdate)


module.exports = router;
