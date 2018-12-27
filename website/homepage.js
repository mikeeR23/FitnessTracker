var urlBase = ''
var extension = 'php'

var firstName = ""
var lastName = ""
var userID = 0
var username = ""
var email = ""
var temp = ""


var calories = 0
var protein = 0
var fat = 0
var carbs = 0

// Buttons
var macrosButton = document.getElementById('enterMacros')
var updateMacros = document.getElementById('updateMacros')
var logoutButton = document.getElementById('logout')

var goal = document.getElementById('displayGoal')
var remaining = document.getElementById('displayRemaining')

function getMacros()
{
  url = urlBase + 'macrosWebsite.' + extension

  // Create the JSON 
  var jsonPayload = '{"userID" : "' + userID + '"}'
  
       var xhrs = new XMLHttpRequest()
        xhrs.open("POST", url, true)
        xhrs.setRequestHeader("Content-type", "application/json; charset=UTF-8")
        try
        {
          // Send JSON to PHP Scripts
          xhrs.send(jsonPayload);
          xhrs.onreadystatechange = function()
          {
            if(this.readyState == 4 && this.status == 200)
            {
              // Get the response from PHP Script
              results = xhrs.responseText

              // Check if the user has entered any macro goals 
              if(results.includes("not") && results.includes("macros"))
              {
                document.getElementById('calories').innerHTML = 0
                document.getElementById('protein').innerHTML =0
                document.getElementById('fat').innerHTML = 0
                document.getElementById('carbs').innerHTML = 0
              }
              else
              {
                var objects = JSON.parse(results);

                calories = objects.calories
                protein = objects.protein
                fat = objects.fat
                carbs = objects.carbs

                document.getElementById('calories').innerHTML = calories
                document.getElementById('protein').innerHTML = protein
                document.getElementById('fat').innerHTML = fat
                document.getElementById('carbs').innerHTML = carbs

                goal.innerHTML = calories
                remaining.innerHTML = calories
              }

            }
          }
        }
        catch(err)
        {
          document.getElementById("getUsername").innerHTML =  "User info incorrect. Try again"
 
        }
}

// On page load display the users macro data 
function getData()
{
  var url = urlBase + 'setData.' + extension
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

        // Parse the json received from php
        var jsonObject = JSON.parse(res)
       
        userID = jsonObject.userID
        firstName = jsonObject.firstName
        lastName = jsonObject.lastName
        email = jsonObject.email
        username = jsonObject.username
        
        //document.getElementById('usersName').innerHTML = jsonObject.firstName + " "  + jsonObject.lastName
        document.getElementById('getUsername').innerHTML = username
        document.getElementById('id').innerHTML = userID

            if(userID > 0)
              getMacros()
            else
              return
      }
    }
  }
  catch(err)
  {
    document.getElementById('getUsername').innerHTML = err
  }
}



// Update macros
macrosButton.addEventListener("click", function(){

  // Get the value the user has entered into input fields
  var calorieInput = document.getElementById('caloriesInput').value
  var proteinInput = document.getElementById('proteinInput').value
  var fatInput = document.getElementById('fatInput').value
  var carbsInput = document.getElementById('carbsInput').value

  // Check if any fields are empty and prompt the user to enter data
  if(calorieInput == '' || proteinInput == '' || fatInput == '' || carbsInput == '')
    return document.getElementById('messageResult').innerHTML = "Please fill out all fields above"

  // Check if the user has entered a number or not
   if(isNaN(calorieInput))
      return document.getElementById('messageResult').innerHTML = "Please enter a number or decimal for Calories field"
   if(isNaN(proteinInput))
      return document.getElementById('messageResult').innerHTML = "Please enter a number or decimal for Protein field"
    if(isNaN(fatInput))
      return document.getElementById('messageResult').innerHTML = "Please enter a number or decimal for Fats field"
    if(isNaN(carbsInput))
      return document.getElementById('messageResult').innerHTML = "Please enter a number or decimal for Carbs field"
   
  // Create the url
  url = urlBase + 'macros.' + extension

  // Create the JSON 
  var jsonPayload = '{"userID" : "' + userID + '", "calories": "' + calorieInput + '", "protein": "' + proteinInput + '", "fat": "' + fatInput + '", "carbs":"' + carbsInput + '"}'
  console.log(jsonPayload)
  var xhrs = new XMLHttpRequest()
  xhrs.open("POST", url, true)
  xhrs.setRequestHeader("Content-type", "application/json; charset=UTF-8")
  try
  {
    // Send JSON to PHP Scripts
    xhrs.send(jsonPayload);
    xhrs.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status == 200)
      {
        // Get the response from PHP Script
        results = xhrs.responseText

        // Error inserting macros
        if(results.includes("Error"))
        {
          document.getElementById('calories').innerHTML = 0
          document.getElementById('protein').innerHTML =0
          document.getElementById('fat').innerHTML = 0
          document.getElementById('carbs').innerHTML = 0

          document.getElementById('messageResult').innerHTML = "Failed to add macros. Please try again"
          return
        }
        // Update query failed 
        else if(results.includes("Failled") && results.includes("update") && results.includes("macros"))
        {
          document.getElementById('messageResult').innerHTML = "Failed to update macros. Please try again"
          return
        }
        // Success
        else
        {
          document.getElementById('calories').innerHTML = calorieInput
          document.getElementById('protein').innerHTML = proteinInput
          document.getElementById('fat').innerHTML = fatInput
          document.getElementById('carbs').innerHTML = carbsInput

          document.getElementById('messageResult').innerHTML = "Successfully updated macros!"
          hideShow()

          return
        }

      }
    }
  }
  catch(err)
  {
    document.getElementById("messageResult").innerHTML =  "Something seriously went wrong"
 
  }
});

// Hide or show the macros form
function hideShow()
{
  var form = document.getElementById('whole-page')

  if(form.classList.contains('show'))
  {
    form.classList.remove('show')
    form.classList.add('hide')
  }
  else if(form.classList.contains('hide'))
  {
    form.classList.remove('hide')
    form.classList.add('show')
  }
}

// Shows or hides the macros form when clicking the update macros button
updateMacros.addEventListener("click", function(){
  hideShow()
})
logoutButton.addEventListener("click", function(){
  window.location.href = "index.html"
})