const express = require('express')
const router = express.Router()
const Quiz = require('../models/quizModel')

router.get('/coexcl', async(req,res) => {
    try{
        var query = { schoolcode: 'coexcl' };
           const quizs = await Quiz.find(query)
           res.json(quizs)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/school', async(req,res) => {
    try{
        var query = {}

        if(req.body.schoolcode!= null)
        query['schoolcode'] =req.body.schoolcode
        if(req.body.subject!= null)
        query['subject'] =req.body.subject
        if(req.body.level!= null)
        query['level'] =req.body.level
        if(req.body.class!= null)
        query['class'] =req.body.class
    
       const quizCnt =await Quiz.countDocuments(query);
       

       var reslist=[]
      var count=req.body.count

      if(quizCnt<count)
      {
        count=quizCnt
      }

       while (reslist.length<count)
       {
           quizret=await getQuizList(req.body.count,query)
          reslist=quizret
        }
           res.json(reslist)
    }catch(err){
        res.send('Error ' + err)
    }
})


async function getQuizList(size, query)
{


    const quiz= await Quiz.aggregate([  
        { $sample: {size: size} }, 
        { $match:  query } 
      ])

      //console.log(quiz)
      return quiz

}


router.post('/', async(req,res) => {
    const quiz = new Quiz({
        schoolcode: req.body.schoolcode,
        class: req.body.class,
        subject : req.body.subject,
        question: req.body.question,
        level: req.body.level,
        options :
	{
        A :req.body.options.A,
        B :req.body.options.B,
        C:req.body.options.C,
        D:req.body.options.D
    },
    answer :req.body.answer
    })


  //  try{
        const a1 = await quiz.save()
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