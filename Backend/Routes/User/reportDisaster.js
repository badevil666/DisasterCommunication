const express = require('express');
const path = require('path');
const fs = require('fs');
const dbClient = require('../../DataBase/dbClient')

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../Uploads/');
console.log(uploadDir)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define the upload endpoint
router.post('/', async (req, res) => 
{
  console.log('📥 Incoming request headers:', req.headers);

  console.log('📂 Files received:', req.files); // Should log { video: {...} } if working
  const {aadhar, locationX, locationY, type, description} = JSON.parse(req.body.json)
  
  if (!req.files || !req.files.video) 
  {
    return res.status(400).json({ message: 'No video file uploaded' });
  }
  
  let videoFile = req.files.video;
  let fileName = Date.now() + videoFile.name 
  let uploadPath = path.join(uploadDir, fileName);
  console.log(uploadPath)

  try 
  {
    await videoFile.mv(uploadPath);
    console.log([description, locationX, locationY, uploadPath, aadhar, type])
    await dbClient.query('insert into report(reportdescription, reportedlocation, video, reporteduser, disastertype) values($1, POINT($2, $3), $4, $5, $6)', [description, locationX, locationY, uploadPath, aadhar, type])
    res.json({ message: 'Upload successful', file: videoFile.name });
  } 
  catch (err) 
  {
    console.error('❌ Upload error:', err);
    res.status(500).json({ message: err.message });
  }

  try
  {
    const result = await dbClient.query()
  }
  catch(err)
  {

  }
});

module.exports = router;
