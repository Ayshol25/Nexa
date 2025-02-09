require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  interests: [String],
  locationPreference: String,
  collegeVibe: String,
  aptitudeResults: [String]
});
const User = mongoose.model('User', UserSchema);

// Define College Schema
const CollegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  courses: [String],
  vibe: String
});
const College = mongoose.model('College', CollegeSchema);

// API Routes
app.post('/register', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ message: 'User registered', user: newUser });
});

app.get('/colleges', async (req, res) => {
  const { interest, location, vibe } = req.query;
  const colleges = await College.find({
    courses: interest,
    location: location,
    vibe: vibe
  });
  res.json(colleges);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
