

const express = require("express");

const bodyParser = require("body-parser");

// const request = require("request");
require("dotenv").config();

const https = require("https");

const port = process.env.PORT;

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});




app.post("/", (req, res) => {

    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

console.log(firstName + " " + lastName + " " + email);

const data = {
    members: [
        {
      "email_address": email,
      "status": "subscribed",
      "merge_fields": {
        "FNAME": firstName,
        "LNAME": lastName,
        }
      }
    ] 
}

const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/8795d40288"

const options = {
    method: "POST",
    auth: "will:" + process.env.APIKEY
}

const mailChimpReq = https.request(url, options, (response) => {
   
    if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", (data) => {
        console.log(JSON.parse(data))
    })
})

mailChimpReq.write(jsonData);
mailChimpReq.end();

})

app.post("/failure", (req,res) => {
    res.redirect("/");
})

// 3bb539cd1f15705c9ec62c06cd712997-us14 apikey

// 8795d40288 list id

app.listen(port, () => {
    console.log("server is now running")
});
















// const client = require("mailchimp-marketing");

// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });

// const run = async () => {
//   const response = await client.lists.batchListMembers("list_id", {
//     members: [{}],
//   });
//   console.log(response);
// };

// run();
