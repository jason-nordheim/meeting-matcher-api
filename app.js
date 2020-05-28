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
const db = require("./config/database"); 

//const UserRouter = require('./routes/users') // not needed for now 

/****** setup ******/ 

const app = express()
app.use(cors())
app.use(bodyParser.json()) 


const lookupMeetings = (request, response, next) => {
    const authorization = request.headers.authorization; 
    if (authorization) {
        const encodedToken = authorization.split(' ')[1]
        const decodedToken = jwt.decode(encodedToken) 
        const currentUser = { 
            id: decodedToken.id, 
            username: decodedToken.username 
        } 
        console.log(currentUser) 
    } else {
        response.sendStatus(403).json({error: "Unauthorized"})
    }
}

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
                //res.sendStatus(200).json({ result: users[0]})
                loginUser(username,password, res)
            })
        })
}

const loginUser = (username, password, response) => {
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
                response.json({token}); 
            })
        })
    })
    .catch(error => response.sendStatus(401).json({error})) // unauthorized 
}

const loginUserRoute = (req, res, next) => {
    const {username, password} = req.body; 
    loginUser(username, password, res) 
}


/* Routes */ 
app.post("/users", createUser);
app.post("/login", loginUserRoute)
app.get('/meetings', lookupMeetings)




/* Start listening */ 
app.listen(
    config.port, 
    ()=> console.log(`Meeting Matcher API started. Listening on port ${config.port}...`)
); 