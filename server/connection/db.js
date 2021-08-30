var mySQL = require('mysql');

//* DEPLOYMENT *//
const pool = mySQL.createPool({
    host:'eu-cdbr-west-01.cleardb.com', 
    user:'bc543c4ea707d1', 
    password:'659a10ce',
    database:'heroku_df7896f6c90ec4e'
});

//* DEVELOPMENT *//

/*const pool = mySQL.createPool({
  host:'localhost',  //localhost    vfernandsugeo.mysql.db
  user:'root',   //root    vfernandsugeo
  password:'VFIskra1234', //VFIskra1234   8VznikwektLCNwL
  database:'vfernandsugeo'  //vfernandsugeo    vfernandsugeo
});*/

var getConnection = function (cb) {
    pool.getConnection(function (err, connection) {
        if(err) {
          return cb(err);
        }
        cb(null, connection);
    });
};

module.exports = getConnection;