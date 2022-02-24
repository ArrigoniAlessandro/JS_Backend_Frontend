var express = require("express");
var cors = require("cors");
var fs = require("fs");
var apiServer = express();
apiServer.use(cors());

var host = "localhost";
var port = 5000;

apiServer.listen(port, host, ()=>{
    console.log("server ---> http://%s:%d", host, port)
})

apiServer.get("/api/login", (req, res) => {
    console.log("ricevuti:", req.query.mail, req.query.password);
    fs.readFile("users.json", (err, data)=> {
        if(err){
            console.log("errore: " + err);
          }else{
              var users = JSON.parse(data);
              for(let i=0; i<users.length; i++){
                  if(req.query.mail == users[i].mail && req.query.password == users[i].password){
                      res.status(200).json({"message":"login effettuato"});
                  }else{
                      res.status(400).json({"message":"login fallito"});
                  }
              }
          }
      });
  });
  