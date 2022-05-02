'use strict';
const express = require('express');
const parser = require("libxmljs2");
const fileUpload = require('express-fileupload');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(fileUpload());

app.post("/getfile", (req, res) => {
  let xmlDataObj = parser.parseXmlString(req.files.file.data, {
    noblanks: true,
    noent: true,
    nocdata: true,
    net: false,
  });
  let to = xmlDataObj.get("//to").text();
  let accountTo = xmlDataObj.get("//accountTo").text();
  let ammount = xmlDataObj.get("//ammount").text();
  let comment = xmlDataObj.get("//comment").text();
  let url = `/paybydocument/${to}/${accountTo}/${ammount}/${comment}`;
  res.json({ route: url });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);