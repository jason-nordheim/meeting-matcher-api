// configuration and external packages/libraries 
const config = { 
    port: process.env.PORT || 4000, 
    hashComplexity: 12, 
    secret: "fakeSecret"
}
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); 
const bodyParser = require('body-parser')
const express = require('express')
const db = require('./config/database')
//const UserRouter = require('./routes/users') 

// setup 
const app = express()
app.use(cors())
app.use(bodyParser.json()) 


const createUser = (req, res, next) => {
    const {username, password} = req.body; 
    
    // hash the password: 
    bcrypt.hash(password, config.hashComplexity)
        .then(hashedPassword => {
            console.log(hashedPassword); 
            return db("user").insert({
                username: username, 
                password_digest: hashedPassword
            })
            .returning("*")
            .then(users => {
                console.log(users)
                res.sendStatus(200) 
            })
        })
}
const loginUser = (req, res, next) => {
    const {username, password} = req.body; 
    db("user")
        .select()
        .where({username: username})
        .first()
        .then(user => {
            if(!user) throw new Error("Invalid Username")
            /* check to see if their password matches, returns true/false */ 
            return bcrypt.compare(password, user.password_digest) 
            .then(passwordMatches => {
                if(!passwordMatches) throw new Error("Invalid Password") 
                /* password matches */ 
                jwt.sign(user, config.secret, (error, token) => {
                    if(error) throw new Error("Unable to sign") 
                    res.json({token}); 
                })
            })
        })
        .catch(error => res.sendStatus(401).json({error})) // unauthorized 
}

app.post("/users", createUser);
app.post("/login", loginUser)

app.listen(
    config.port, 
    ()=> console.log(`Meeting Matcher API started. Listening on port ${config.port}...`)
); 