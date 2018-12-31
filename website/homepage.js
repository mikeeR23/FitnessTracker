var urlBase = ''
var extension = 'php'

var firstName = ""
var lastName = ""
var userID = 0
var username = ""
var email = ""
var temp = ""

var px = "px"

var bmargin = 0
var lmargin = 0
var dmargin = 0
var smargin = 0

var bcounter = 0
var lcounter = 0
var dcounter = 0
var scounter = 0

var bSpanCounter = 0
var lSpanCounter = 0
var dSpanCounter = 0
var sSpanCounter = 0

var myMeal = ""
var myLabel = ""
var btn = ""
var myDiv = ""

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

// Get the add food form and hide or show it
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
  getForm('#displayFoodForm')
  setMeal("myBreakfastDiv")
  setMealLabel('#breakfastLabel')
  setButton('#breakfastButton')
})

lunchButton.addEventListener("click", function(){
  getForm('#displayFoodForm')
  setMeal("myLunchDiv")
  setMealLabel('#lunchLabel')
  setButton('#lunchButton')
})

dinnerButton.addEventListener("click", function(){
  getForm('#displayFoodForm')
  setMeal("myDinnerDiv")
  setMealLabel('#dinnerLabel')
  setButton('#dinnerButton')
})

snackButton.addEventListener("click", function(){
  getForm('#displayFoodForm')
  setMeal("mySnackDiv")
  setMealLabel('#snackLabel')
  setButton('#snacksButton')
})

// Cancel button in add food form
document.querySelector('#cancel').addEventListener("click", function(){
  getForm('#displayFoodForm')
})

// Getters and setters 
function setMeal(myMeal)
{
  this.myMeal = myMeal
}

function getMeal()
{
  return myMeal
}

function setMealLabel(myLabel)
{
  this.myLabel = myLabel
}

function getMealLabel()
{
  return myLabel
}

function setButton(btn)
{
  this.btn = btn
}

function getButton()
{
  return btn
}

// Go to index page
logoutButton.addEventListener("click", function(){
  window.location.href = "index.html"
})

// Go to nutrition page
nutritionButton.addEventListener("click", function(){
  window.location.href = "nutrition.html"
})

// Go to workout page
workoutTrackerButton.addEventListener("click", function(){
  window.location.href = "workout.html"
})

// Function to add food to breakfast section
document.querySelector('#displayFoodForm').addEventListener("click", function()
{

// Retrieve Section, divLabel, and the button that was clicked
 var mealDiv =  getMeal()
 var mealLabel = getMealLabel()
 var myButton = getButton()

  // Get the values entered by the user 
  var foodName = document.querySelector('#foodName').value
  var caloriesFood = document.querySelector('#caloriesFood').value
  var proteinFood = document.querySelector('#proteinFood').value
  var fatFood = document.querySelector('#fatFood').value
  var carbsFood = document.querySelector('#carbsFood').value

  // Check for valid entries
  // TODO - Still needs work; if it's an invalid entry, an error message pops up
  // but the data is still inserted 
  doChecks(foodName, caloriesFood, proteinFood, fatFood,carbsFood,
    '#foodName', '#caloriesFood', '#proteinFood', '#fatFood', '#carbsFood')
 
   // Insert a new div right below the breakfast label
  var div = document.createElement('div')

  // Give div an id
  setDiv(mealDiv, div)

  // Give the div a parent
  setParents(mealLabel, div)

  // Add a class to the div
  div.classList.add('labels')

  // Dynamically Create spans 
  var name = document.createElement('span')
  var calorieSpan = document.createElement('span')
  var proteinSpan = document.createElement('span')
  var fatSpan = document.createElement('span')
  var carbSpan = document.createElement('span')

  // Give spans an id
  setSpans(name, calorieSpan, proteinSpan, fatSpan, carbSpan, mealDiv)
  
  // Assign those spans a class 
  name.classList.add('newSpans')
  calorieSpan.classList.add('newSpans')
  proteinSpan.classList.add('newSpans')
  fatSpan.classList.add('newSpans')
  carbSpan.classList.add('newSpans')

  // Give the spans a parent div
  spansParent(div, name, calorieSpan, proteinSpan, fatSpan, carbSpan)

  // Set spans to user data 
  displaySpans(foodName, caloriesFood, proteinFood, fatFood, carbsFood, mealDiv)


  // Formats the buttons and divs on the page to account for all
  // the dynamically created elements
  setMargins(mealDiv, myButton)
})

// Move the Add Food buttons down everytime a new div is inserted 
function setMargins(mealDiv, myButton)
{
  // Initialize the value to empty string
  var res = ''

  // Move the breakfast Add Food button down by 40px
  if(mealDiv == 'myBreakfastDiv')
  {
    bmargin += 40
    res = bmargin.toString().concat(px)
    document.querySelector(myButton).style.marginTop = res
  }
  // Move the lunch Add Food button down by 40px
  else if(mealDiv == 'myLunchDiv')
  {
    lmargin += 40
    res = lmargin.toString().concat(px)
    document.querySelector(myButton).style.marginTop = res
  }
  // Move the dinner Add Food button down by 40px
  else if(mealDiv == 'myDinnerDiv')
  {
    dmargin += 40
    res = dmargin.toString().concat(px)
    document.querySelector(myButton).style.marginTop = res
  }
  // Move the snack Add Food button down by 40px
  else if(mealDiv == 'mySnackDiv')
  {
    smargin += 40
    res = smargin.toString().concat(px)
    document.querySelector(myButton).style.marginTop = res
  }
  else
    return
}

