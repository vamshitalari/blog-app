const exp=require('express')
const app=exp()
require('dotenv').config()
const mongoClient=require('mongodb').MongoClient
const cors = require('cors');
const path=require('path')//2 part

app.use(cors());
//add body pasar middleware
app.use(exp.json())

//place rect built in http web server
app.use(exp.static(path.join(__dirname,'../frontend/build')))//connecting of frontend and backend

//3.connect to mongo db server
mongoClient.connect(process.env.DB_URL)//it is stored in .env
.then((client)=>{
    

    //get database onject
    const blogDBobj=client.db('blogapp')

    //get collections obj
    const usersCollections=blogDBobj.collection('users')
    const authorsCollections=blogDBobj.collection('authors')
    const articlesCollection = blogDBobj.collection("articles");

    //share collections with apis
    app.set('usersCollections',usersCollections)
    app.set('authorsCollections',authorsCollections)
    app.set("articlesCollection", articlesCollection);
    console.log('db connected sucessfully')

})
.catch(err=>{console.log('error in db connect',err)})



//import apps
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')

//route the requests 
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)
//after this run node --watch server.js


//error handler --synchronous error 
app.use((err,req,res,next)=>{
    res.send({status:"error!!",message:err.message})
})

const PORT=process.env.PORT ||4000
app.listen(PORT,()=>console.log(`server is reunning on port ${PORT}`))

















//for encyyption oor hashing the password 
//install bcryptjs