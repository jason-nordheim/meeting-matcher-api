// constants 
const PORT = process.env.PORT || 4000; 

// imports 
const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 

// setup 
const app = express(); 
app.use(cors()); 
app.use(bodyParser.json())

// routes 
app.post('/users', createUser)

// route functions 
const createUser = (request, response) => {
    response.json({
        user: "you added a user, yay!"
    }); 
}

// listen 
app.listen(PORT, ()=> console.log(`Listeing on port ${PORT}...`))