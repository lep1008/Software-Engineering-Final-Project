var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "fitfriends488",
  database: "FitFriends"
});
//global variables only to be used in /submit form and /feed
var username=""; 
var password="";
var name="";



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.post('/login',function(req,res,next) {

  var found=false;
  username=req.body.user;
  password=req.body.pass
  // console.log(u);
  // console.log(p);


///////////////////////////////////
//CODE BELOW FINDS A USER FROM DATABASE BY USERNAME
//////////////////////////////////


////////////////////////////////
con.getConnection(function(err) {

  if (err) throw err;
  con.query("SELECT* FROM User WHERE Username = '"+username+"' LIMIT 1", function (err, result, fields) {
    
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
     
  
    }
    

  });

})
setTimeout(() => {
  if(found===true)
{
  res.redirect('/feed');
  console.log("user found");
}
else 
{
res.redirect('/');
}
}, 2000);



  });
  /////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
















///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
router.post('/submitform',function(req,res,next) {




console.log(req.body.name);
console.log(req.body.user);
console.log(req.body.pass);

username = req.body.user;
password = req.body.pass;
name=req.body.name;
con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO User VALUES ('" + req.body.user + "','" + req.body.pass + "','" + req.body.name + "')";  
  con.query(sql, function (err, result) {
    
    if (err) throw err;
    console.log("1 record inserted");
  

  });
});





  res.redirect('/feed');




});


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});




router.get("/signup", (req, res) => {
  res.render("signup");
});




router.get("/feed", (req, res) => {
res.render('feed', {user: username,name: name, pass: password});
});










module.exports = router;





