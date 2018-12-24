
var urlBase = ''

var extension = 'php'

var firstName = ""
var lastName = ""
var userID = 0

function showCreateAccount()
{
  hideOrShow("helloButtons", false)
  hideOrShow("createAccount", true)
  hideOrShow("login", false)
  hideOrShow("text", false)
  hideOrShow("backButton", true)
}

function goHome()
{
  hideOrShow("helloButtons", true)
  hideOrShow("createAccount", false)
  hideOrShow("login", true)
  hideOrShow("text", true)
  hideOrShow("backButton", false)
}

function onLogin()
{
  // Get the username and password 
  var username = document.getElementById('loginUser').value
  var password = document.getElementById('loginPassword').value

  var form = document.getElementById('login')

  var url = urlBase + 'login.' + extension

  // Create the JSON 
  var jsonPayload = '{"username" : "' + username + '", "pw": "' + password + '"}'

      var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
        try
        {
          // Send JSON to PHP Scripts
          xhr.send(jsonPayload);
          xhr.onreadystatechange = function()
          {
            if(this.readyState == 4 && this.status == 200)
            {
              // Get the response from PHP Script
              var res = xhr.responseText

              if(res.includes("Incorrect"))
              {
                return document.getElementById("resultForm").innerHTML =  res
              }
              // Log the user in 
              else
              {
                window.location.href = "homepage.html"
                return;
              }
            }
          }
        }
        catch(err)
        {
          document.getElementById("userAddResult").innerHTML =  "User info incorrect. Try again"
          return
        }
}


// Register Users
function registerNewUser()
{
        document.getElementById("userAddResult").innerHTML =  ""
        var cleanFirstName = document.getElementById('firstName').value      
        var cleanLastName = document.getElementById('lastName').value        
        var cleanEmail = document.getElementById('email').value      
        var cleanUserName = document.getElementById('newUser').value
        var newPassword = document.getElementById('passwordNewUser').value

        // Check for username/password requirements
        if(newPassword.length < 4 && cleanUserName.length < 4)
        {
          alert("Username and Password should be longer than 4 characters. Please Try again")
          return
        }
        else if(newPassword.length < 4)
        {
          alert("Password should be longer than 4 characters. Please Try again")
          return
        }
        else if(newPassword.length > 32)
        {
          alert("Password cannot be loger than 32 charactes. try again")
          return
        }

        if(cleanUserName.length < 4)
        {
          alert("Username should be longer than 4 characters. Please Try again")
          return
        }
        else if(cleanUserName.length > 32)
        {
          alert("Username cannot be loger than 32 charactes.Please try again")
          return
        }

        // Check for empty values
        if(cleanFirstName == "")
        {
          document.getElementById("userAddResult").innerHTML =  "Please enter your first name"
          return
        }
        else if(cleanLastName == "")
        {
          document.getElementById("userAddResult").innerHTML =  "Please enter your last name"
          return
        }
        else if(cleanEmail == "")
        {
          document.getElementById("userAddResult").innerHTML =  "Please enter your email"
          return
        }

        // Create the url 
        var url =   '/loginUser.' + extension

        var jsonPayload = '{"firstName" : "' + cleanFirstName + '", "lastName" : "' + cleanLastName + '", "username" : "' + cleanUserName + '", "pw": "' + newPassword + '", "email" : "' + cleanEmail + '"}';

        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
          xhr.send(jsonPayload)
          xhr.onreadystatechange = function()
          {
            if(this.readyState == 4 && this.status == 200)
            {
              var res = xhr.responseText
              console.log(res)

              if(res.includes("email") || res.includes("username") || res.includes("Error"))
              {
                return document.getElementById("userAddResult").innerHTML =  res
              }
              else
              {
                document.getElementById('userAddResult').innerHTML = "User registered"
                demo()
                hideOrShow("createAccount", false)
                hideOrShow("login", true)
                hideOrShow("text", true)
                hideOrShow("helloButtons", true)

              }
            }
          };
  
        }
        catch(err)
        {
          document.getElementById("userAddResult").innerHTML =  "User could not be registered. Try again.";
          return;
        }
        
}

// Go to sleep
function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo()
{
  await sleep(1000)
}

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