// Append the new div to the parent
function setParents(label, div)
{
  if(label == '#breakfastLabel')
    return document.querySelector('#breakfastLabel').appendChild(div)
  else if(label == '#lunchLabel')
    document.querySelector('#lunchLabel').appendChild(div)
  else if(label == '#dinnerLabel')
    document.querySelector('#dinnerLabel').appendChild(div)
  else if(label == '#snackLabel')
    document.querySelector('#snackLabel').appendChild(div)
  else return
}


// This function gives the div a specific id based on 
// which add Food button was clicked
function setDiv(mealDiv, div)
{
  if(mealDiv == 'myBreakfastDiv')
  {
    div.setAttribute("id", mealDiv + bcounter.toString())
    bcounter++
  }
  else if(mealDiv == 'myLunchDiv')
  {
    div.setAttribute("id", mealDiv + lcounter.toString())
    lcounter++
  }
  else if(mealDiv == 'myDinnerDiv')
  {
    div.setAttribute("id", mealDiv + dcounter.toString())
    dcounter++
  }
  else if(mealDiv == 'mySnackDiv')
  {
    div.setAttribute("id", mealDiv + scounter.toString())
    scounter++
  }
  else
    ;
}

// Gives each newly created span a specific id
function setSpans(name, calorieSpan, proteinSpan, fatSpan, carbSpan, mealDiv)
{
  if(mealDiv == 'myBreakfastDiv')
  {
    name.setAttribute("id", "bname" + bSpanCounter.toString())
    calorieSpan.setAttribute("id", "bcalories" + bSpanCounter.toString())
    proteinSpan.setAttribute("id", "bprotein" + bSpanCounter.toString())
    fatSpan.setAttribute("id", "bfat" + bSpanCounter.toString())
    carbSpan.setAttribute("id", "bcarbs" + bSpanCounter.toString())
  }
  else if(mealDiv == 'myLunchDiv')
  {
    name.setAttribute("id", "lname" + lSpanCounter.toString())
    calorieSpan.setAttribute("id", "lcalories" + lSpanCounter.toString())
    proteinSpan.setAttribute("id", "lprotein" + lSpanCounter.toString())
    fatSpan.setAttribute("id", "lfat" + lSpanCounter.toString())
    carbSpan.setAttribute("id", "lcarbs" + lSpanCounter.toString())
  }
  else if(mealDiv == 'myDinnerDiv')
  {
    name.setAttribute("id", "dname" + dSpanCounter.toString())
    calorieSpan.setAttribute("id", "dcalories" + dSpanCounter.toString())
    proteinSpan.setAttribute("id", "dprotein" + dSpanCounter.toString())
    fatSpan.setAttribute("id", "dfat" + dSpanCounter.toString())
    carbSpan.setAttribute("id", "dcarbs" + dSpanCounter.toString())
  }
  else if(mealDiv == 'mySnackDiv')
  {
    name.setAttribute("id", "sname" + sSpanCounter.toString())
    calorieSpan.setAttribute("id", "scalories" + sSpanCounter.toString())
    proteinSpan.setAttribute("id", "sprotein" + sSpanCounter.toString())
    fatSpan.setAttribute("id", "sfat" + sSpanCounter.toString())
    carbSpan.setAttribute("id", "scarbs" + sSpanCounter.toString())
  }
  
}


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

// Calculates how many calories have been eaten and how many calories remain
// everytime the user adds food, this is updated
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

// Display all the data entered on to the website
function displaySpans(name, calories, protein, fat, carbs ,mealDiv)
{
  
  if(mealDiv == 'myBreakfastDiv')
  {
    document.querySelector('#bname' + bSpanCounter.toString()).innerHTML = name
    document.querySelector('#bcalories' + bSpanCounter.toString()).innerHTML = calories
    document.querySelector('#bprotein' + bSpanCounter.toString()).innerHTML = protein
    document.querySelector('#bfat' + bSpanCounter.toString()).innerHTML = fat
    document.querySelector('#bcarbs' + bSpanCounter.toString()).innerHTML = carbs
    bSpanCounter++
  }
  else if(mealDiv == 'myLunchDiv')
  {
    document.querySelector('#lname' + lSpanCounter.toString()).innerHTML = name
    document.querySelector('#lcalories' + lSpanCounter.toString()).innerHTML = calories
    document.querySelector('#lprotein' + lSpanCounter.toString()).innerHTML = protein
    document.querySelector('#lfat' + lSpanCounter.toString()).innerHTML = fat
    document.querySelector('#lcarbs' + lSpanCounter.toString()).innerHTML = carbs
    lSpanCounter++
  }
   else if(mealDiv == 'myDinnerDiv')
  {
    document.querySelector('#dname' + dSpanCounter.toString()).innerHTML = name
    document.querySelector('#dcalories' + dSpanCounter.toString()).innerHTML = calories
    document.querySelector('#dprotein' + dSpanCounter.toString()).innerHTML = protein
    document.querySelector('#dfat' + dSpanCounter.toString()).innerHTML = fat
    document.querySelector('#dcarbs' + dSpanCounter.toString()).innerHTML = carbs
    dSpanCounter++
  }
   else if(mealDiv == 'mySnackDiv')
  {
    document.querySelector('#sname' + sSpanCounter.toString()).innerHTML = name
    document.querySelector('#scalories' + sSpanCounter.toString()).innerHTML = calories
    document.querySelector('#sprotein' + sSpanCounter.toString()).innerHTML = protein
    document.querySelector('#sfat' + sSpanCounter.toString()).innerHTML = fat
    document.querySelector('#scarbs' + sSpanCounter.toString()).innerHTML = carbs
    sSpanCounter++
  }
  
}

// Give spans a parent
function spansParent(div, name, calories, protein, fat, carbs)
{
  div.appendChild(name)
  div.appendChild(calories)
  div.appendChild(protein)
  div.appendChild(fat)
  div.appendChild(carbs)
}