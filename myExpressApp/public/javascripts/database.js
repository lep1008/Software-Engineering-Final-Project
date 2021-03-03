const mysql = require('mysql');

  //Method to Create Database Connection
  var con = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "fitfriends488",
    database: "FitFriends"
  });

  //Variable Declaration
  var username ='lep';
  var name='luke';
  var pass="what";

  //Method to insert data into database
  con.connect(function(err)
  {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO User VALUES ('" + username + "','" + pass + "','" + name + "')";  
    con.query(sql, function (err, result)
    {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });