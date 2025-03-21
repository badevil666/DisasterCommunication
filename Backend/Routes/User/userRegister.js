var express = require('express')
var hashPassord = require('../../Middleware/hashPassword')
var router = express.Router()
var dbClient = require('../../DataBase/dbClient')
//var passwordHasher = hashPassord.passwordHasher



const userRegister = async (req, res) =>
{
    let response = {
        aadharExists : false,
        eMailExists : false,
        registrationSuccess : false,
        userData : null
    }
    console.log(req.body)
    const {aadhar, userName, dob, gender, eMail, phoneNo, currentLocationX, currentLocationY, districtTaluk, skills, password} = req.body;
    if((aadhar && userName && dob && gender, eMail && currentLocationX && currentLocationY && districtTaluk && password))
    {
        try
        {
            const aadharResult = await dbClient.query('SELECT * FROM users where aadhar=$1', [aadhar])
            const eMailResult = await dbClient.query('SELECT * FROM users where email=$1', [eMail]);
            if(aadharResult.rowCount || eMailResult.rowCount || (phoneNo.length < 10))
            {
                response.aadharExists = aadharResult.rowCount > 0;
                response.eMailExists = eMailResult.rowCount > 0;
                console.log("Registration unsuccessfull")
                return res.json(response);
            }

            await dbClient.query('insert into users values($1, $2, $3, $4, $5, $6, POINT($7, $8), $9)', [aadhar, userName, dob, gender, eMail, phoneNo, currentLocationX, currentLocationY, districtTaluk]);

            for(let skill of skills)
            {
                await dbClient.query('insert into userskills values($1, $2)', [aadhar, skill]);
            }
            const hashedPassword = await hashPassord(password);
            await dbClient.query('insert into credentials values($1, $2)', [aadhar, hashedPassword]);

            response.registrationSuccess = true;
            console.log("Registration Successful")
            response.userData = { aadhar, userName, dob, gender, eMail, phoneNo, currentLocationX, currentLocationY, districtTaluk, skills }
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

router.post('/',  userRegister)


module.exports = router;
