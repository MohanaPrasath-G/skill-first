const express = require('express')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors');

dotenv.config({path: './config.env'});


require('./deb/conn');


app.use(cors());

app.use(express.json())

app.use(require('./router/auth'))

app.listen(4000,  ()=>{
    console.log("server connected");
})