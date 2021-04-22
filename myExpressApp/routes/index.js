//Sets up express application and router
  var express = require('express');
  var router = express.Router();
  module.exports = router;



  //Sets up database connection
  const mysql = require('mysql');



//Global Variable Declaration 
  var username=""; //holds value of username
  var password=""; //holds value of password
  var name=""; //holds value of full name
  var following; //holds value of # of following
  var followers; //holds value of # of followers
  var posts; //holds value of # of posts
  var bio; //holds value of bio
  var pic='images/profilePic.jpg'; //holds value of profile image source
  var blocker=true; //boolean to disable direct access to views
  var workoutID;
  var first=true;
  
  



//////////////////////////////////////////////////////////////////////////////////
////////////POST METHODS/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


//Post Login Method
  router.post('/login',function(req,res,next)
  {
    var con = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });
    var found=false; //initialize found variable to false
    username=req.body.user;//grabs username from login form
    password=req.body.pass//grabs password from login form
    blocker=false;//user clicked on login blocker is no longer needed
    //Retrieves full name from database using the entered username and password
    con.getConnection(function(err)
    {
      if (err) throw err; //if a connection error takes place an error is thrown
      //query for retrieving the full name of the user
      con.query("SELECT Name FROM User WHERE Username = '"+username+"' AND Password = '"+password+"' LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;//if an sql error takes place an error is thrown
        if (result.length ===0)//if no value is found then the user does not exist
        {
          found=false; //no user found
        }
        else //user exists and the full name is retrieved using the default result variable
        {
          found=true;
          name=JSON.stringify(result); //result variable must be converted into a string that can be used 
          name=name.substring(name.indexOf(":"));
          name=name.substring(name.indexOf("\"")+1,name.lastIndexOf("\""));
        }
      });
      //Retrieves followers counter from database using same logic
      con.query("SELECT Followers FROM User WHERE Username = '"+username+"' AND Password = '"+password+"' LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;
        if (result.length ===0)
        {
          found=false;
        }
        else 
        {
          found=true;
          followers=JSON.stringify(result);
          followers=followers.substring(followers.indexOf(":"));
          followers=followers.substring(1,followers.lastIndexOf("}"));
        }
      });
      //Retrieves following counter from database using same logic
      con.query("SELECT Following FROM User WHERE Username = '"+username+"' AND Password = '"+password+"' LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;
        if (result.length ===0)
        {
          found=false;
        }
        else 
        {
          found=true;
          following=JSON.stringify(result);
          following=following.substring(following.indexOf(":"));
          following=following.substring(1,following.lastIndexOf("}"));
        }
      })
      //Retrieves posts counter from database using same logic
      con.query("SELECT Posts FROM User WHERE Username = '"+username+"' AND Password = '"+password+"' LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;
        if (result.length ===0)
        {
          found=false;
        }
        else 
        {
          found=true;
          posts=JSON.stringify(result);
          posts=posts.substring(posts.indexOf(":"));
          posts=posts.substring(1,posts.lastIndexOf("}"));
        }
      })
      //Retrieves bio from database using same logic
      con.query("SELECT Bio FROM User WHERE Username = '"+username+"' AND Password = '"+password+"' LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;
        if (result.length ===0)
        {
          found=false;
        }
        else 
        {
          found=true;
          bio=JSON.stringify(result);
          bio=bio.substring(bio.indexOf(":"));
          bio=bio.substring(bio.indexOf("\"")+1,bio.lastIndexOf("\""));
        }
      })
      //Retrieves profile picture from database using same logic
      con.query("SELECT Pic FROM User WHERE Username = '"+username+"' AND Password = '"+password+"' LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;
        if (result.length ===0)
        {
          found=false;
        }
        else 
        {
          found=true;         
          pic=JSON.stringify(result);
          pic=pic.substring(pic.indexOf(":"));
          pic=pic.substring(pic.indexOf("\"")+1,pic.lastIndexOf("\""));
          if(pic=="")
          {
            pic='images/profilePic.jpg'
          }
          
        }
      })

    })
    //gives the database queries enough time to execute and redirects to a get request
    setTimeout(() =>
    {
      if(found===true) //user exists
      {
        res.redirect('/profile'); //go to profile page
      }
      else 
      {
        
        res.redirect('/'); //user does not exist go back to login screen
      }
    }, 2000);
  });



//Signs up a new user and stores their credentials in the database
  router.post('/signUp',function(req,res,next)
  {
    var con = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });
    blocker=false; //signup button was clicked
    pic='images/profilePic.jpg'; //default profile image is provided
    username = req.body.user; //new user's username is stored
    password = req.body.pass; //new user's password is stored
    name=req.body.name; //new user's full name is stored
    followers=0; //default followers count
    following=0; //default following count
    posts=0; //default posts count
    bio=""//default bio
    //Inserts the new user into the database
    con.getConnection(function(err)
    {
      if (err) throw err;
      var sql = "INSERT INTO User VALUES ('" + req.body.user + "','" + req.body.pass + "','" + req.body.name + "',0,0,0,null,null)"; //query to insert user  
      con.query(sql, function (err, result)
      {
        if (err) throw err;
      });
    });
    res.redirect('/profile'); //go to profile page
  });

  



//Sets up node.js middleware function for handling uploads
const multer=require("multer");
//All image uploads will be sent to images folder
const upload = multer({dest: './public/images',
filename: function (req, file, cb) {
  cb(null,  file.originalname );
}
  });

//Image is uploaded into filing system and the user's picture name is stored in the database 
router.post('/upload', upload.single('image'),(req, res) => {
  var con = mysql.createPool
  ({
    host: "localhost",
    user: "root",
    password: "fitfriends488",
    database: "FitFriends"
  });
  pic='images/'+req.file.filename; //picture path and name is stored
  //Stores the picture name into the database
  con.getConnection(function(err)
  {
    if (err) throw err;
    var sql = "UPDATE USER SET Pic='"+pic+"' WHERE Username='"+username+"';"; //query to insert picture name
    con.query(sql, function (err, result)
    {
      if (err) throw err;
    });
  });
  blocker=false; 
  res.redirect('/profile'); //show profile page with updated picture
});




//User is logged out of system
router.post('/logout',(req, res) => {
  //globals are reset to defaults
   username=""; 
   password="";
   name="";
   following="";
   followers="";
   posts="";
   bio="";
   pic='images/profilePic.jpg';
   first=true;
   workoutID=null;

res.redirect('/'); //go to login screen


});

router.post('/bio',function(req,res,next)
  {
    var con = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });
    bio=req.body.value;
    con.getConnection(function(err)
    {
      if (err) throw err;
      var sql = "UPDATE USER SET Bio='"+bio+"' WHERE Username='"+username+"';"; 
      con.query(sql, function (err, result)
      {
        if (err) throw err;
      });
    });
    
    
res.redirect('/profile');


  });








//Adds new workout info
  router.post('/addWorkout',function(req,res,next)
  {
    var noc = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });



     workoutName=req.body.workoutName;
    var caption=req.body.workoutCaption;
    var date= new Date();
    var month=date.getMonth()+1;
    var hour=date.getHours();
    var minute=date.getMinutes();
    if(minute<10) {
      minute="0"+minute;
    }
    var dateString;
    if(hour>12)
    {
      hour=hour-12;
      var dateString=month+'/'+date.getDate()+'/'+date.getFullYear()+" "+hour+":"+minute+" PM";
    }
    else {
      if(hour==0)
      {
        hour=12;
      }
      var dateString=month+'/'+date.getDate()+'/'+date.getFullYear()+" "+hour+":"+minute+" AM";
    }
    
     //Workout info
    noc.getConnection(function(err)
    {
      if (err) throw err;
      var sql = "INSERT INTO Workout VALUES ('" + dateString + "','" + username + "','" + caption +"','"+ workoutName+"',null)"; //query to insert workout  
      noc.query(sql, function (err, result)
      {
        if (err) throw err;
      });
    })

    setTimeout(() => {
      noc.getConnection(function(err)
      {
      noc.query("Select ID FROM Workout ORDER BY ID DESC LIMIT 1", function (err, result, fields)
      {
        if (err) throw err;
        if (result.length ===0)
        {
          
        }
        else 
        {
          workoutID=JSON.stringify(result); //result variable must be converted into a string that can be used 
          workoutID=workoutID.substring(workoutID.indexOf(":")+1);
          workoutID=workoutID.substring(0,workoutID.indexOf("}"));
  
        
        }
      })
    })
    }, 1000);


