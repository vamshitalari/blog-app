const exp=require('express')
const authorApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./util')
const expressAsyncHandler=require('express-async-handler')//for error dection of asynchoroncys errrors



// //define routes  this is for testing
// authorApp.get('/test-author',(req,res)=>{
//     res.send('Hello from user app')
// })
let authorsCollections;
let articlesCollection;
authorApp.use((req,res,next)=>{
    authorsCollections=req.app.get('authorsCollections')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

//author registaration
authorApp.use('/user',expressAsyncHandler(createUserOrAuthor))

//user login
authorApp.use('/login',expressAsyncHandler(userOrAuthorLogin))

//to save new article
authorApp.post('/new-article',expressAsyncHandler(async(req,res)=>{

    
    //get new article from client
    const newArticle=req.body;
    //save new Article to articles collection
    await articlesCollection.insertOne(newArticle)
    //send res
    res.send({message:"New article added"})
    
}))


//read artcles by author's username
authorApp.get('/articles/:username',expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const usernameOfAuthor=req.params.username;
    //get articles of current author
    const articlesList=await articlesCollection.find({username:usernameOfAuthor,status:true}).toArray()
    //send res
    res.send({message:"Articles",payload:articlesList})
}))


//edit article
authorApp.put('/article',expressAsyncHandler(async(req,res)=>{

    //get modified article
    const modifiedArticle=req.body;
    
    await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
   
    res.send({message:"Article modified"})

}))


//delete article(soft delete)
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{
    let article=req.body;
    await articlesCollection.updateOne({articleId:article.articleId},{$set:{...article}})
    res.send({message:"Article deleted"})
}))




module.exports=authorApp;