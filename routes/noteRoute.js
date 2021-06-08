const express = require('express');
const router = express.Router()
const Notes = require('../models/notesModel')




router.post('/', async(req,res) => {
   
    const queryParam ={
        userId: req.body.userId
    }

    try{
      const notes=await Notes.find(queryParam)
      outRes={
        response : true,
        status : 200,
        data : {notes}
    }

           res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})


router.post('/addnote', async(req,res) => {
    const Note = new Notes({
        userId : req.body.userId,
        title : req.body.title,
        description: req.body.description
    })
    try{
      const note=await Note.save();
      outRes={
        response : true,
        status : 200,
        data : {note}
    }
           res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})




router.put('/', async(req,res) => {
    const Note = {
        _id : req.body.noteId,
    }
    try{
      const note=await Notes.findOne(Note)
      console.log(note);
      if(req.body.title != undefined)
      {
        note.title=req.body.title
      }
      note.description=req.body.description
      const updatednote=await note.save()
      outRes={
        response : true,
        status : 200,
        data : {updatednote}
    }
        res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})

router.delete('/:noteId', async(req,res) => {
    const Note = {
        _id : req.params.noteId,
    }
    try{
      const note=await Notes.findOne(Note)
      if(note == undefined)
      {
        outRes={
            response : true,
            status : 401,
            data : "Invaid Note"
        }
      }
      else
      {
      const updatednote=await note.delete()
      outRes={
        response : true,
        status : 200,
        data : {message :"Note deleted Successfully."}
    }
        }
        res.status(200).json(outRes)
    }catch(err){
        res.send('Error')
    }
})


module.exports = router
