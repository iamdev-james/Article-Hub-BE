const express = require('express');
const connect_DB = require('./DB_con')
require('dotenv').config();

const { PORT } = process.env
// Initailising Express
const app = express();

// Connecting to a MONGO DB server
connect_DB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: "welcome to the note store App" })
})

// Port
const port = process.env.PORT || PORT;
// Setting up my server 
app.listen(port, (err) => {
  if (err) {
    console.log("An error occured")
  }
  console.log("Server is up and running on port " + port)
})