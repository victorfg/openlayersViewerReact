const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');

app.use(express.json());
app.use(cors());

var getConnection = require('./connection/db');

app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get("/api", (req, res) => {
  getConnection(function (err, con) {
    if(err) { console.log(err) }
    var userQuery = "SELECT * FROM geograf";
    console.log("con: " + con);
    con.query(userQuery, (err, result)=> {
      //console.log(result);
      res.send(result);
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  getConnection(function (err, con) {
    if(err) { console.log(err) }

    var userQuery = "SELECT * FROM adminUser";
    con.query(userQuery, (err, result)=> {
      console.log('1a '+result[0].Name);
      console.log('1b '+username);
      console.log('2a '+result[0].Password);
      console.log('2b '+password);

      if (result[0].Name != username) {
        res.send({ statusOK: false,error: "Usuari Incorrecte" })
      } else {
        if (result[0].Password != password) res.send({ statusOK: false, error: "Password Incorrecte" });
      }

      if (result[0].Name === username && result[0].Password === password){
        res.send({statusOK: true});
      }
    });
  });
});

/* TODO falta fer que funcioni */
app.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
        console.log('1 '+err)
      } else {
        res.send('Logout successful')
        console.log('2 ')
      }
    });
  } else {
    res.end()
    console.log('3 ')
  }
})


//* DEVELOPMENT *//

app.listen(3001, ()=> {
  console.log('runing port 3001')
})

//* DEPLOYMENT *//

/*app.listen(process.env.PORT || PORT, ()=> {
  console.log('runing port 3001')
})*/