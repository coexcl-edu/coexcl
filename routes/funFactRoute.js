const express = require('express');
const router = express.Router()
const FunFact = require('../models/funFactModel')




router.post('/load', async(req,res) => {
   
    const inputParam =new FunFact({
        fileUrl: req.body.fileUrl,
        title: req.body.title,
        description: req.body.description
    })

    try{
      const funFactLoaded=await inputParam.save();
      outRes={
        response : true,
        status : 200,
        data : {funFactLoaded}
    }

     res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})

router.post('/fetch', async(req,res) => {
   
    const countParam= req.body.count
    try{
        const funfacts= await FunFact.aggregate([  
            { $sample: {size: countParam} }
        ])

        outRes={
            response : true,
            status : 200,
            data : {funfacts}
        }
       
    }catch(err){
        res.send('Error')
    }
    res.status(200).json(outRes)
})

module.exports = router