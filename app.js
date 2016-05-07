var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mysql = require("mysql");

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat"
});

var user = {
    insert: "INSERT INTO user(id, username, password) VALUES(0, ?, ?)",
    update: "update user set username, password=? where id=?",
    delete: "delete from user where id=?",
    queryById: "SELECT * from user where id=?",
    queryAll: "select * from user"
};

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/registered.html");
});

app.post("/registered", urlencodedParser, function(req, res) {
    connection.connect();

    res.status(200).send("200").end();

    var userAddsqlParams = [req.body.name, req.body.password];
    
    connection.query(user.insert, userAddsqlParams, function(err, res) {
        if(err) {
            console.log("insert error - :", err.message);
            return;
        } else {
            
        }

        console.log("INSERT ID: ", res);
    });


    connection.end();
});

app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});


var a = null;

function userList () {
    connection.connect();

    connection.query(user.queryAll, function(err, rows, fields) {
        if(err) {
            console.log("update user set- : ", err.message);
            return;
        } else {
        }

        return a = rows;
    });

    connection.end();
}

userList();

app.get("/home", function(req, res) {
    res.sendFile(__dirname + "/home.html");
});

app.get("/formLogin", function(req, res) {
    console.log(req.query);        

    var nameTrue = false;

    for(var i = 0; i < a.length; i++) {
        if(a[i].username == req.query.name) {
                nameTrue = true;
        } 
    } 

    if(nameTrue == true) {
        res.status(200).send("200").end();
    } else {
        res.status(401).send("401").end();
    }

});



var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
});

