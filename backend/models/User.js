const mongoose = require('mongoose');
const {Schema} = mongoose;
var bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name:{
     type : String,
     required : true
    },
    email :{
        type : String,
     required : true,
     unique : true
    },
    password :{
        type : String,
       required : true
    },
    date :{
        type : Date,
        default : Date.now
    },
    role :{
        type : Number,
        default :0
    },
    cart : [
        {
        Name : {
            type : String
        },
        Category : {
            type : String
        },
        Cost : {
            type : Number
        }
    }
    ]
    
  });

  UserSchema.pre('save',async function(next){
    const user = this
    //console.log(user)
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(user.password,salt);
     // console.log("at funct")
        user.password = secpass
    }
    next()
})

  module.exports = mongoose.model('user',UserSchema);