setTimeout(() => {
  res.redirect('/AddExercise')
}, 3000);

  });







  router.post('/Exercise', upload.single('video'),(req, res) => {
    var con = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });
    var exerciseVideo='images/'+req.file.filename; //video path and name is stored
    var name=req.body.exercise;
    var sets=req.body.sets;
    var reps=req.body.reps;
    var weight=req.body.weight; 
    if(req.body.button=="new")
    {
      con.getConnection(function(err)
      {
        if (err) throw err;
        if(first==true)
        {
          var sql = "INSERT INTO UserExercises VALUES ('" + name + "','" + weight + "','" + sets +"','"+ reps+"','"+exerciseVideo+"','"+workoutID+"','yes*')";  
          first=false;
        }
        else {
        var sql = "INSERT INTO UserExercises VALUES ('" + name + "','" + weight + "','" + sets +"','"+ reps+"','"+exerciseVideo+"','"+workoutID+"',null)";  
        }
        con.query(sql, function (err, result)
        {
          if (err) throw err;
        });
      })
  setTimeout(() => {
    res.redirect('/AddExercise')
  }, 2000);
    }
    else {
  
    con.getConnection(function(err)
    {
      if (err) throw err;
      if(first==true)
      {
        var sql = "INSERT INTO UserExercises VALUES ('" + name + "','" + weight + "','" + sets +"','"+ reps+"','"+exerciseVideo+"','"+workoutID+"','yes*')";  
        
      }
      else {
      var sql = "INSERT INTO UserExercises VALUES ('" + name + "','" + weight + "','" + sets +"','"+ reps+"','"+exerciseVideo+"','"+workoutID+"',null)";  
      }
      con.query(sql, function (err, result)
      {
        if (err) throw err;
      });
    })
setTimeout(() => {
  first=true;
  res.redirect('/profile');
}, 2000);


    }
  });














//////////////////////////////////////////////////////////////////////////////////
////////////GET METHODS//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  
  //Gets Home Page
  router.get('/', function(req, res, next)
  {
    res.render('index');
  });

//Gets Signup Page
  router.get("/signup", (req, res) => 
  {
    res.render("signup");
  });


  router.get("/home",(req,res) => {
    
    var feed;




    var con = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });

    con.getConnection(function(err)
    {
      if (err) throw err;
      var sql = "SELECT* from workout"; 
      con.query(sql, function (err, result)
      {
        if (err) throw err;
       
        feed=result;
      });






    });










      setTimeout(() => {
          res.render("HOME",{feed:feed});
          }, 2000);










  });

 



//Gets Profile Page





  router.get("/profile", (req, res) => 
  {
    var con = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });
    var id;
    var date;
    var wName;
    var image;
    if(blocker==true) //we do not want people going directly to profile page without logging in or signing up
    {
      res.redirect('/'); //go to login screen
    }
    else {
      var workouts;
      var x=new Array(50);
      var z;
      con.getConnection(function(err)
      {
        if (err) throw err;
        var sql = "SELECT* from Workout WHERE User='"+username+"'"; 
        con.query(sql, function (err, result)
        {
          if (err) throw err;
          workouts=result;
          posts=result.length;
     
        });
      });
      var exercises;
      setTimeout(() => {
        con.getConnection(function(err)
      {
        if (err) throw err;
        var sql = "SELECT* from UserExercises Where First='yes*'"; 
        con.query(sql, function (err, result)
        {
          if (err) throw err;
          exercises=result;
        });
      });
      }, 1000);    
      setTimeout(() => {  
       
      for(i=0;i<workouts.length;i++)
      {
        date=workouts[i].Date;
        wName=workouts[i].Name;
        id=workouts[i].ID;

      for(q=0;q<exercises.length;q++)
      {
        if(exercises[q].WorkoutID==id)
        {
          image=exercises[q].Pic;
          z={"wName":wName,"date":date,"image":image,"id":id};
          x[i]=z;
        }
      }
      }
    }, 2000);
      setTimeout(() => {
         x = x.filter(el => {
          return el != null && el != '';
        });
        x.reverse(); 
      
        res.render('profile', {user: username,name: name, pass: password,followers:followers,following:following,posts:posts,bio:bio,pic:pic,x:x}); //displays profile page with JSON variables
     }, 4000);
    }
  });



  








  
