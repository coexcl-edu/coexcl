const express = require('express');
const router = express.Router()
const Login = require('../models/loginModel')
const crypt = require("../common/crypt");
const User = require('../models/userModel')


router.post('/', async(req,res) => {
    const login = new Login({
        mobile : req.body.mobile,
        password: req.body.password
    })
console.log(login);
    try{
      const user=await login.save();
           res.status(200).json(user)
    }catch(err){
        res.send('Error')
    }
})


router.post('/validuser', async(req,res) => {
    const checklogin = {
        mobile : req.body.mobile
       // password: req.body.password
    }
    console.log(req.body.password)
    //console.log(crypt.decryptpwd(req.body.password));
    try{
      const loginfound=await Login.findOne(checklogin);
      if(loginfound== null)
      return res.status(200).json(  outRes={
        response : false,
        status : 401,
        data : "Mobile number not registered. Please do signup and proceed."
    })
     var dbPwd= crypt.decryptpwd(loginfound.password);
      if(req.body.password==dbPwd)
      {
       const userDtls=await User.findOne({mobile: req.body.mobile})

             outRes={
                response : true,
                status : 200,
                data : {
                    userDtls}
            }
      }
    else
        {
            outRes={
                response : false,
                status : 401,
                data : "Wrong password provided."
            }
        }
        console.log(outRes)
        res.status(200).json(outRes)
    }catch(err){
        res.status(500).send('Error')
    }
})

router.post('/reset',async(req,res)=> {


    const queryParam = {
        mobile : req.body.mobile,
    }
    try{
        const userRetrieved = await Login.findOne(queryParam) 
        userRetrieved.password = crypt.encryptpwd(req.body.password)
        const updated = await userRetrieved.save()

        if(updated != null || updated!= undefined)
        outRes={
            response : true,
            status : 200,
            data : "Password reset Successfully."
        }
        else 
        {
            outRes={
                response : true,
                status : 200,
                data : "Failed to reset the password."
            } 
        }

        res.json(outRes)   
    }catch(err){
        res.send('Error')
    }
})


router.post('/change',async(req,res)=> {


    var query = {}

    query['mobile'] =req.body.mobile

    const isuserexist = await Login.findOne(query) 
    if(isuserexist == undefined || isuserexist== null)
    {
        outRes={
            response : true,
            status : 200,
            data : "Invalid phone number."
        }
    }
   else{
    console.log(crypt.decryptpwd(isuserexist.password))

    console.log(req.body.oldpassword)
   // try{
     //   const userRetrieved = await Login.findOne(query) 

        if(req.body.oldpassword != crypt.decryptpwd(isuserexist.password))
        {
            outRes={
                response : true,
                status : 200,
                data : "Old password is incorrect."
            }
        }
        else
        {
        isuserexist.password = crypt.encryptpwd(req.body.newpassword)
        const updated = await isuserexist.save()

        if(updated != null || updated!= undefined)
        outRes={
            response : true,
            status : 200,
            data : "Password changed Successfully."
        }
        else 
        {
            outRes={
                response : true,
                status : 200,
                data : "Failed to change the password."
            } 
        }
    }
   }
        res.json(outRes)   
        
    //}catch(err){
     //   res.send('Error')
   // }
})

  

module.exports = router