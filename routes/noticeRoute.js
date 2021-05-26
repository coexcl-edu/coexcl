const express = require('express');
const router = express.Router()
const Notice = require('../models/noticeModel')
const User = require('../models/userModel')

router.post('/', async(req,res) => {
    const noticeObj = new Notice({
        schoolId : user.body.schoolId,
        class : user.body.class,
        notice : user.body.notice,
        header : user.body.header,
        date : user.body.date,
    })
    try{
      const notice=await noticeObj.save();
           res.status(200).json(notice)
    }catch(err){
        res.send('Error')
    }
})


router.get('/:userId', async(req,res) => {
    const userParam = {
        userId : req.params.userId,
    }
    try{
      const user=await User.findOne(userParam);

      const noticeParam = {
        schoolId : user.schoolInfo.schoolId,
        class : user.academics.class
      }
        res.status(200).json(noticeParam)
    }catch(err){
        res.send('Error')
    }
})
