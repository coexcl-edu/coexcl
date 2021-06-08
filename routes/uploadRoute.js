const express = require('express');
const Multer = require('multer');
const bodyParser = require('body-parser');
const router = express.Router()
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');
const User = require('../models/userModel');
const { exit } = require('process');

const storage = new Storage( {projectId :"coexclapi",
credentials :
 {client_email : "coexcl@coexclapi.iam.gserviceaccount.com", 
   private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVJvsEeHudzp5u\nOo6AiR5APOKU3fz2bmeUUmI0GKWTw+F27o7CxvMl0IZJH7qrI1II9rIiSYGHl4EQ\niVlG6Xg5zn2x6kZ/It6CZalKFR8YRxbWPtGhDJwJWi+nWdSmGtz7uo/aAJjL5x86\n/NnACyZAi5JDlLB9n3cMhGbez5HsEHbzz1LssmiFJwRkjaVw3d6rRKPnTOEInex1\nROyaSWzbqWmj5LQ5RlFAuKEfrSkVD9ff8/SksIOtZCkAm1T/hD4JiWGBPZ3CeyoR\n9fTDqeo+c2jBvzaDckqvQIf+WNX0ZTdTZN6jIse0MtZCIStga4SPnHLp4Hdzn3BF\nXYZjJSKrAgMBAAECggEAAZx+8OZxCHqhub1dCxsDLMzBpKhf3fpsOGnbewlqWmbg\nyn1o8nucJj+bpOIZe2tT0bMko/l7ldfHn8y5Y3jOHlyFSbrn/yMydVYfeuqyCQ7B\ncMkZoW4T7x896Q6IIkPvfaUNDWoHM9MXkZ2gGNoN9LQb3OjYfrUT720sV5k8fDKJ\nM30vtpYDsBPP3xd79bqC8/WtqDGZnOo2pIIV8u/6p8J1neBs4bZnPGHmrAtaH4XG\nA0f+6CyPuq+gGYnfMzaaP8TytF9d4hzY/mURCJfNq44ZY9/kLE8HTPbdWBy35YoE\nXdir+xScKlglNF9gmCJkHJLkBo21SaeW+I21iWjIbQKBgQD7p7UBrxkLXlDgCAIY\npAYZpEkOPxr5BgZ1bnSVH37hPiV/I+dVSLLruFwxIMw4Q65tt2cCyCUqmWgM7uY7\nqtMLUap7+dDkvaEJV10s+8VcnCwPgZ5IvLnvHRbXXfMHPU6+vjsi7t2opnpqF4X2\nmLaZAN4VIL7wQsA9IJgx57eMTwKBgQDY1RgqccpZ++iDK+2F7teyGh0IQiCOfSV5\n8+8/mUaSge4g0kl+qtQ2meEHtDf2gdFZE/nv7OrLU47fTvRf3DebbBuL3qK/cu91\nIPUsSCp0P4YKV+6AzUYalf4gDbGLKzKpYoYE481PxOE4DARq6VdshRBL1ApWXwYH\nXbyZKnlg5QKBgQDZNB3ZjzyJgGVDiAXvKJsPRKm9fyATsWyfrK85Co8jb9VDUETZ\naj7rjxsbWBiLs3b4waRKVV8mznNtPkE/XKh9C4afLLZsx3MXsez8522oCi9JTvHE\nDAhbZnsRdchOBk9R+LTn6M0uREpCCX2ZoqNvmb0U9Ud37dUorVpPMJVOpwKBgQCX\nx5qR43NEx8v7Pd2XGhhMaHEYHcnSVBHOqw03FKDM3zyEJw8hJo1D5zUZAnMGD9su\nIoibBNlaGJRzBj6Td4BJQESMBP0hTGAIOljEdYOaOfkm9mRSLt66r3HimBNGmqds\n4DV16MwH4YXRiL/y4oG6ye4dVkEiMoPy1g+1m4C5bQKBgAIbr2lWXd+eXK9B+skU\nUTOaz6HBhdQFaEhrjY6JA21Lnnms5b7bbg8nvC6qJl2ZvL4ZEpVTxtjjZoaUarEj\nyT1dCM3FS5uy1nQvUrCH615R/u5Y1z6UGxqkcqzdSvQsRayejjm48yKojzgSMMtM\n2XmZr/HcM6plJov/9tjt0KbC\n-----END PRIVATE KEY-----\n"}
});

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const bucket = storage.bucket("coexclbucket");

router.get('/', (req, res) => {
  res.render('form.pug');
});

// Process the file upload and upload to Google Cloud Storage.
router.post('/upload', multer.single('file'),async (req, res, next) => {
    const filter = {
        _id : req.body.userid,
    }

    const userInfo = await User.findOne(filter) 

   
    if(userInfo == undefined)
    {
        res.json("No user")
        exit
    }

  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    next(err);
  });

  var url;
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
  });

  url="https://storage.googleapis.com/"+bucket.name+"/"+blob.name
  userInfo.profileimgurl=url;
   const ifupdated=await userInfo.save()

   outRes={
    response : true,
    status : 200,
    data : {userInfo}
}

   res.status(200).json(outRes);
   blobStream.end(req.file.buffer);

});

module.exports = router