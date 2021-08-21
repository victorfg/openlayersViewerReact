const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'VFIskra1234',
  database:'vfernandsugeo'
});

app.get("/api", (req, res) => {
  const sqlSelect = "SELECT * FROM geograf";
  db.query(sqlSelect, (err, result)=> {
    console.log(result);
    res.send(result);
  })

});

app.listen(3001, ()=> {
  console.log('runing port 3001')
})