const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Login = require('../models/loginModel')
const crypt = require("../common/crypt")
const validation = require("../common/validation")
const Multer = require('multer')
const { Storage } = require("@google-cloud/storage")



 const storage = new Storage(
     {
         projectId :"coexclapi",
         keyFile :"C:\Users\ravkusha\Downloads\coexclapi-b71c027d99ad.json"
     }
 )   

const bucket = storage.bucket("coexclbucket")
const multer = Multer ({
    storage : Multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 *1024
    }
})

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

router.put('/',async(req,res)=> {
  try{
        const filter = {
            userid : req.body.userid,
        }
        console.log(filter);
        const userInfo = await User.findOne(filter) 

        console.log(userInfo);

                        if(req.body.personalInfo != undefined)
                        {
                        if(req.body.personalInfo.fatherName!= undefined)
                        userInfo.personalInfo.fatherName=req.body.personalInfo.fatherName
                        if(req.body.personalInfo.motherName!= undefined)
                        userInfo.personalInfo.motherName= req.body.personalInfo.motherName
                        if(req.body.personalInfo.bloodGroup!= undefined)
                        userInfo.personalInfo.bloodGroup= req.body.personalInfo.bloodGroup
                        if(req.body.personalInfo.hobby!= undefined)
                        userInfo.personalInfo.hobby= req.body.personalInfo.hobby
                        if(req.body.personalInfo.favouriteSport!= undefined)
                        userInfo.personalInfo.favouriteSport= req.body.personalInfo.favouriteSport
                        if(req.body.personalInfo.gender!= undefined)
                        userInfo.personalInfo.gender= req.body.personalInfo.gender
                        if(req.body.personalInfo.parentContact!= undefined)
                        userInfo.personalInfo.parentContact= req.body.personalInfo.parentContact
                    }

                    if(req.body.academics != undefined)
                    {
                        if( req.body.academics.class!= undefined)
                        userInfo.academics.class= req.body.academics.class
                        if(req.body.academics.rollNo!= undefined)
                        userInfo.academics.rollNo= req.body.academics.rollNo
                        if(req.body.academics.favouriteSubject!= undefined)
                        userInfo.academics.favouriteSubject= req.body.academics.favouriteSubject
                    }

                    if(req.body.schoolInfo != undefined)
                    {
                        if(req.body.schoolInfo.schoolName!= undefined)
                        userInfo.schoolInfo.schoolName= req.body.schoolInfo.schoolName
                        if(req.body.schoolInfo.schoolCode!= undefined)
                        userInfo.schoolInfo.schoolCode= req.body.schoolInfo.schoolCode
                        if(req.body.schoolInfo.city!= undefined)
                        userInfo.schoolInfo.city= req.body.schoolInfo.city
                        if(req.body.schoolInfo.state!= undefined)
                        userInfo.schoolInfo.state= req.body.schoolInfo.state
                    }

                    if(req.body.quizInfo != undefined)
                    {
                        if(req.body.quizInfo.lastattempted!= undefined)
                        userInfo.quizInfo.lastattempted=req.body.quizInfo.lastattempted
                        if(req.body.quizInfo.percent != undefined)
                        {
                        if(userInfo.quizInfo.percent==0 || userInfo.quizInfo.percent== null)
                        {
                        userInfo.quizInfo.percent=req.body.quizInfo.percent
                        }
                        else
                        {
                        userInfo.quizInfo.percent=(userInfo.quizInfo.percent+req.body.quizInfo.percent)/2
                        }
                    }
                }
                        

         const ifupdated=await userInfo.save()

         outRes={
            response : true,
            status : 200,
            data : {userDtls: ifupdated}
        }

        res.json(outRes)   
    }catch(err){
        res.send('Error')
    }

})


router.get("/leaderboard/:count",async(req, res)=> {

    const doccount= parseInt(req.params.count,10)
    const resp =await User.find({},{'_id':-1})
    .select('quizInfo.percent as percent')
    .select('name')
    .where('quizInfo.percent').ne(null)
    .limit(doccount)
    .sort({'quizInfo.percent' :-1})
    .exec();

    console.log(resp);
    res.json(resp)

})



module.exports = router