const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const collegeData = {
    "Engineering": ["MIT", "Stanford", "IIT Bombay","ilahia", "ETH Zurich"],
    "Medicine": ["Harvard Medical School", "Johns Hopkins", "AIIMS", "University of Toronto"],
    "Arts": ["Parsons School of Design", "NYU Tisch", "NIFT", "Royal College of Art"],
    "Science": ["Caltech", "UC Berkeley", "TIFR", "Cambridge"],
    "Law": ["Harvard Law School", "Yale Law School", "NLSIU Bangalore", "Oxford Law"],
    "Agriculture": ["Cornell University", "University of Wageningen", "GB Pant University", "UC Davis"],
    "Military": ["US Naval Academy", "National Defense Academy", "Royal Military Academy", "Air Force Academy"],
    "Navy": ["United States Merchant Marine Academy", "Naval War College", "Indian Maritime University"],
    "Airport": ["Embry-Riddle Aeronautical University", "Purdue University", "Indian Institute of Aviation"]
};

// API to get college recommendations
app.post('/get-colleges', (req, res) => {
    const { interest, location, vibe } = req.body;
    
    if (!interest) {
        return res.status(400).json({ message: "Interest is required" });
    }

    const colleges_intrest = collegeData[interest] || [];
    console.log(colleges_intrest)
    res.json({
        interest,
        location: location || "Not specified",
        vibe: vibe || "Not specified",
        colleges_intrest
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
