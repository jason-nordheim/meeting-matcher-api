const express = require("express") 
const db = require('../config/database'); 
const router = express.Router()

const createUser = (req, res, next) => {
    throw new Error("Not implemented"); 
}

const getAllUsers = (req, res, next) => {
    db("user").select('*').then(users => res.json({users: users}))
}

router.get("/", getAllUsers); 
router.get("/login", createUser); 

exports.module = router; 