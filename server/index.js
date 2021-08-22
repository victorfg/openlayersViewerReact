const express = require('express');
const app = express();
const path = require('path');

var getConnection = require('./connection/db');

app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get("/api", (req, res) => {
  getConnection(function (err, con) {
    if(err) { console.log(err) }
    var userQuery = "SELECT * FROM geograf";
    console.log("con: " + con); //displays undefined
    con.query(userQuery, (err, result)=> {
      //console.log(result);
      res.send(result);
    });
  });
});

//* DEVELOPMENT *//

/*app.listen(3001, ()=> {
  console.log('runing port 3001')
})*/

//* DEPLOYMENT *//

app.listen(process.env.PORT || PORT, ()=> {
  console.log('runing port 3001')
})