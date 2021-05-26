const express = require('express');
const router = express.Router()
const School = require('../models/schoolModel')
var outRes;


router.get('/:schoolcode', async(req,res) => { 
    const schoolparam = {
        schoolcode : req.params.schoolcode
    }
    try{
        console.log(schoolparam)
    const result=await School.findOne(schoolparam)
    console.log(result)
    if(result != null)
    {
    outRes={
        response : true,
        status : 200,
        data : {result}
    }
    }
    else
    {
        outRes={
            response : true,
            status : 404,
            data : {"message":"No School Details available for School Code"}
        }
    }
    res.json(outRes)
}
catch(err)
{
    res.send('Error')
}



})


router.post('/loadSchool', async(req,res) => {
    const schoolDtls = new School({
        schoolcode : req.body.schoolcode,
        schoolname : req.body.schoolname,
        city : req.body.city,
        state : req.body.state,
        logourl : req.body.logourl
    })
console.log(schoolDtls);
    try{
      const school=await schoolDtls.save();
      outRes={
        response : true,
        status : 200,
        data : {school}
    }
           res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})


router.patch('/:id',async(req,res)=> {

    const schoolDtls = new School({
        schoolcode : req.body.schoolcode,
        schoolname : req.body.schoolname,
        city : req.body.city,
        state : req.body.state,
        logourl : req.body.logourl
    })

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