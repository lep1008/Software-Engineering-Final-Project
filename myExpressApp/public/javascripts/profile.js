function editBio()
{
    if(document.getElementById("bioButton").value=="Edit Bio")
    {
        document.getElementById('bio').disabled = false;
        document.getElementById("bioButton").value="Save Bio";
    }
    else
    {

        document.getElementById('bio').disabled = true;
        document.getElementById("bioButton").value="Edit Bio";
        var form = document.querySelector('.submitBio');
        var x=document.getElementById("value");
        x.value=document.getElementById('bio').value;
        form.submit();
   



    }
}


function video()
{
    var input=document.getElementById('idImage');
    var form=document.querySelector('.workoutForm');
    id=event.target.id;
    input.value=id;
    form.submit();

}



function remove() 
{
    id=event.target.id;
    id='.ID'+id
    
   var form= document.querySelector(id)




form.submit();

}




function date() {


   var getAllInvisibleEvents= document.querySelectorAll("[class^=Date]")
 
    if(getAllInvisibleEvents.length>0)
    {
        for(q=0;q<getAllInvisibleEvents.length;q++)
        {
            getAllInvisibleEvents[q].style.display="none";
        }
    }
    var inputDate=document.getElementById('InputDate');
    inputDate.value=event.target.id;
    var red=document.querySelector('.cancel');
    var blue=document.querySelector('.submitScheduleEvent');
    if(red!=undefined) {
    red.setAttribute('class','red');
    blue.setAttribute('class','blue');

    }
    var found=document.getElementsByName('selected');
  
    if(found[0] != undefined)
    {
    found[0].setAttribute('name','null');
    }
    var current=event.target;
    
    current.setAttribute('name','selected');
    var y=document.getElementById('none');

    if(y!=null)
    {
    y.setAttribute('id','addEvent');
    }
    var date=event.target.id;
    var x=document.querySelector('.date');
    x.innerHTML=date;

    var input=document.getElementById('field')

    input.setAttribute('class','workoutEvent');


    var eventList=document.querySelectorAll('.Date'+date);


if(eventList.length>0) {
    for(z=0;z<eventList.length;z++) {
        eventList[z].style.display="block";
}
}


}



function add() {
    var x=document.getElementById('field');

    x.setAttribute('class','workoutEventAppear');


    var red=document.querySelector('.red');
    var blue=document.querySelector('.blue');

    red.setAttribute('class','cancel');
    blue.setAttribute('class','submitScheduleEvent');
}


function cancel() {
  
        var x=document.getElementsByName('selected');
        x[0].click();

 
}







