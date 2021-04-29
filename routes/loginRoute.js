const express = require('express')
const router = express.Router()
const Login = require('../models/login')


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
	const inputmob=req.body.mobile;
	console.log("mobile ::"+inputmob);
    const checklogin = new Login({
        mobile : req.body.mobile,
        password: req.body.password
    })
console.log(checklogin);
    try{
      const loginfound=await Login.findOne(checklogin);
	  console.log("result::"+checklogin);
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

module.exports = router