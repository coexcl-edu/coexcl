const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Login = require('../models/login')
const crypt = require("./crypt")

router.get('/', async(req,res) => {
    try{
           const aliens = await User.find()
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:mobile', async(req,res) => {
    try{
        var query = { mobile: req.params.mobile };
        console.log(query)
           const user=await User.findOne(query)
           res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const alien = new User({
        name: req.body.name,
        mobile : req.body.mobile,
        schoolname: req.body.schoolname,
        sub: req.body.subscribed,
        personalInfo :
	{
        "fatherName" :req.body.personalInfo.fatherName,
        "motherName" :req.body.personalInfo.motherName,
        "bloodGroup":req.body.personalInfo.bloodGroup,
        "hobby":req.body.personalInfo.hobby,
        "favouriteSport":req.body.personalInfo.favouriteSport
    },
    academics :
	{
        "schoolName" :req.body.academics.schoolName,
        "class" :req.body.academics.class,
        "rollNo":req.body.academics.rollNo,
        "favouriteSubject":req.body.academics.favouriteSubject
    }
    })

    const login =new Login(
        {
            mobile : req.body.mobile,
            password : crypt.encryptpwd(req.body.password)
        }
    )

    //try{
        await login.save()
        const a1 =  await alien.save() 
        res.json(a1)
    //}catch(err){
     //   res.send('Error')
   // }
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