const express = require('express');
const router = express.Router();
const dbClient = require('../../DataBase/dbClient');

const getReports = async (req, res) => {
    const { authorityId } = req.body; // Read from JSON body
    console.log(req.body)
    if (!authorityId) {
        return res.status(400).json({ error: "Authority ID is required" });
    }

    try {
        const query = `SELECT R.* 
                       FROM Report R 
                       JOIN districtstaluk DT ON R.taluk = DT.id 
                       JOIN Authority A ON A.District = DT.district 
                       WHERE A.ID = $1`;

        const result = await dbClient.query(query, [authorityId]);
        console.log(result.rows)
        res.json({ data: result.rows });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


router.post('/', getReports);

module.exports = router;
