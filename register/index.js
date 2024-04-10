const express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express ();

dotenv.config();

const port = process.env.port || 3000




const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.xxsxy2z.mongodb.net/regstrationFormDb`,{
    useNewUrlParser : true,
    useUnifiedTopology : true

});

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const registration = mongoose.model("registration",registrationSchema);
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());

app.get("/",(req,res)=>{ 
    res.sendFile(__dirname+"/pages/form.html");
})

app.post("/register",async(req,res)=>{
    try{
         const{name,email,password} = req.body; 
         const existingUser = await registration.findOne({email:email});
         if(!existingUser){
            const registrationSchema = new mongoose.Schema({
                name,
                email,
                password 
            });
           
            await registrationData.save();
            res.redirect("/success");
         }
        else{
            console.log("user already exist");
            rex.redirect("/error");
        }
    }
    catch(error){

        alert("user already exist");
            res.redirect("/error");
    }
});
app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/pages/success.html");
})
app.get("/erroe",(req,res)=>{
    res.sendFile(__dirname+"/pages/error.html");
})
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});