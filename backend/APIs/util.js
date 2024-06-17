//import hassing pass
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();


//both user and admin as same registration so this is common arrea to import into bothb js files
const createUserOrAuthor=async(req,res)=>
{
    
    //get users and author collection
    const usersCollectionObj=req.app.get("usersCollections");
    const authorsCollectionObj=req.app.get("authorsCollections");

    //get user or author
    const user=req.body;

     //check if user is already registered..duplicate user
     if(user.userType==='user')
     {
        //find user y username
        let dbuser =await usersCollectionObj.findOne({username:user.username});
        // if user existed
        if(dbuser!==null){
            return res.send({message:"User already existed"});
        }
       
    }


     //--------------------------------------  


    //author verfication

    if(user.userType==='author')
    {
         //find user y username
         let dbuser =await authorsCollectionObj.findOne({username:user.username});
         // if user existed
        if(dbuser!==null){
           return res.send({message:"author already existed"});
         }
        
    }

    //hash password
    const hashedPassword=await bcryptjs.hash(user.password,7);
    user.password=hashedPassword;
    
    //save user or author
    if(user.userType==='user')
    {
        await usersCollectionObj.insertOne(user);
        
        res.send({message:"User created"});
    }

    if(user.userType==='author')
    {
        await authorsCollectionObj.insertOne(user);
        
        res.send({message:"Author created"});
    }

    
}

//-------------------------------------------


 //if username and password are valid  for login

 const userOrAuthorLogin = async(req, res) => {
    //get users and authors collecion object
 const usersCollectionObj = req.app.get("usersCollections");
 const authorsCollection = req.app.get("authorsCollections");

 //get user or autrhor
 const userCred = req.body;
 //verifuy username of user
 if(userCred.userType==='user'){
   let dbuser=await usersCollectionObj.findOne({username:userCred.username})
   if(dbuser===null){
       return res.send({message:"Invalid username"})
   }
   else{
       let status=await bcryptjs.compare(userCred.password,dbuser.password)
      // console.log("status",status)
       if(status===false){
           return res.send({message:"Invalid password"})
       }
       else{
           //create token
          const signedToken= jwt.sign({username:dbuser.username},"abcde",{expiresIn:"1h"})
          delete dbuser.password;
          res.send({message:"login success",token:signedToken,user:dbuser})
       }
   }
 }
 //verify username of author
 if(userCred.userType==='author'){
   let dbuser=await authorsCollection.findOne({username:userCred.username})
   if(dbuser===null){
       return res.send({message:"Invalid username"})
   }else{
       let status=bcryptjs.compare(userCred.password,dbuser.password)
       if(status===false){
           return res.send({message:"Invalid password"})
       } else{
           //create token
          const signedToken= jwt.sign({username:dbuser.username},"abcde",{expiresIn:50})
          delete dbuser.password;
          res.send({message:"login success",token:signedToken,user:dbuser})
       }
   }
 }

 //if username and password are valid


};







module.exports = {createUserOrAuthor,userOrAuthorLogin};
    
