const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Login = require('../models/loginModel')
const crypt = require("../common/crypt")
const validation = require("../common/validation")

var outRes={}

router.post('/', async(req,res) => {
 var resloaded= false
    if(req.body.email != null && !validation.ValidateEmail(req.body.email))
    {
        resloaded= true
         outRes= {
            response : false,
            status : 409,
            msg : "Invalid email Id."

           } 
    }

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
    //try{
        if(!resloaded)
        {
        const cred= await login.save()

        var academic;
        if(req.body.academics != null )
        {
        academic =
        {
                class: req.body.academics.class,
                rollNo: req.body.academics.rollNo,
                favouriteSubject: req.body.academics.favouriteSubject
            
        }
        }
        else
        {
            academic ={} 
        }

        var personInfo;
        if(req.body.personalInfo != null )
        {
        personInfo =
        {
            fatherName: req.body.personalInfo.fatherName,
            motherName: req.body.personalInfo.motherName,
            bloodGroup: req.body.personalInfo.bloodGroup,
            hobby: req.body.personalInfo.hobby,
            favouriteSport: req.body.personalInfo.favouriteSport,
            gender : req.body.personalInfo.gender,
            parentContact : req.body.personalInfo.parentContact
             
        }
        }
        else
        {
            personInfo =
        {} 
        }

        var schoolInf;
        if(req.body.schoolInfo != null )
        {
            schoolInf =
        {
                schoolName: req.body.schoolInfo.schoolName,
                schoolCode: req.body.schoolInfo.schoolCode,
                city: req.body.schoolInfo.city,
                state: req.body.schoolInfo.state,
                logourl : req.body.schoolInfo.logourl
            
             
        }
        }
        else
        {
            schoolInf =
        {} 
        }



        const userData = new User(
            {
                name:req.body.name,
                mobile: req.body.mobile,
                userid: cred._id,
                subscribed: req.body.subscribed,
                email: req.body.email,
                personalInfo : personInfo,
                academics :academic,
                schoolInfo :schoolInf
            })


         await userData.save() 

         outRes={
            response : true,
            status : 200,
            data : {userid: cred._id}
        }
        
    }
    res.json(outRes)
   // }catch(err){
     //   res.send('Error')
    //}
})

router.patch('/',async(req,res)=> {
 // try{
        const filter = {
            userid : req.body.userid,
        }
        const userInfo = await User.findOne(filter) 

                        if(req.body.personalInfo != undefined)
                        {userInfo.personalInfo.fatherName=req.body.personalInfo.fatherName
                        userInfo.personalInfo.motherName= req.body.personalInfo.motherName
                        userInfo.personalInfo.bloodGroup= req.body.personalInfo.bloodGroup
                        userInfo.personalInfo.hobby= req.body.personalInfo.hobby
                        userInfo.personalInfo.favouriteSport= req.body.personalInfo.favouriteSport
                        userInfo.personalInfo.gender= req.body.personalInfo.gender
                        userInfo.personalInfo.parentContact= req.body.personalInfo.parentContact
                        }
                        if(req.body.academics != undefined)
                        {userInfo.academics.class= req.body.academics.class
                        userInfo.academics.rollNo= req.body.academics.rollNo
                        userInfo.academics.favouriteSubject= req.body.academics.favouriteSubject
                        }
                        if(req.body.schoolInfo != undefined)
                        {
                        userInfo.schoolInfo.schoolName= req.body.schoolInfo.schoolName
                        userInfo.schoolInfo.schoolCode= req.body.schoolInfo.schoolCode
                        userInfo.schoolInfo.city= req.body.schoolInfo.city
                        userInfo.schoolInfo.state= req.body.schoolInfo.state
                        }
                        if(req.body.quizInfo != undefined)
                        {
                        userInfo.quizInfo.lastattempted=req.body.quizInfo.lastattempted
                        if(userInfo.quizInfo.percent==0 || userInfo.quizInfo.percent== null)
                        {
                            console.log("Inside if")
                        userInfo.quizInfo.percent=req.body.quizInfo.percent
                        }
                        else
                        {
                        console.log("Inside else")
                        userInfo.quizInfo.percent=(userInfo.quizInfo.percent+req.body.quizInfo.percent)/2
                        }
                    }

         const ifupdated=await userInfo.save()

         outRes={
            response : true,
            status : 200,
            data : {userid: ifupdated._id}
        }

        res.json(outRes)   
   // }catch(err){
     //   res.send('Error')
    //}

})

module.exports = router