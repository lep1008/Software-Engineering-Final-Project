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
















/////////////////////////////////////////////////////////////
//Logic for retrieving list of exercises


/////////////////////////////////////////////////////////////
router.get('/test', function(req, res, next) {  

  

});
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


router.get('/AddWorkout',function(req,res,next)
{
  res.render('Workout');
});






    
    
    











module.exports = router;

































