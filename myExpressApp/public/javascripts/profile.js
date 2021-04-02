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