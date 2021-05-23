const keys = require("./keys");
const axios=require('axios')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");


const app = express();

app.use(cors());
app.use(bodyParser.json());


const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (ip varchar,ip_date timestamp default now())")
    .catch(err => console.log("PG ERROR", err));
});


app.get("/", (req, res) => {
  res.send("Hi");
});


app.get("/values/all", (req, res) => {
  function getIp() {
    return axios.get('https://ifconfig.me/ip')
      .then(response => {
        return JSON.stringify(response.data)


      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
  }


  getIp().then(response => {
    pgClient.query("INSERT INTO values(ip) VALUES($1)", [response]);
    console.log('added',response)
    pgClient.query("SELECT * FROM values").then(values=>res.send(values)).catch(err=>res.send(err));
    
  });
  
});

app.listen(5000, err => {
  console.log("Listening");
});
