const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME;

app.listen(port,() => {
  console.log(`Server is running on port ${port}`);
});

// Endpoint to create a text file with current timestamp

// http://localhost:8000/createFile

app.get('/createFile', (req, res) => {
  const timestamp = new Date().toISOString();
  const fileName = "date-time.txt";
  const filePath = path.join(__dirname, 'Files', fileName);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error creating file');
    }
    res.status(200).send(`File created successfully Current Timestamp = ${timestamp}`);
  });
});

// Endpoint to retrieve all text files

// http://localhost:5000/getTextFiles

app.get('/getTextFiles', (req, res) => {
  const folderPath = path.join(__dirname, 'Files');
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading folder');
    }
    res.status(200).json(files);
  });
});