import express from 'express'
const app = express();
import { UserModel , LinkModel , ContentModel } from './db';
import z, { string } from "zod"
import jwt, { JwtPayload } from "jsonwebtoken"
const jwt_secret = "suraj-private"
import mongoose  from 'mongoose';
import { contentSecurityPolicy } from 'helmet';
import  bcrypt, { hash } from "bcrypt"
import random from './utlis';
import cors from "cors";
import { json } from 'body-parser';
import { Request , Response } from 'express';
import dotenv from 'dotenv'

dotenv.config()

app.use(express.json())
app.use(cors())

async function Connect(){
    try{
       if(process.env.CONNECTION_URL){
         await mongoose.connect(process.env.CONNECTION_URL)
         console.log("database connected")

       }
    }
    catch(e)
    {
        console.log(e)
    }
}


Connect()

const corsOptions = {

    origin : process.env.REQURL,


    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));




const Validation = z.object({
    firstname : z.string(),
    lastname : z.string(),
    email : z.string().email(),
    password : z.string()

})

const Authenticate = z.object({
    // firstname : z.string(),
    // lastname : z.string(),
    email : z.string().email(),
    password : z.string()

})





app.post('/api/v1/signup' , async(req , res)=>{

    let body = req.body
    const {success , data , error} = Validation.safeParse(body)


    // console.log(data)

    if(success){
       
        const hashedPassword = await bcrypt.hash(data.password,10)

        try{
            const user = await UserModel.create({
                firstname : data.firstname,
                lastname  : data.lastname,
                email     : req.body.email,
                password  : hashedPassword
            })

            // console.log("User found!!",user)
            const id = user._id
            let token =  jwt.sign({id},jwt_secret)
            console.log(token)
            res.json({tokenReceived : token})

            // console.log(data)

        }
        catch(e){
            
           console.log("error ", e)

        }


    }



})
app.get('/demo' , (req,res)=>{
    res.json({mssg:"demo working"})
})

app.post('/api/v1/signIn' , async(req : Request , res:Response):Promise<void>=>{
    try{
        console.log('Request Body on Vercel:', req.body);
        console.log('JWT Secret on Vercel:', process.env.JWT_SECRET);

        let email = req.body.email;
        let password = req.body.password;

        console.log('Email:', email, 'Password:', password);

        let user = await UserModel.findOne({ email });

        console.log('User found:', user);

        if(!user){
            console.log('No user found - Sending 401');
            res.status(401).json({mssg:"Invalid Credentials no user"});
            return;
        }
        else{
            let success = await bcrypt.compare(password,user.password);
            console.log('Password comparison success:', success);

            if(!success){
                console.log('Incorrect password - Sending 401');
                res.status(401).json({mssg:"Invalid Credentials wrong password"});
                return;
            }
            else{
                console.log('Login successful - Sending token');
                let id = user._id;
                let token = jwt.sign({id} , process.env.JWT_SECRET || 'your-secret-key'); // Ensure fallback
                res.json({token});
                return;
            }
        }
    }
    catch(e){
        console.error('Error during sign in on Vercel:', e);
        res.status(500).json({mssg : 'Internal server error during sign in'}); // Use 500 for unexpected errors
        return;
    }
});

app.post('/api/v1/content' , async(req,res)=>{


    try{
        let link = req.body.link;
        let type = req.body.type;
 

        const token = req.header('Authorization')
        if(token){

            const decoded=  jwt.verify(token,jwt_secret) as {id : string}
         
            let UID = decoded.id.toString();
            console.log(UID)
          if(link!=''&& type!=''){
           await ContentModel.create({
            link,
            type,
            title :  req.body.title,
            userID :  new mongoose.Types.ObjectId(UID),
            tags : [],
            date : req.body.date

            })

            res.json({mssg:"content added"})
        }
        else{
            res.json({mssg:"Fields are empty !!"})
        }


        }
      
        

    }
    catch(e){

        console.log(e)
            
    }
  
  



})

app.get('/api/v1/content' , async(req,res)=>{

    const token = req.header('Authorization')
    console.log(req.header)

    try{
        if(token){
            const decoded = jwt.verify(token,jwt_secret) as {id : string};
            let UID = decoded.id.toString()
            let nid = new mongoose.Types.ObjectId(UID)
            let content = await ContentModel.find({userID : nid}).populate("userID" , "email")
    
            if(content){
                res.json({content})
            }
    
            
        }

    }
    catch(e){
        console.log(e)
    }





})

app.post('/api/v1/share' , async(req,res)=>{


    try{

        const share = req.body.share;
        const token = req.header('Authorization')
    
       
        let nid;
        if(token) {
         let decoded = jwt.verify(token,jwt_secret) as {id:string}
        
         let UserId = decoded?.id.toString();
    
          nid = new mongoose.Types.ObjectId(UserId)

          

       
       let user = await LinkModel.findOne({userId : nid})
       console.log("post link" , user)
       let link
       if(!user){
            console.log("user created")
            link =  await LinkModel.create({
            userId : nid,
            hash : random(10)
        })
       }
        else{

         link = user

         }

         res.json({link : `https://social-share-one.vercel.app/${link.hash}`})
    
        }
   

    }
    catch(e){

        res.json({e})

    }






})

app.delete('/api/v1/content' , async(req,res)=>{
    
    try{

    
     let contentID = req.body.id;
     let token = req.header('Authorization')
     if(token){

        let verification = jwt.verify(token , jwt_secret)
        if(verification){

            let task = await ContentModel.findOneAndDelete({_id : contentID})
            console.log("verify :: ",verification)
            if(task){
               res.json({mssg : "content deleted"})
               return
            }
            else{
                res.status(400).json({mssg:'no content found !'})
                return
            }
       

        }
      
     }
     else{
        res.status(401).json({mssg : 'error in authentication'})
        return
     }
    

    }
    catch(e){

        res.status(403).json({mssg : 'invalid token'})

    }


})







app.get('/api/v1/:sharelink' , async(req,res)=>{

    let hash = req.params.sharelink

  
    console.log(hash)
   
    let user = await LinkModel.findOne({hash});

    console.log(user)

    if(!user){

         res.status(404).json({ message: "Link not found" });

    }
    else{
        try{
            let content = await ContentModel.find({
                userID : user.userId
            })
    
            if(!content){
    
            }
            else{
    
                res.json({content})
    
            }

        }
        catch(e){
            console.log(e)
        }

    }
})


app.listen(3000, ()=>{
    console.log("server started!!" , 3000)
})
