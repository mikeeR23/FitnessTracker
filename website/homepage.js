

var urlBase = ''
var extension = 'php'

var firstName = ""
var lastName = ""
var userID = 0
var username = ""
var email = ""


	var url = urlBase + 'setData.' + extension
	console.log(url)
	var jsonPayload = '{"" : "' + firstName + '"}'

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
              var jsonObject = JSON.parse(res);
              

              document.getElementById('usersName').innerHTML = jsonObject.firstName + " "  + jsonObject.lastName
            }
            else
            {
            	document.getElementById('usersName').innerHTML = "error"
            }
          }
        }
        catch(err)
        {
          document.getElementById('usersName').innerHTML = err
        }
	


