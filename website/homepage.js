var urlBase = ''
var extension = 'php'

var firstName = ""
var lastName = ""
var userID = 0
var username = ""
var email = ""
var temp = ""

var margin = 0
var px = "px"

var breakfastDivs = "myBreakfastDiv"
var counter = 0
var spanCounter = 0




var calories = 0
var protein = 0
var fat = 0
var carbs = 0

// Buttons
var macrosButton = document.getElementById('enterMacros')
var updateMacros = document.getElementById('updateMacros')
var logoutButton = document.getElementById('logout')
var nutritionButton = document.querySelector('#nutritionButton')
var workoutTrackButton = document.querySelector('#workoutTrackerButton')
var breakfastButton = document.querySelector('#breakfastButton')
var lunchButton = document.querySelector('#lunchButton')
var dinnerButton = document.querySelector('#dinnerButton')
var snackButton = document.querySelector('#snacksButton')

var goal = document.getElementById('displayGoal')
var remaining = document.getElementById('displayRemaining')
var displayFood = document.getElementById('displayFood')

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
          //hideShow()

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


// Hide or show a div
function hide_Show(form)
{
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

function getForm(formElement)
{

  var form = document.querySelector(formElement)
  hide_Show(form)
}

// Shows or hides the macros form when clicking the update macros button
updateMacros.addEventListener("click", function(){
  getForm('#whole-page')
})

breakfastButton.addEventListener("click", function(){
  getForm('#enterBreakfast')
 // breakfast()
})

lunchButton.addEventListener("click", function(){
  getForm('#enterBreakfast')
})

dinnerButton.addEventListener("click", function(){
  getForm('#enterBreakfast')
})

snackButton.addEventListener("click", function(){
  getForm('#enterBreakfast')
})


document.querySelector('#cancel').addEventListener("click", function(){
  getForm('#enterBreakfast')
})


logoutButton.addEventListener("click", function(){
  window.location.href = "index.html"
})

nutritionButton.addEventListener("click", function(){
  window.location.href = "nutrition.html"
})

workoutTrackerButton.addEventListener("click", function(){
  window.location.href = "workout.html"
})

// Function to add food to breakfast section
document.getElementById('enterFoodBreakfast').addEventListener("click", function()
{

  // Get the values entered by the user 
  var foodName = document.querySelector('#foodName').value
  var caloriesFood = document.querySelector('#caloriesFood').value
  var proteinFood = document.querySelector('#proteinFood').value
  var fatFood = document.querySelector('#fatFood').value
  var carbsFood = document.querySelector('#carbsFood').value

  doChecks(foodName, caloriesFood, proteinFood, fatFood,carbsFood,
    '#foodName', '#caloriesFood', '#proteinFood', '#fatFood', '#carbsFood')
 
   
   // Insert a new div right below the breakfast label
  var div = document.createElement('div')

  // Give the divs an id to reference them by
  div.setAttribute("id", breakfastDivs)
  
  // This adds a number to the myDiv id giving each
  // div a unique id. Converts the counter to string
  breakfastDivs.concat(counter.toString())

  // Add a class to the div
  div.classList.add('labels')

  // Give the div a parent
  document.getElementById('breakfastLabel').appendChild(div)

  // Dynamically Create spans 
  var name = document.createElement('span')
  var calorieSpan = document.createElement('span')
  var proteinSpan = document.createElement('span')
  var fatSpan = document.createElement('span')
  var carbSpan = document.createElement('span')

  // Give all the newly created spans, unique ids
  name.setAttribute("id", "name" + spanCounter.toString())
  calorieSpan.setAttribute("id", "calories" + spanCounter.toString())
  proteinSpan.setAttribute("id", "protein" + spanCounter.toString())
  fatSpan.setAttribute("id", "fat" + spanCounter.toString())
  carbSpan.setAttribute("id", "carbs" + spanCounter.toString())

  name.classList.add('newSpans')
  calorieSpan.classList.add('newSpans')
  proteinSpan.classList.add('newSpans')
  fatSpan.classList.add('newSpans')
  carbSpan.classList.add('newSpans')

  // Give the spans a parent div
  helperAppend(div, name, calorieSpan, proteinSpan, fatSpan, carbSpan)

  // Set spans to user data 
  helper('#name', '#calories', '#protein', '#fat', '#carbs', spanCounter, foodName, caloriesFood, 
    proteinFood, fatFood, carbsFood)

  spanCounter++;

  // Add 30 to margin-top everytime a food item is added
  margin += 30
  var res = margin.toString().concat(px)
  document.querySelector('#breakfastButton').style.marginTop = res

})


function doChecks(foodName, caloriesFood, proteinFood, fatFood, carbsFood,
  foodID, caloriesID, proteinID, fatID, carbsID)
{
  // Clear input fields
  document.querySelector(foodID).value = ""
  document.querySelector(caloriesID).value = ""
  document.querySelector(proteinID).value = ""
  document.querySelector(fatID).value = ""
  document.querySelector(carbsID).value = ""

   // Check if any fields are empty and prompt the user to enter data
  if(foodName == '' || caloriesFood == '' || proteinFood == '' || fatFood == '' || carbsFood == '')
    return document.getElementById('foodMessage').innerHTML = "Please fill out all fields above"

  // Check if the user has entered a number or not
  if(isNaN(caloriesFood))
    return document.getElementById('foodMessage').innerHTML = "Please enter a number or decimal for Calories field"
  if(isNaN(proteinFood))
    return document.getElementById('foodMessage').innerHTML = "Please enter a number or decimal for Protein field"
  if(isNaN(fatFood))
    return document.getElementById('foodMessage').innerHTML = "Please enter a number or decimal for Fats field"
  if(isNaN(carbsFood))
    return document.getElementById('foodMessage').innerHTML = "Please enter a number or decimal for Carbs field"

  doFoodCalulations(caloriesFood)
  return
}


function doFoodCalulations(addCalories)
{
  var goal1 = parseInt(displayGoal.textContent)
  var remaining1 = parseInt(displayRemaining.textContent)
  var displayFood1 = parseInt(displayFood.textContent)
  addCalories = parseInt(addCalories)

  displayFood1 += addCalories
  displayFood.innerHTML = displayFood1

  remaining1 = goal1 - displayFood1
  displayRemaining.textContent = remaining1
  return

}

function helper(first, second, third, fourth, fifth, counter, 
  name, calories, protein, fat, carbs)
{
  document.querySelector(first + counter.toString()).innerHTML = name
  document.querySelector(second + counter.toString()).innerHTML = calories
  document.querySelector(third + counter.toString()).innerHTML = protein
  document.querySelector(fourth + counter.toString()).innerHTML = fat
  document.querySelector(fifth + counter.toString()).innerHTML = carbs
}

function helperAppend(div, name, calories, protein, fat, carbs)
{
  div.appendChild(name)
  div.appendChild(calories)
  div.appendChild(protein)
  div.appendChild(fat)
  div.appendChild(carbs)
}