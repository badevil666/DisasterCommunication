const express = require('express');
const path = require('path');
const fs = require('fs');
const dbClient = require('../../DataBase/dbClient')
const axios = require('axios');
const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../Uploads/');
console.log(uploadDir)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const districtTalukMap = {
    'Thiruvananthapuram': { 'Neyyattinkara': 1, 'Kattakkada': 2, 'Nedumangad': 3, 'Thiruvananthapuram': 4, 'Chirayinkeezhu': 5, 'Varkala': 6 },
    'Kollam': { 'Kollam': 7, 'Kunnathoor': 8, 'Karunagappally': 9, 'Kottarakkara': 10, 'Punalur': 11, 'Pathanapuram': 12 },
    'Pathanamthitta': { 'Adoor': 13, 'Konni': 14, 'Kozhencherry': 15, 'Ranni': 16, 'Mallappally': 17, 'Thiruvalla': 18 },
    'Alappuzha': { 'Chengannoor': 19, 'Mavelikkara': 20, 'Karthikappally': 21, 'Kuttanad': 22, 'Ambalappuzha': 23, 'Cherthala': 24 },
    'Kottayam': { 'Changanasserry': 25, 'Kottayam': 26, 'Vaikom': 27, 'Meenachil': 28, 'Kanjirappally': 29 },
    'Idukki': { 'Peermade': 30, 'Udumbanchola': 31, 'Idukki': 32, 'Thodupuzha': 33, 'Devikulam': 34 },
    'Ernakulam': { 'Kothamangalam': 35, 'Muvattupuzha': 36, 'Kunnathunad': 37, 'Kanayannur': 38, 'Kochi': 39, 'North Paravur': 40, 'Aluva': 41 },
    'Thrissur': { 'Chalakudy': 42, 'Mukundapuram': 43, 'Kodungallur': 44, 'Thrissur': 45, 'Chavakkad': 46, 'Kunnamkulam': 47, 'Thalapilly': 48 },
    'Palakkad': { 'Alathoor': 49, 'Chittur': 50, 'Palakkad': 51, 'Pattambi': 52, 'Ottapalam': 53, 'Mannarkkad': 54, 'Attappady': 55 },
    'Malappuram': { 'Perinthalmanna': 56, 'Nilambur': 57, 'Ernad': 58, 'Kondotty': 59, 'Ponnani': 60, 'Tirur': 61, 'Tirurangadi': 62 },
    'Kozhikode': { 'Kozhikode': 63, 'Thamarassery': 64, 'Koyilandy': 65, 'Vatakara': 66 },
    'Wayanad': { 'Vythiri': 67, 'Sulthan Bathery': 68, 'Mananthavady': 69 },
    'Kannur': { 'Thalassery': 70, 'Iritty': 71, 'Kannur': 72, 'Taliparamba': 73, 'Payyanur': 74 },
    'Kasaragod': { 'Hosdurg': 75, 'Vellarikund': 76, 'Kasaragod': 77, 'Manjeshwaram': 78 }
};

function getTalukNumber(district, taluk) {
    if (districtTalukMap[district] && districtTalukMap[district][taluk]) {
        return districtTalukMap[district][taluk];
    } else {
        return null; // Return null if not found
    }
}

const getLocationDetails = async (lat, lon) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                lat: lat,
                lon: lon,
                format: 'json',
                zoom: 10, // Get administrative divisions
            }
        });

        const address = response.data.address;
        
        const district = address.county || address.state_district || null;
        const taluk = address.suburb || address.town || address.village || address.city || null;

        return { district, taluk, rawAddress: address };
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return { error: "Geocoding failed" };
    }
};

// Function to fetch details and log taluk number
const fetchAndPrintTalukNumber = async () => {
    try {
        const data = await getLocationDetails('11.051927399555705', '75.86342262371745');
        console.log(data)
        if (data.error) {
            console.error("Error fetching location details:", data.error);
            return;
        }
        
        const talukNumber = getTalukNumber(data.rawAddress.state_district, data.rawAddress.county);
        console.log("Taluk Number:", talukNumber);
        return talukNumber
    } catch (error) {
        console.error("Error:", error);
    }
};

async function getTaluk()
{
    return await fetchAndPrintTalukNumber();
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
    let taluk = await getTaluk(locationX, locationY)
    console.log([description, locationX, locationY, fileName, aadhar, type, taluk])

    await dbClient.query('insert into report(reportdescription, reportedlocation, video, reporteduser, disastertype, taluk) values($1, POINT($2, $3), $4, $5, $6, $7)', [description, locationX, locationY, fileName, aadhar, type, taluk])
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
