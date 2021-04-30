const express = require('express')
const router = express.Router()
const Login = require('../models/login')
const crypt = require("./crypt");


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
    const checklogin = new Login({
        _id : undefined,
        mobile : req.body.mobile,
        password: req.body.password
    })
    checklogin._id=undefined;
   console.log(checklogin._id)
    try{
      const loginfound=await Login.findOne(checklogin);
	  console.log("result::"+loginfound);
           res.status(200).json(loginfound)
    }catch(err){
        res.send('Error')
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


function replacer(key,value)
{
    if (key=="_id") return undefined;
    else return value;
}


  

module.exports = router