const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', async(req,res) => {
    try{
           const aliens = await User.find()
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:mobile', async(req,res) => {
    try{
        var query = { mobile: req.params.mobile };
           const user=await User.findOne(query);
           res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const alien = new User({
        name: req.body.name,
        mobile : req.body.mobile,
        schoolname: req.body.schoolname,
        sub: req.body.subscribed
    })
console.log(alien);
    try{
        const a1 =  await alien.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
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
