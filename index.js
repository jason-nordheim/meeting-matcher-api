// constants 
const PORT = process.env.PORT || 4000; 
const SECRET = 'TestSecret'; 

// imports 
const database = require('./database'); 
const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

// setup 
const app = express(); 
app.use(cors()); 
app.use(bodyParser.json())

// route functions 
const createUser = (request, response) => {
    const {username, password } = request.body; 
    const securityLevel = 12; 
    bcrypt.hash(password, securityLevel)
    .then(hashedPassword => {
        return database("user").insert({
            username: username, password_digest: hashedPassword
        }).returning('*') // return all results 
        .then(users => {
            response.status(200).json({user: users[0]}); 
        })
    })
}
const getUsers = (request, response) => {
    database("user").select()
    .then(users => {
        response.json({
            user: users 
        }); 
    });
}
const login = (request, response) => {
    const {username, password } = request.body; 
    //lookup user 
    database("user").select().where({username: username}).first()
    .then(user => {
        if(!user) throw new Error("Invalid username"); 
        
        // check if the provided password hashes to the password digest
        return bcrypt.compare(password, user.password_digest) 
        .then(passwordMatched => {
            if(!passwordMatched) throw new Error("Invalid Password")
            return user; 
        });
    }).then(user => { 
        // generate token, because password matches 
        jwt.sign(user, SECRET, (error ,token) => {
            if(error) throw new Error("Problem signing JWT"); 
            response.json({token}); 
        }); 
    })
    .catch(error => response.status(401).json({error: error.message})); 
}

// routes 
app.post('/users', createUser)
app.get('/users', getUsers)
app.post('/login', login)

// listen 
app.listen(PORT, ()=> console.log(`Listeing on port ${PORT}...`))