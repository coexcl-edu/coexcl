//const express = require('express')
//const mongoose = require('mongoose')
//const url = "mongodb://localhost:27017/coexcldb";
/*const port= process.env.port || 8080;
app.use(express.json());

const url = "mongodb+srv://coexcl:coexcl@cluster0.9nvpj.mongodb.net/coexcldb";

const app = express()

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true })
const con = mongoose.connection

/*con.on('open', () => {
    console.log('connected...')
})

app.get('/welcome', (req,res) => {
  
        res.send('WELCOME to Node JS Application');
        
}); 


app.get('/', (req, res) => {
 res.status(200).send('Hello, world!').end();
});

const userRouter = require('./routes/aliens')
app.use('/users',userRouter) 

app.listen(port, () => {
    console.log('Server started')
}) */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;


