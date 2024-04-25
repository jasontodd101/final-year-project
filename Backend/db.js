const mysql=require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'steigen_event'
  });




module.exports=db;