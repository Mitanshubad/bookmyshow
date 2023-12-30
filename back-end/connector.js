// Importing required modules
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

// Loading environment variables
require("dotenv").config();

// Set up MongoDB URI based on environment
const mongoURI = process.env.HOST_ENV === "production"
  ? process.env.MONGODBURI
  : "mongodb://localhost:27017/bookMovie";

// Function to establish a connection with the database
const connectDB = () => {
  try {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + mongoURI);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

    console.log("Connection established with MongoDB server online");
  } catch (err) {
    console.error("Error while connecting:", err);
  }
};

// Exporting the function for use in other modules
exports.connection = connectDB;
