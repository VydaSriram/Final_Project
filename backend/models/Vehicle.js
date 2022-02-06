const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({
   user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'user',
      default : 0
   } ,
     name : {
     type : String,
     required : true
    },
    Type :{
        type : String,
     required : true
    },
    cost:{
        type : Number,
        required : true
    },
    date :{
        type : Date,
        default : Date.now
    },
    issold :{
        type : Boolean,
        default : false
    }
  });

  module.exports = mongoose.model('vehicles',VehicleSchema);