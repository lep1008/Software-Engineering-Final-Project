var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "fitfriends488",
  database: "FitFriends"
});

router.post('/submitform',function(req,res,next) {




console.log(req.body.name);
console.log(req.body.user);
console.log(req.body.pass);


con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO User VALUES ('" + req.body.user + "','" + req.body.pass + "','" + req.body.name + "')";  
  con.query(sql, function (err, result) {
    
    if (err) throw err;
    console.log("1 record inserted");
  

  });
});




setTimeout(() => {
  res.redirect('/feed');
}, 5000);



});





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});




router.get("/feed", (req, res) => {
  
 

con.getConnection(function(err) {

  if (err) throw err;
  con.query("SELECT* FROM User", function (err, result, fields) {
    
    if (err) throw err;
    res.render('feed');
    console.log(result);

  });
})








});

















module.exports = router;
