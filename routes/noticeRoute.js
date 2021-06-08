const express = require('express');
const router = express.Router()
const Notice = require('../models/noticeModel')
const User = require('../models/userModel')

router.post('/', async(req,res) => {
    const noticeObj = new Notice({
        schoolId : req.body.schoolId,
        class : req.body.class,
        title : req.body.title,
        notice : req.body.notice,
        date : req.body.date,
        videourl : req.body.videourl,
        imageurl : req.body.imageurl
    })
    try{
      const noticeResult=await noticeObj.save();
      outRes={
        response : true,
        status : 200,
        data : {notices :noticeResult}
    }
        res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})


router.get('/:userId', async(req,res) => {
    const userParam = {
        userid : req.params.userId,
    }
    try{
      const user=await User.findOne(userParam);
        if(user== null)
        {
            outRes={
                response : true,
                status : 200,
                data : "Invalid user."
            }
        }
        else{
      const noticeParam = {
        schoolId : user.schoolInfo.schoolCode,
        class : user.academics.class
      }

      const noticeres=await Notice.findOne(noticeParam);

      outRes={
        response : true,
        status : 200,
        data : {notices:noticeres}
    }
    }

        res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})


module.exports = router