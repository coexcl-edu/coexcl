const express = require('express');
const router = express.Router()
const LiveClassModel = require('../models/liveClassModel')


router.post('/getliveclass', async(req,res) => {
    const queryparam = {
        schoolCode: req.body.schoolCode,
        class: req.body.class
    }
    console.log(queryparam);
    try{
      const liveclasses=await LiveClassModel.find(queryparam);

      outRes={
        response : true,
        status : 200,
        data : {liveclass: liveclasses}
    }

           res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})


router.post('/loadliveclass', async(req,res) => {
    const liveclass = new LiveClassModel({
        schoolCode: req.body.schoolCode,
        class: req.body.class,
        subject: req.body.subject,
        topic: req.body.topic,
        teacherName: req.body.teacherName,
       // startTime: req.body.startTime,
        duration: req.body.duration,
        videoMeetUrl: req.body.videoMeetUrl,
        description : req.body.description
    })

    let ms = Date.parse(req.body.startTime);
    
        console.log(ms);
        liveclass.startTime= ms
        const liveclassres=await liveclass.save();
    try{
     

      outRes={
        response : true,
        status : 200,
        data : {liveclassres}
    }
    
        res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})


module.exports = router


