const express = require('express');
const User = require('./Database/User');
const GOMATO = require('./Database/GOMATO')
const cors = require('cors');
require('dotenv').config()

require('./Database/config');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/create', require('./Routers/CreateUser'));
app.use('/create', require('./Routers/Login'));
app.use('/create', require('./Routers/DisplayData'));
app.use('/create', require('./Routers/OrderData'));




app.listen(process.env.PORT || 5000,()=>{
    console.log('This is running on 5000 port...');
});

