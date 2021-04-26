const express = require('express')
const router = express.Router()
const Video = require('../models/videoModel')


router.get('/', async(req,res) => {
    try{
           const links = await Video.find();
           console.log("Inside Video details");
res.json(links);
    }catch(err){
        res.send('Error ' + err);
    }
})

router.get('/:class', async(req,res) => {
    try{
        var query = { class: req.params.class };
           const link=await Video.findOne(query);
           console.log("Inside Links of Class :"+req.params.class);
res.json(link)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const link = new Video({
        subject: req.body.subject,
        class : req.body.class,
        chaptername: req.body.chaptername,
        board: req.body.board,
        url: req.body.url
    })
console.log(link);
    try{
        const a1 =  await link.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const link = await Video.findById(req.params.id); 
        link.sub = req.body.sub;
        const a1 = await link.save();
        res.json(a1);
    }catch(err){
        res.send('Error')
    }

})

module.exports = router
