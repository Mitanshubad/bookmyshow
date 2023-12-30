const express = require("express");
const router = express.Router();
const Schema = require("./schema");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
}));


// Creating a new booking and adding it to the database.
router.post("/booking", async (req, res) => {
    try {
      const { movie, slot, seats } = req.body;
      const myData = new Schema({ movie, slot, seats });
      const saved = await myData.save();

      if (saved) {
        return res.status(200).json({ data: myData, message: "Booking successful!" });
      } else {
        throw new Error("Failed to save booking data.");
      }
    } catch (error) {
      return res.status(500).json({
        data: null,
        message: "Something went wrong! Please try again.",
        error: error.message,
      });
    }
  });

  // Getting the details of the last booking from the database and sending it to the frontend.
router.get("/booking", async (req, res) => {
    try {
      const myData = await Schema.find().sort({ _id: -1 }).limit(1);

      if (myData.length === 0) {
        return res.status(200).json({ data: null, message: "No previous booking found!" });
      } else {
        return res.status(200).json({ data: myData[0] });
      }
    } catch (error) {
      return res.status(500).json({
        data: null,
        message: "Something went wrong while fetching the last booking.",
        error: error.message,
      });
    }
  });
  
  module.exports = router; 