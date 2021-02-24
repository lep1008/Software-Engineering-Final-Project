var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fitfriends488",
  database: "FitFriends"
});

router.post('/submitform',function(req,res,next) {
console.log(req.body.name);
console.log(req.body.user);
console.log(req.body.pass);


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO User VALUES ('" + req.body.user + "','" + req.body.pass + "','" + req.body.name + "')";  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});


});





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/feed", (req, res) => {
  res.render("feed");
});
















module.exports = router;
