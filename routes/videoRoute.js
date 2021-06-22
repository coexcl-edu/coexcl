const express = require('express')
const router = express.Router()
const Video = require('../models/videoModel')
var respJson

router.post('/getvideo', async(req,res) => {

    var query = {}
   
    if(req.body.subject != undefined || req.body.subject != null)
        {
            query['subject'] = req.body.subject
        }
    if(req.body.class != undefined || req.body.class != null)
        {
            query['class'] =req.body.class
        }
    if(req.body.schoolcode != undefined || req.body.schoolcode != null)
        {
            if(req.body.schoolcode=='00000001')
            query['schoolcode']='COX00001'
            else            
            query['schoolcode'] =req.body.schoolcode
        }
   

    console.log(query)

    try{
           const links = await Video.find(query);
           respJson={
            response : true,
            status : 200,
            data : {
                links}
            }   

res.json(respJson);
    }catch(err){
        res.send('Error ' + err);
    }
})



router.post('/loadvideo', async(req,res) => {
    const link = new Video({
        schoolcode: req.body.schoolcode,
        subject: req.body.subject,
        class : req.body.class,
        chaptername: req.body.chaptername,
        board: req.body.board,
        url: req.body.url
    })
console.log(link);
    try{
        const a1 =  await link.save() 
        respJson={
            response : true,
            status : 200,
            data : {
                a1}
            } 
        res.json(respJson)
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
