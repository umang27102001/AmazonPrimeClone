const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/AmazonPrime');

}
const signInSchema = new mongoose.Schema({
  Email: String,
  Password: String

});
const signUpSchema = new mongoose.Schema({

  name: String,
  Email: String,
  Password: String,
  phone:String

});

const SignIn = mongoose.model('SignIn', signInSchema);
const SignUp = mongoose.model('SignUp', signUpSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

let home=fs.readFileSync('home.html',"utf-8")
let signin=fs.readFileSync('signin.html',"utf-8")
let signup=fs.readFileSync('signup.html',"utf-8")


// ENDPOINTS
app.get('/', (req, res)=>{
    
   
    res.status(200).send(home);
})
app.get('/signin.html', (req, res)=>{
    
   
    res.status(200).send(signin);
})
app.get('/signup.html', (req, res)=>{
    
   
    res.status(200).send(signup);
})


app.post('/signin.html',(req,res)=>{
    res.status(200).send(home);
    const SI = new SignIn(req.body);
    SI.save().then(()=>{
        console.log("SignIn Data saved to the data base")
    }).catch(()=>{
        res.status(400).send("404 Error")
    })

    fs.writeFileSync("SignIn.txt",JSON.stringify(req.body))

    

})

app.post('/signup.html',(req,res)=>{
    res.status(200).send(home)
    const SU = new SignUp(req.body);
    SU.save().then(()=>{
        console.log("SignIn Data saved to the data base")
    }).catch(()=>{
        res.status(400).send("404 Error")
    })
    fs.writeFileSync("SignUp.txt",JSON.stringify(req.body))
    

})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
