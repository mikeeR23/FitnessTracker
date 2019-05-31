




var quickStart = document.querySelector('#startWorkout')
var cancelWorkout = document.querySelector('#cancelWorkout')
var bodyPartButton = document.querySelector('#getBodyPart')

var bodyPart = ''


bodyPartButton.addEventListener("click", function(){
	bodyPart = document.querySelector('#bodyPart').value

})


quickStart.addEventListener("click", function(){
	hideOrShow("quickStartDiv", false)
	hideOrShow("addWorkout", true)

})

cancelWorkout.addEventListener("click", function(){
	hideOrShow("quickStartDiv", true)
	hideOrShow("addWorkout", false)
})


function hideOrShow( elementId, showState )
{
  var vis = "visible";
  var dis = "block";
  if( !showState )
  {
    vis = "hidden";
    dis = "none";
  }

  document.getElementById( elementId ).style.visibility = vis;
  document.getElementById( elementId ).style.display = dis;
}