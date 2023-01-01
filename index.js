const { request, response } = require('express')
const mongoose = require('mongoose')
const express = require('express')
const mongoStore = require('connect-mongo')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require("passport")
require('./strategies/local')

const groceriesRoute = require('./routes/groceries')
const marketsRoute = require('./routes/markets')
const authRoute = require('./routes/auth')
require('dotenv').config()
const database = require('../groceries/database/data')
const MongoStore = require('connect-mongo')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded())

app.use(cookieParser())
app.use(session(
    {
    secret:'ghghghjjjbhhhbbhhvh',
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1/medb",
    })
}
))


app.use((req,res,next)=>{
    console.log(`${req.method}:${req.url}`);
    next()
})

app.use(passport.initialize())
app.use(passport.session())


app.use('/api/v1/groceries',groceriesRoute),
app.use('/api/v1/markets', marketsRoute),
app.use('/api/v1/auth', authRoute)

app.listen(PORT, ()=>console.log(`Running Express Server on Port ${PORT}`))

 