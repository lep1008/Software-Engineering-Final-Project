function editBio()
{
    if(document.getElementById("bioButton").value=="Edit Bio")
    {
        document.getElementById('bioDiv').contentEditable = true;
        document.getElementById("bioButton").value="Save Bio";
    }
    else
    {
        document.getElementById('bioDiv').contentEditable = false;
        document.getElementById("bioButton").value="Edit Bio";
        window.alert(document.getElementById('bio').innerHTML);
        var form = document.querySelector('.submitBio');
        window.alert(form);
        form.submit();
    }
}