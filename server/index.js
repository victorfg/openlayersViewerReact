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
  //const sqlInsert = "INSERT INTO agents (AGENT_NAME, WORKING_AREA, COMMISSION, PHONE_NO) VALUES ('victorfer', 'informatic', '0.2', '678345345');"
  const sqlSelect = "SELECT * FROM agents";
  db.query(sqlSelect, (err, result)=> {
    console.log(err);
    console.log(result)
    res.send(result);
  })

});

app.listen(3001, ()=> {
  console.log('runing port 3001')
})