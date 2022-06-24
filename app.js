//jshint esversion:6
//ANCHOR including packages 
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

//NOTE making an express app
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

//NOTE get method 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
//NOTE post method 
app.post("/", function (req, res) {
    const firstName = String(req.body.fName);
    const lastName = String(req.body.lName);
    const email = String(req.body.email);

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]

    };
    var jsonData = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "amine:2b4b49da32ceec9fc8f1029f61ce5e68-us9"
    }
    const url = "https://us9.api.mailchimp.com/3.0/lists/d44fc58ae3";
    const request = https.request(url, options, function (response) {
        if (response.statusCode == 200) {
            res.sendFile(`${__dirname}/success.html`);
        } else {
            res.sendFile(`${__dirname}/failure.html`);
        }
        response.on("data", function (data) {
            console.log(response.statusCode);
        });
    });
    request.write(jsonData);
    request.end();

});
app.post('/failure',function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT, function () {
    console.log("server is running on port 3000");
});


//API key
//2b4b49da32ceec9fc8f1029f61ce5e68-us9

//Audience ID
//d44fc58ae3