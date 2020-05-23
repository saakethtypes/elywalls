const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
require('colors')
dotenv.config({ path: "config.env" });

const app = express()
app.use(bodyParser.json());

const poster_routes = require("./routes/posterRoutes");
const user_routes = require("./routes/userRoutes");

app.use("/", poster_routes);
app.use("/", user_routes);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},(err)=>{
    if(err){
        console.log("MongoDb error: \n".red.bold,err)
    }else{
        console.log("Mongo Connected".blue.bold)
    }
})

app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("Server not listening: \n".red.bold, err)
    }else{
        console.log(`Server listening at port ${process.env.PORT}`.blue.bold)
    }
})