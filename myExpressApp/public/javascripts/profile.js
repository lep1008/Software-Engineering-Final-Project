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