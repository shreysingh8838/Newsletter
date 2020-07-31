const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.post("/", function(req,res){
  var firstName = req.body.fName
  var lastName = req.body.lName
  var email = req.body.email

  var data = {
    members : [{
      email_address : email,
      status : "subscribed",
      merge_fields : {
        FNAME : firstName,
        LNAME : lastName
      }
    }]
  }
 const jsonData = JSON.stringify(data)
 const url = "https://us17.api.mailchimp.com/3.0/lists/0d86d5a828"
 const options = {
   method : "POST",
   auth : "shrey1:619c4d11ff7e2eef98ebf26a52b90eda-us17"
 }
 const request =  https.request(url, options, function(response){
   if(response.statusCode == 200){
     res.sendFile(__dirname + "/success.html")
   }
   else{
     res.sendFile(__dirname + "/failure.html")
   }


     response.on("data",function(data){
     console.log(JSON.parse(data))
     })
 })
 request.write(jsonData)
 request.end()
})

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/failure", function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000 , function(){
  console.log("Server is running on port 3000")
})


// API KEY
//619c4d11ff7e2eef98ebf26a52b90eda-us17

// listid
//0d86d5a828
