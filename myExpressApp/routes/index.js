//Sets up express application and router
  var express = require('express');
  var router = express.Router();
  module.exports = router;



  //Sets up database connection
  const mysql = require('mysql');
  var con = mysql.createPool
  ({
    host: "localhost",
    user: "root",
    password: "fitfriends488",
    database: "FitFriends"
  });


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


//////////////////////////////////////////////////////////////////////////////////
////////////POST METHODS/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


//Post Login Method
  router.post('/login',function(req,res,next)
  {
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
    blocker=false; //signup button was clicked
    pic='images/profilePic.jpg'; //default profile image is provided
    username = req.body.user; //new user's username is stored
    password = req.body.pass; //new user's password is stored
    name=req.body.name; //new user's full name is stored
    followers=0; //default followers count
    following=0; //default following count
    posts=0; //default posts count
    bio=""//default bio
    //Inserts the new users into the database
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


res.redirect('/'); //go to login screen


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


 

//Gets Profile Page
  router.get("/profile", (req, res) => 
  {
    if(blocker==true) //we do not want people going directly to profile page without logging in or signing up
    {
      res.redirect('/'); //go to login screen
    }
    else
      res.render('profile', {user: username,name: name, pass: password,followers:followers,following:following,posts:posts,bio:bio,pic:pic}); //displays profile page with JSON variables
  });
