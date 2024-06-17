const exp=require('express')
const userApp=exp.Router()
//import util into this file
const {createUserOrAuthor,userOrAuthorLogin}=require('./util')
const expressAsyncHandler=require('express-async-handler')


// //define routes    this for testing
// userApp.get('/test-user',(req,res)=>{
//     res.send('Hello from user app')
// })

//user registaration
userApp.use('/user',createUserOrAuthor)
//user login
userApp.use('/login',userOrAuthorLogin)


let usersCollections;
let articlesCollection;
userApp.use((req,res,next)=>{
    usersCollections=req.app.get('usersCollections')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

// read articles of all authors
userApp.get('/articles',expressAsyncHandler(async(req,res)=>{
    //get all articles of all authors
    const articlesList=await articlesCollection.find({status:true}).toArray()
    res.send({message:"All articles",payload:articlesList})

}))

//write comment for an article by its artioclesID
userApp.post('/comment/:articleId',expressAsyncHandler(async(req,res)=>{

    //get articleId from url
   const articleIdFromURL=(req.params.articleId);
    //get comment obj from req
    const userComment=req.body;
    // console.log(userComment)
    //add usercomment obj as an element to comments array of article document
    await articlesCollection.updateOne({articleId:articleIdFromURL},{$addToSet:{comments:userComment}})
    //send res
    res.send({message:"User comment added"})

}))



module.exports=userApp