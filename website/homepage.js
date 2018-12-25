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


function getMacros()
{
  url = urlBase + 'macrosWebsite.' + extension
  // Create the JSON 
  var jsonPayload = '{"userID" : "' + userID + '"}'
  console.log(jsonPayload);


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

              if(results.includes("not") && results.includes("macros"))
              {
                console.log("No entries")
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
              }

            }
          }
        }
        catch(err)
        {
          document.getElementById("getUsername").innerHTML =  "User info incorrect. Try again"
 
        }
}


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