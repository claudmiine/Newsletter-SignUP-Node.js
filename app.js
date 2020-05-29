const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
 
// initialize a new Express app.
const app = express();
// necessary code for body-parser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
  });

app.post("/", (req, res) =>{
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us18.api.mailchimp.com/3.0/lists/4cab014bcc'
    const options = {
        method: "POST",
        auth: "claudmiine:64094b7c197af051e8a143c0ede1e5af-us18"
    }

    const request = https.request(url, options, function(response) {
        
        if (response.statusCode === 200) {
             res.sendFile(__dirname + "/success.html"); 
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
          console.log(JSON.parse(data));
          });
        });
     // request.write(jsonData);
      request.end();
    });

    app.post("/failure", (req, res) =>{
       res.redirect("/")
    })

app.listen(process.env.PORT || 3000, () =>{
    console.log("server is up on port 3000.");
})


//  API KEY 10506e52f9543638d225757217de2c64-us18
// LIST ID  4cab014bcc
