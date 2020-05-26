// constants 
const PORT = process.env.PORT || 4000; 

// imports 
const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const database = require('./database'); 

// setup 
const app = express(); 
app.use(cors()); 
app.use(bodyParser.json())

// route functions 
const createUser = (request, response) => {
    response.json({
        user: "you added a user, yay!"
    }); 
}
const getUsers = (request, response) => {
    database("user").select()
    .then(users => {
        response.json({
            user: users 
        }); 
    });
}

// routes 
app.post('/users', createUser)
app.get('/users', getUsers)

// listen 
app.listen(PORT, ()=> console.log(`Listeing on port ${PORT}...`))