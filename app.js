const express = require('express')
const app = express();
app.use(express.static('public'))

const request = require('request')
const https = require('https')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
  console.log("Server is running on 3000")
})

app.get ('/', function(req, res){
res.sendFile(__dirname + "/signup.html")
})



app.post ('/', function (req,res){
  const fName = req.body.firstName
  const lName = req.body.lastName;
  const email = req.body.email;
  console.log(fName, lName, email)

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = 'https://us1.api.mailchimp.com/3.0/lists/90e12fe007/members';

  const options = {
    method: 'POST',
    auth: 'eddie1:f7fbe8f665bb5ecb8802634c3ff0ed8f-us1 '
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData)
  request.end();
})


//API key f7fbe8f665bb5ecb8802634c3ff0ed8f-us1

//list id 90e12fe007
