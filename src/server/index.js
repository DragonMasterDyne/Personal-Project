require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0')
      massive = require('massive'),
      cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))



const PORT = 3535
app.listen(PORT, () => console.log(`Listing on port: ${PORT}`))