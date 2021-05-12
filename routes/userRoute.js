const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Login = require('../models/loginModel')
const crypt = require("../common/crypt")
const validation = require("../common/validation")

var outRes={}

router.post('/', async(req,res) => {
 var resloaded= false
    if(!validation.ValidateEmail(req.body.email))
    {
        resloaded= true
         outRes= {
            response : false,
            status : 409,
            msg : "Invalid email Id."

           } 
          //  res.status(409).json(outRes);
          //  return;
    }

    const alien = new User(
        {
            name:req.body.name,
            mobile: req.body.mobile,
            subscribed: req.body.subscribed,
            email: req.body.email,
            personalInfo :
                    {
                        fatherName: req.body.personalInfo.fatherName,
                        motherName: req.body.personalInfo.motherName,
                        bloodGroup: req.body.personalInfo.bloodGroup,
                        hobby: req.body.personalInfo.hobby,
                        favouriteSport: req.body.personalInfo.favouriteSport
                    },
            academics :
                    {
                        class: req.body.academics.class,
                        rollNo: req.body.academics.rollNo,
                        favouriteSubject: req.body.academics.favouriteSubject
                    },
            schoolInfo :
                    {
                        schoolName: req.body.schoolInfo.schoolName,
                        schoolCode: req.body.schoolInfo.schoolCode,
                        city: req.body.schoolInfo.city,
                        state: req.body.schoolInfo.state
                    }
        
        })


    const checkUser={
        mobile: req.body.mobile
    }


    const login =new Login(
        {
            mobile : req.body.mobile,
            password : crypt.encryptpwd(req.body.password)
        }
    )

    
    await User.countDocuments(checkUser, function (err, count){ 
        
        if(count>0)
        {
            console.log(count)
            resloaded= true
            outRes= 
            {
                response : false,
                status : 409,
                msg : "Number already registered."
            } 
        }
      //  res.status(409).json(outRes);
      //  return;
    }); 
    console.log(resloaded)
    try{
        if(!resloaded)
        {
            console.log("before creation")
        const cred= await login.save()
         await alien.save() 

         outRes={
            response : true,
            status : 200,
            data : {userid: cred._id}
        }
        
    }
    res.json(outRes)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const alien = await Alien.findById(req.params.id) 
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

module.exports = router