require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0')
      massive = require('massive'),
      cors = require('cors');


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then( db =>{
    app.set('db', db)
})


// Auth0 

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENTID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK 
}, function(accessToken, refreshToken, extraParams, profile, done){
    const userData = profile._json;
    const db = app.get('db');
    db.check_user([userData.email]).then( user => {
        if (user[0]){
            return done(null, user[0].email)
        } else {
            return done(null, null)
        }
    }) 
}))
passport.serializeUser(function(email, done){
    done(null, email)
})
passport.deserializeUser(function(email, done){
    const db = app.get('db');
    db.find_session([email]).then(user => {
    done(null, user[0])
    })
})

// Login Endpoints

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/#/'
}))

// Search Endpoints

app.get('/search/:item_name', (req,res) => {
    const db = res.app.get('db')
    const {params} = req
    const item = `%${params.item_name}%`
    db.search_item([item]).then(item => {
        res.status(200).send(item)
    })
})


const PORT = 3535;
app.listen(PORT, () => console.log(`Listing on port: ${PORT}`));