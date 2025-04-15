import mongoose from "mongoose"
import { string } from "zod"

const userSchema = new mongoose.Schema({

    firstname : {
        type : String , 
        required : true , 
        minLength : 2 ,
        maxLength : 10 , 
        trim : true},

    password : {
        type : String , 
        required : true , 
        minLength : 8 , 
        maxLength : 100 , 
        trim : true},

    email : {
        type : String , 
        required : true , 
        trim : true,
        unique : true
    },

    lastname :  {
        type : String,
        required : true,
        minLenght : 3,
        maxLenght : 10,
        trim : true

    } 

})

const content = new mongoose.Schema({
    type :  String,
    title : String,
    link  : String,
    tags  : [{type : mongoose.Types.ObjectId , ref : 'Tag'}],
    userID : {type : mongoose.Types.ObjectId , ref : 'user' , required : true},
    date : String

})

const LinkSchema = new mongoose.Schema({
    hash : String,
    userId : {type:mongoose.Types.ObjectId , ref:'user' , required : true , unique : true}
})




const UserModel = mongoose.model('user' , userSchema)
const LinkModel = mongoose.model('Link' , LinkSchema)
const ContentModel = mongoose.model('content' , content)


export    {
    UserModel ,
    LinkModel, 
    ContentModel
}