//ADDS A  new exercise to the database
  
  router.get('/AddExercise', function(req, res, next)
{


  var refresh;
  var con = mysql.createPool
  ({
    host: "localhost",
    user: "root",
    password: "fitfriends488",
    database: "FitFriends"
  });
  var exampleExercises=new Array(9);
  con.getConnection(function(err)
  {
    if (err) throw err;
    var sql = "SELECT Name FROM exercises"; 
    con.query(sql, function (err, result)
    {
      if (err) throw err;
      exampleExercises=result;
    
    for(i=0;i<exampleExercises.length;i++)
    {    
    var helper;
    helper=JSON.stringify(exampleExercises[i]);
    helper=helper.substring(helper.indexOf(":"));
    helper=helper.substring(helper.indexOf("\"")+1,helper.lastIndexOf("\""));
    exampleExercises[i]=helper;
    }
    exampleExercises.sort();
    });

    var sql="SELECT Name FROM userexercises Where workoutID="+workoutID;
    con.query(sql, function (err, result)
    {

      refresh=result;
      

    });


    })
    setTimeout(() => {
      res.render('Exercise',{workoutName:workoutName,exercises:exampleExercises,refresh:refresh});
    }, 5000);
  });


    
    


//finds the selected workout

  
  router.post('/findWorkout', (req, res) => {


      workoutID=req.body.idImage;

      res.redirect('/ViewWorkout');
  });


  router.get("/ViewWorkout", (req, res) => 
  {
     var x;
     var w;
     var focus;
     var con = mysql.createPool
      ({
        host: "localhost",
        user: "root",
        password: "fitfriends488",
        database: "FitFriends"
      });
      con.getConnection(function(err)
      {
        if (err) throw err;
        var sql = "SELECT* from Workout Where ID="+workoutID; 
        con.query(sql, function (err, result)
        {
          if (err) throw err;
          x=result[0];
        });
        var sql = "SELECT* from Userexercises Where WorkoutID="+workoutID; 
        con.query(sql, function (err, result)
        {
          if (err) throw err;
          if(video==null){
            focus=result[0];
          }
          else {
          for(e=0;e<result.length;e++)
          {
            if(result[e].Name==video)
            {
              focus=result[e];
              video=null;
            }
          }
        }
          w=result;
        });




      });

      setTimeout(() => {
        res.render('ViewWorkout',{x:x,focus:focus,w:w})
      }, 2000);








    
  });



  var video;
    //changes the video to the selected workout
  router.post('/changeVideo', (req, res) => {

   video=req.body.wName;
   
    res.redirect('/ViewWorkout');
});


router.post('/deleteWorkout', (req, res) => {
  var x=req.body.id;

  var con = mysql.createPool
    ({
      host: "localhost",
      user: "root",
      password: "fitfriends488",
      database: "FitFriends"
    });

 con.getConnection(function(err)
 {
   if (err) throw err;
   var sql = "delete FROM Workout Where ID ="+x; 
   con.query(sql, function (err, result)
   {
     if (err) throw err;
     exampleExercises=result;
   
   });
   var sql = "delete FROM Userexercises Where WorkoutID ="+x; 
   con.query(sql, function (err, result)
   {
     if (err) throw err;
     exampleExercises=result;
   
   });


 
   })

   setTimeout(() => {
    res.redirect('/profile');
   }, 200);
 

});




router.get("/schedule", (req, res) => 
{
  var dates;
  var con = mysql.createPool
  ({
    host: "localhost",
    user: "root",
    password: "fitfriends488",
    database: "FitFriends"
  });

  con.getConnection(function(err)
 {
   if (err) throw err;
   var sql = "Select* from Schedule Where User='"+username+"'" ;
   con.query(sql, function (err, result)
   {
     if (err) throw err;
      dates=result;
   
   });

  });

setTimeout(() => {
  res.render('Schedule',{dates,dates});
}, 1000);




  
});


router.post('/addToSchedule',function(req,res,next) 
{

  var con = mysql.createPool
  ({
    host: "localhost",
    user: "root",
    password: "fitfriends488",
    database: "FitFriends"
  });
  var event=req.body.event;
  var date=req.body.InputDate;

  con.getConnection(function(err)
 {
   if (err) throw err;
   var sql = "INSERT INTO schedule VALUES ('" + username + "','" + event + "','" + date+ "')"; 
   con.query(sql, function (err, result)
   {
     if (err) throw err;

   
   });

  });

  setTimeout(() => {
    res.redirect('/schedule');
  }, 1000);


});




router.get('/explore', function(req, res, next)
{
  res.render('Explore');

});