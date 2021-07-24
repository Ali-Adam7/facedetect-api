
var express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(bodyParser.json())

app.use(cors())
const knex = require('knex')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'aliadam',
      password : '',
      database : 'faceDetect'
    }
  });

  db.select('*').from('users');



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

   res.json("working")
})



app.post('/signin',(req,res) => { // return success for login
    if(req.body.email.length && req.body.password.length > 0){


    db.select('*').from('users').where({
        email:req.body.email
    }).then((users) => {
        if(users.length){
            console.log('someone loged in')
            res.json("sucess")

        }
        else {
            res.status(404).json("Wrong Email or Password")
        }


    })
   
  
}
else {
    res.status(400).json('Email or password field missing')

}

})
app.post('/register',(req,res) => {
    let user = {};
    user.email = req.body.email;
    user.name = req.body.name;
    user.joined = new Date();
    db('users').returning('*').insert(user)
    .then((response) => {
        res.json(response[0])
    })
    .catch(err =>{
        res.status(400).json(err)
    })

})

app.get('/profile/:email',(req,res) => { // returns user
    const {email} = req.params
  db.select('*').from('users').where({
      email : email
  }).then((user) =>{
      if(user.length) {
          res.json(user[0])
      }
      else  {
        res.status(404).json("no such user")

    }

  })

  
})


app.put('/img',(req,res) => { // return count
    const {email} = req.body
    db('users').where('email', '=', email).increment('entries', 1).returning('entries').then((entires) =>{
        res.send(entires);
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('app running')
})

/*
/ res = this is working
/signin => POST success or fail
/register => POST return username
/profile/:userId => GET user
/image PUT

*/