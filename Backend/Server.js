const express = require('express')
const app = express();
const dotenv = require('dotenv')
const path = require('path')
const fileUpload = require("express-fileupload")

dotenv.config()

const PORT = process.env.PORT || 8000

const logger = (req, res, next) =>
{
    console.log(`${req.method} ${req.url}`)
    next();
}

app.use(logger); //Simply logs the requests

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'Views'))

app.use(fileUpload({ limits: { fileSize: 1024 * 1024 * 1024 } })); // 1GB limit




//Middlewares
app.use(express.json({ limit: '500mb' })); // Increase JSON body limit
app.use(express.urlencoded({ limit: '500mb', extended: true })); // Increase URL-encoded body limit
app.use(express.static(path.join(__dirname, 'Public')))

const getVolunteerData  = require('./Routes/User/getVolunteerData')
const getDashboard = require('./Routes/User/getDashboard')
const joinVolunteering = require('./Routes/User/joinVolunteering')
const userRegister = require('./Routes/User/userRegister')
const userLogin = require('./Routes/User/userLogin')
const reportDisaster = require('./Routes/User/reportDisaster')
const updateLocation = require('./Routes/User/updateLocation')
const getDisaster = require('./Routes/User/getDisaster')
const userUpdate = require('./Routes/User/userUpdate')
const getGuidelines = require('./Routes/User/getGuidelines')


app.use('/videos', express.static(path.join(__dirname, 'Uploads')))
app.use('/getVolunteerData', getVolunteerData)
app.use('/getDashboard', getDashboard)
app.use('/joinVolunteering', joinVolunteering)
app.use('/userRegister', userRegister)
app.use('/userLogin', userLogin)
app.use('/reportDisaster', reportDisaster)
app.use('/updateLocation', updateLocation)
app.use('/getDisaster', getDisaster)
app.use('/userUpdate', userUpdate)
app.use('/getGuidelines', getGuidelines)


app.get('/', (req, res) => {
    //res.send("Hello World. God is the ultimate sourece of wisdom")
    res.render('home')
});

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`)
})
