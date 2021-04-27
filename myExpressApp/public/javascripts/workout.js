//Changes exercise label
function exerciseName()
{
    var lift=document.querySelector('.exercise');
    var label=document.querySelector('.exerciseLabel');
    label.innerHTML=lift.value;
}

//adds another exercise
function addAnotherExercise()
{
    var x=document.querySelector(".button");
    var form=document.querySelector(".exForm");
    x.value='new';
    form.submit();
}

//
function change() 
{
    id=event.target.id;
    var x=document.querySelector(".wName");
    var form=document.querySelector(".workoutForm");
    x.value=id;
    form.submit();
}


