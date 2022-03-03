var express = require("express");
var cors = require("cors");
var fs = require("fs");
const mysql = require("mysql2");
var apiServer = express();
apiServer.use(cors());

var host = "localhost";
var port = 5000;
const connection = mysql.createConnection({
  host: "arrigoni.alessandro.tave.osdb.it",
  user: "c168_arrigoni",
  database: "	c168_arrigoni",
});

apiServer.listen(port, host, () => {
  console.log("server ---> http://%s:%d", host, port);
});

apiServer.get("/api/login", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log("errore: " + err);
    } else {
      var users = JSON.parse(data);
      for (let i = 0; i < users.length; i++) {
        if (
          req.query.mail == users[i].mail &&
          req.query.password == users[i].password
        ) {
          res.status(200).json({ message: "login effettuato" });
        } else {
          res.status(400).json({ message: "login fallito" });
        }
      }
    }
  });
});

apiServer.get("/api/signIn", (req, res) => {
  fs.readFile("users.json", (err, data) => {
    if (err) {
      res.status(400).json({ message: "signIn fallito" });
      console.log("errore: " + err);
    } else {
      var users = JSON.parse(data);
      users.push({ mail: req.query.mail, password: req.query.password });
      users = JSON.stringify(users, null, 3);
      fs.writeFile("users.json", users, function (err) {
        if (err) {
          res.status(400).json({ message: "signIn fallito" });
        }
        res.status(200).json({ message: "signIn effettuato" });
      });
      console.log(users);
    }
  });
});
