//build folder at  /home/ubuntu/elywalls.com/
//db at   ..../elywalls.com/DB

const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

require('colors');
dotenv.config({path: "config.env"});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const poster_routes = require("./routes/posterRoutes");
const user_routes = require("./routes/userRoutes");
app.use("/", poster_routes);
app.use("/", user_routes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('../elyreacts/build'))
    app.get('*',(req,res)=> res.sendFile(path.resolve(
      __dirname,'../elyreacts','build','index.html'
    )))
  }
  
  console.log(path.resolve(
    __dirname,'../elyreacts','build','index.html'
  ))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log("MongoDb error: \n".red.bold, err);
    } else {
        console.log("Mongo Connected".blue.bold);
    }
});

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) {
        console.log("Server not listening: \n".red.bold, err);
    } else {
        console.log(`Server listening at port ${process.env.SERVER_PORT}`.blue.bold);
    }
});
