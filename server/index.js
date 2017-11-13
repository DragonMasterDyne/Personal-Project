require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0')
      massive = require('massive'),
      cors = require('cors'),
      axios = require('axios');


const app = express();

app.use( express.static( `${__dirname}/../build` ) );

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

// Check on nodeMailer

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

app.get('/auth/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/dashboard',
    failureRedirect: '/login?access=unauthorized'
}))

app.get('/auth/me', (req, res) => {
    if (req.user) {
        return res.status(200).send(req.user)
    } else {
        return res.status(401).send('Need to log in.')
    }
})

// Search Endpoint

app.get('/search/:item_name', (req,res) => {
    const db = res.app.get('db');
    const {params} = req;
    const item = `%${params.item_name}%`;
    db.search_item([item]).then(item => {
        res.status(200).send(item);
    })
})

app.get('/search/api/:item_name', (req,res) => {
    const db = res.app.get('db');
    const {params} = req;
    let apiSearch = axios.get(`http://api.walmartlabs.com/v1/search?query=${params.item_name}&format=json&apiKey=a65y3j4vbdxjzswbscxaggeb`);
    apiSearch.then(item => {
            item.data.items.forEach((e) => {
            e.cost = 0
            e.quantity = 0
            e.vendor = ''
        })
        res.status(200).send(item.data)
    });
    
})

app.get('/api/users', (req, res) => {
    const db = app.get('db');
    db.get_users().then(users => {
        res.status(200).send(users);
    })
})

app.get('/search/item/cat/:cat_type', (req,res) => {
    const db = app.get('db');
    const {cat_type} = req.params
    db.search_cat([cat_type]).then(item => {
        res.status(200).send(item)
    })
})

// Create Endpoints

app.post('/create/item', (req,res) => {
    const db = res.app.get('db');
    const {itemName, upc, cost, retail, quantity, vendor} = req.body;
    db.create_item([itemName, upc, cost, retail, quantity, vendor])
    .then( (id) => res.status(200).send());
});

app.post('/create/user', (req,res) => {
    const db = res.app.get('db');
    const {name, email} = req.body
    db.create_user([name, email])
    .then( () => { 
        db.get_users().then( (users) => res.status(200).send(users))
    }) 
})

app.post('/create/item/api', (req,res) => {
    const db = res.app.get('db');
    const {itemName, upc, cost, retail, quantity, vendor} = req.body
    db.create_item([itemName, upc, cost, retail, quantity, vendor])
    .then( (id) => res.status(200).send(id))
})

// Update Endpoints

app.get('/update/:id', (req,res) => {
    const db = res.app.get('db');
    const {params} = req;
    const item = `${params.id}`;
    db.search_update([item]).then(item => {
        res.status(200).send(item);
    });
});

app.put('/update/item', (req, res) => {
    const db = res.app.get('db');
    const {id, itemName, upc, cost, retail, quantity, vendor} = req.body;
    db.update_item([id, itemName, upc, cost, retail, quantity, vendor])
    .then( () => res.status(200).send() )
})

// Delete Endpoints

app.delete('/delete/item/:id', (req, res) => {
    const db = res.app.get('db');
    const {params} = req;
    db.delete_item([params.id])
    .then( () => res.status(200).send())
})

app.delete('/delete/user/:email', (req, res) => {
    const db = res.app.get('db');
    const {params} = req;
    db.delete_user([params.email])
    .then( () => res.status(200).send())
})

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 3535;
app.listen(PORT, () => console.log(`Listing on port: ${PORT}`));