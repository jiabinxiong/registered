var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mysql = require("mysql");

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});


var logger = morgan("combined");

app.use(express.static("public"));

app.get("/", function(req, res) {
    
    logger(req, res, function(err) {
        console.log(req);
    });


    res.sendFile(__dirname + "/registered.html");
});

app.post("/registered", urlencodedParser, function(req, res) {
    connection.connect();


    var userAddsqlParams = [req.body.name, req.body.password];

    var userAddSql = "INSERT INTO user(id, username, password) VALUES(0, ?, ?)";
    
    connection.query(userAddSql, userAddsqlParams, function(err, res) {
        if(err) {
            console.log("insert error - :", err.message);
            return;
        }

        console.log("INSERT ID: ", res);
    });



    connection.end();
});

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat"
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
});

