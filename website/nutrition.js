var urlBase = ''
var extension = 'php'
var temp = ""

var caloriesGoal = 0
var fatGoal = 0
var proteinGoal = 0
var carbsGoal = 0

var displayProtein = 0
var displayFat = 0
var displayCarbs = 0

var proteinRemaining = ''
var fatRemaining = ''
var carbsRemaining = ''


// On page load display the users goal macros  
function getDataa()
{
  var url = urlBase + 'foods.' + extension
  var jsonPayload = '{"" : "' +  temp  + '"}'

  var xhr = new XMLHttpRequest()
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
  try
  {
    xhr.send(jsonPayload);
    xhr.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status == 200)
      {
        // Get the response from PHP Script
        var res = xhr.responseText
       // console.log("food: " + res)

        // Parse the json received from php
        var jsonObject = JSON.parse(res)
       	//console.log("food1: " + jsonObject.calories)
       	caloriesGoal = jsonObject.calories
       	proteinGoal = jsonObject.protein
       	fatGoal = jsonObject.fat
       	carbsGoal = jsonObject.carbs

       	document.querySelector('#goalProtein').innerHTML = proteinGoal
       	document.querySelector('#goalCarbs').innerHTML = carbsGoal
       	document.querySelector('#goalFat').innerHTML = fatGoal
      }
    }
  }
  catch(err)
  {
    document.getElementById('getUsername').innerHTML = err
  }
}

// Nutrition page - Gets the current amount of fat, protein, and carbs 
// Called on page load
function getMoreData()
{
  var url = urlBase + 'CurrentMacros.' + extension
  //var jsonPayload = '{"" : "' +  temp  + '"}'

  var xhr = new XMLHttpRequest()
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
  try
  {
    xhr.send();
    xhr.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status == 200)
      {
        // Get the response from PHP Script
        var res1 = xhr.responseText
        //console.log(res1)

        // Parse the json received from php
        var jsonObject1 = JSON.parse(res1)
        //console.log(jsonObject1)

        displayProtein = jsonObject1.currentProtein
        displayFat = jsonObject1.currentFat
        displayCarbs = jsonObject1.currentCarbs

        document.querySelector('#totalProtein').textContent = displayProtein
        document.querySelector('#totalFat').textContent = displayFat
        document.querySelector('#totalCarbs').textContent = displayCarbs

        calculateRemaining()
      }
    }
  }
  catch(err)
  {
    console.log("error")
    //document.getElementById('getUsername').innerHTML = err
  }
}

function calculateRemaining()
{
  document.querySelector('#leftProtein').textContent = proteinGoal - displayProtein
  document.querySelector('#leftFat').textContent = fatGoal - displayFat
  document.querySelector('#leftCarbs').textContent = carbsGoal - displayCarbs
  
}
