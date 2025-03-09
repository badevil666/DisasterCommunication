const express = require('express');
const path = require('path');
const router = express.Router()

// Route to serve the HTML file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Public', 'authorityDashboard.html'))
})



module.exports = router