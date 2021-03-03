//Setup Database Connection
  var express = require('express');
  var router = express.Router();
  const mysql = require('mysql');
  var con = mysql.createPool
  ({
    host: "localhost",
    user: "root",
    password: "fitfriends488",
    database: "FitFriends"
  });


//Global Variable Declaration (only used in /submit form and /feed)
  var username=""; 
  var password="";
  var name="";


//Disables Direct Access to Profile Page
  var blocker=true;


//Post Login Method
  router.post('/login',function(req,res,next)
  {
    var found=false;
    username=req.body.user;
    password=req.body.pass
    blocker=false;
 
    //Function to Find a User From the Database By Username and Password
    con.getConnection(function(err)
    {
      if (err) throw err;

      con.query("SELECT Name FROM User WHERE Username = '"+username+"' AND Password = '"+password+"' LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;
        if (result.length ===0)
        {
          console.log("empty");
          found=false;
        }
        else 
        {
          found=true;
          console.log(result);
          name=JSON.stringify(result);
          console.log(name);
          name=name.substring(name.indexOf(":"));
          name=name.substring(name.indexOf("\"")+1,name.lastIndexOf("\""));
        }
      });
    })

    setTimeout(() =>
    {
      if(found===true)
      {
        res.redirect('/profile');
        console.log("user found");
      }
      else 
      {
        res.redirect('/');
      }
    }, 2000);
  });


//Post SubmitForm Method
  router.post('/submitform',function(req,res,next)
  {

    blocker=false;
    console.log(req.body.name);
    console.log(req.body.user);
    console.log(req.body.pass);

    username = req.body.user;
    password = req.body.pass;
    name=req.body.name;

    con.getConnection(function(err)
    {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO User VALUES ('" + req.body.user + "','" + req.body.pass + "','" + req.body.name + "')";  
      con.query(sql, function (err, result)
      {
    
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
    res.redirect('/profile');
  });

  
//Get Methods
  
  //Get Home Page
    router.get('/', function(req, res, next)
    {
      res.render('index');
    });

  //Get Signup Page
    router.get("/signup", (req, res) => 
    {
      res.render("signup");
    });

  //Get Profile Page
    router.get("/profile", (req, res) => 
    {
      if(blocker==true)
      {
        res.redirect('/');
      }
      else
        res.render('profile', {user: username,name: name, pass: password});

      blocker=true;
    });

module.exports = router;