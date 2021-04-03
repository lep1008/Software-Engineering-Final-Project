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












  router.get('/AddWorkout', function(req, res, next)
{

var exercises=new Array(9);
  
  con.getConnection(function(err)
  {
    if (err) throw err;
    var sql = "SELECT Name FROM exercises"; 
    con.query(sql, function (err, result)
    {
      if (err) throw err;
   
      exercises=result;

    for(i=0;i<exercises.length;i++)
    {    
    var helper;
    helper=JSON.stringify(exercises[i]);
    helper=helper.substring(helper.indexOf(":"));
    helper=helper.substring(helper.indexOf("\"")+1,helper.lastIndexOf("\""));
    exercises[i]=helper;
    }
    exercises.sort();
    });
  });


    
    
    
    
    setTimeout(() => {
      res.render('Workout',{exercises:exercises});
    }, 5000);
    
    
    
    
    
    
    
    
    
    
    });
    
    
    
    











module.exports = router;

































