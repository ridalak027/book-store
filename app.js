const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const URL = 'mongodb+srv://ridalak027:rida2004@cluster0.ytjp4yt.mongodb.net/ClusterO?retryWrites=true&w=majority'
const m08_app = express()
const userRouter = require('./Routers/users')
const bookRouter = require('./Routers/books')

m08_app.use(bodyParser.json())

const connectDB = async () =>{
    try{
        mongoose.set('strictQuery' , false)
        mongoose.connect(URL)
        console.log('connected to MongoDB')
    }catch(err){
        console.log(err)
        process.exit()
    }
}

connectDB();

m08_app.use('/home',(req,res)=>{
    res.json({message:"hello!"})
})

m08_app.use('/' , userRouter)   // API
m08_app.use('/' , bookRouter)   // API

m08_app.listen(8000)