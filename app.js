const epxress = require("express")
let app  = epxress()
const mongoose = require("./db/model/connection");
const bodyParser = require("body-parser");
let cors = require("cors");
const Todorouter = require("./router/todorouter");
const userrouter = require("./router/User");
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())  
app.use("/todo",Todorouter);
app.use("/",userrouter)
app.listen(4000)