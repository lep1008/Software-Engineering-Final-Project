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
var cardio=new Array(8);
var lifts=new Array(9);
  con.getConnection(function(err)
  {
    if (err) throw err;
    var sql = "SELECT Name FROM Cardio";   
    con.query(sql, function (err, result)
    {
      if (err) throw err;
   
      cardio=result;

    for(i=0;i<cardio.length;i++)
    {    
    var helper;
    helper=JSON.stringify(cardio[i]);
    helper=helper.substring(helper.indexOf(":"));
    helper=helper.substring(helper.indexOf("\"")+1,helper.lastIndexOf("\""));
    cardio[i]=helper;
    }
    cardio.sort();
    });
  });
  con.getConnection(function(err)
  {
    if (err) throw err;
    var sql = "SELECT Name FROM Lifts"; 
    con.query(sql, function (err, result)
    {
      if (err) throw err;
   
      lifts=result;

    for(i=0;i<lifts.length;i++)
    {    
    var helper;
    helper=JSON.stringify(lifts[i]);
    helper=helper.substring(helper.indexOf(":"));
    helper=helper.substring(helper.indexOf("\"")+1,helper.lastIndexOf("\""));
    lifts[i]=helper;
    }
    lifts.sort();
    });
  });

setTimeout(() => {
  res.render('test',{cardio:cardio,lifts:lifts});
}, 5000);
});
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////














module.exports = router;
