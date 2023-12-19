const mongoose = require('mongoose')

const Schema = mongoose.Schema


const bookScchema = new Schema ({
    name: String,
    author:String,
    Description:String,
    year:String,
    price:Number
})


module.exports = mongoose.model('Books' , bookScchema)