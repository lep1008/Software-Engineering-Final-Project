//Javascript file is used to handle click events for buttons and links 
//The click events officially call the get and post methods
const { post } = require("../../routes");


//Calls the signup get method
function signUp()
{
    location.href='/signup';
}


//Calls the index get method
function index() 
{
    location.href='/';
}

//Calls the explore get method
function explore() {
  location.href='/explore';

}

//Calls the view profile get method
function viewProfile() {
  location.href='/viewProfile';
}


//Calls the logout post method using the logout form's submit
function logout() {
  var form=document.querySelector('.logoutForm');
  form.submit();
}

//Calls the Add workout get method
function workout() {

  location.href="/AddWorkout";


}

//Calls the home feed get method
function home() {
  location.href="/home";
}

//Calls the profile get method
function profile() {
  location.href="/profile";
}


//Calls the schedule get method
function schedule() {
  location.href="/schedule";
}



//Calls the viewer schedule get method
function viewerSchedule() {
  location.href="/viewerSchedule";
}




//referenced: https://gist.github.com/zulhfreelancer/1a1b68062da349d6268f0aaa43991b99 
//Useful trick to display an image that a user uploads on the screen 
function previewFile() {
    var preview = document.querySelector('.profilepic'); //grabs the html image element that the image file will be displayed in
    var file    = document.querySelector('input[type=file]').files[0]; //grabs the file that the user uploaded using the input type file 
    var reader  = new FileReader(); //file reader
    reader.onloadend = function () {
      preview.src = reader.result; //renders the image
    }
    if (file) {
      reader.readAsDataURL(file);
      var form=document.querySelector('.profilePicForm');
      form.submit(); //submits the picture to the database by submitting the form which calls the upload post method
    } 
  }




//views a user profile
  function viewUserProfile() {
    username=event.target.id;
    username='.'+username;
    var form = document.querySelector(username);
      form.submit();
  }