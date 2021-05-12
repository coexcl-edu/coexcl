const express = require('express');
const router = express.Router()
const Notes = require('../models/notesModel')


router.post('/', async(req,res) => {
    const Note = new Notes({
        userId : req.body.userId,
        description: req.body.description
    })
    try{
      const note=await Note.save();
           res.status(200).json(note)
    }catch(err){
        res.send('Error')
    }
})


router.get('/', async(req,res) => {
    const Note = {
        userId : req.body.userId,
    }
    try{
      const note=await Notes.findOne(Note);
           res.status(200).json(note)
    }catch(err){
        res.send('Error')
    }
})


router.patch('/', async(req,res) => {
    const Note = {
        _id : req.body.noteId,
    }
    try{
     console.log("Patching");
      const note=await Notes.findOne(Note);
      console.log(note);
      note.description=req.body.description;
      const noteOutput=await note.save();
           res.status(200).json(noteOutput)
    }catch(err){
        res.send('Error')
    }
})

module.exports = router
