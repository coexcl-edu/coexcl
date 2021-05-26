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
      return res.status(401).json(null)
     var dbPwd= crypt.decryptpwd(loginfound.password);
	  console.log("result::"+loginfound);

      console.log("Body Passwrod::"+req.body.password)
      console.log("Pwd::"+loginfound.password)
      console.log("dbPwd::"+crypt.decryptpwd(loginfound.password))
      if(req.body.password==crypt.decryptpwd(loginfound.password))
      {
       const userDtls=await User.findOne({mobile: req.body.mobile})
        const resp={userId: loginfound._id,
             userDtls}

             outRes={
                response : true,
                status : 200,
                data : {
                    userDtls}
            }
           res.status(200).json(outRes)
      }
           else
           {
            outRes={
                response : true,
                status : 401,
                data : "Invaid User"
            }
            res.status(401).json(outRes)
        }
    }catch(err){
        res.status(500).send('Error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const alien = await Login.findById(req.params.id) 
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})


  

module.exports = router