const express = require("express");
const app = express();
const { connection } = require("./connector");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 8080;
/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
}));
// Connecting to database
connection();

// creating an api and separating it.
app.use("/api", require("./routes"));

// listening backend on a port.
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
