const mongoose = require('mongoose');

const mongooseurl = 'mongodb://127.0.0.1:27017/vehicle-store'

const connectToMongo = ()=>{
    mongoose.connect(mongooseurl,()=>{
        console.log('connected to db');
    })
}

module.exports=connectToMongo;