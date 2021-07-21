
var express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(bodyParser.json())

app.use(cors())

const database = {
    users:[
        {
            name:'John',
            email:"john@gmail.com",
            password:'115',
            entries:0,
            joined: new Date()
        } ,

        {
            name:'Salli',
            email:"Sally@gmail.com",
            password:'110',
            entries:0,
            joined: new Date()
        }
    ],

}

app.get('/',(req,res) => {
    res.send(database.users)
})



app.post('/signin',(req,res) => {
    if(req.body.email.length && req.body.password.length > 0){
    let requester = database.users.filter((user) =>{
        return (req.body.email == user.email)
    })
   
    if (req.body.password == requester[0].password ){

        res.json("sucess")
    } 
    else {
        res.status(400).json('error')
    }
}
else {
    res.status(400).json('error')

}

})
app.post('/register',(req,res) => {
    let user = {};
    user.email = req.body.email;
    user.name = req.body.name;
    user.password = req.body.password;
    user.entries = 0;
    user.joined = new Date();
    database.users.push(user);
    console.log(    database.users)
    res.json(database.users[database.users.length-1]);

})

app.get('/profile/:email',(req,res) => {
    const {email} = req.params
    let found = false;
    database.users.forEach((user) => {
        if (user.email == email) {
            found = true;
         return res.json(user);
        }
      
    })

    if(!found) {
        res.status(404).json("no such user")

    }

})


app.put('/img',(req,res) => {
    const {email} = req.body
    let found = false;
    database.users.forEach((user) => {
        if (user.email == email) {
            found = true;
            user.entries++
         return res.json(user.entries);
        }
      
    })

    if(!found) {
        res.status(404).json("no such user")

    }

})

app.listen(3000,()=>{
    console.log('app running')
})

/*
/ res = this is working
/signin => POST success or fail
/register => POST return username
/profile/:userId => GET user
/image PUT

*/