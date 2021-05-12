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

router.get('/school', async(req,res) => {
    try{
        var query = { schoolcode: req.body.schoolcode };
        console.log(query)
           const quiz=await Quiz.find(query)
           res.json(quiz)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const quiz = new Quiz({
        schoolcode: req.body.schoolcode,
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