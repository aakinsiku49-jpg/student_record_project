require('dotenv').config();
const express  = require('express')
const app = express();

//declare port using global environment
const PORT = process.env.PORT || 5000

//Middleware in order to accept request from the body
app.use(express.json());



//middleware to track error easily
app.use((req, res, next)=>{
    console.log(`This is getting request from ${req.url} using ${req.method} VERB`);
    next()
})

//Test endpoint
app.get('/', (req,res)=>{
    res.send("This is Student Record API")
})

//get all students endPoint



//create student record endpoint


//get student by student_id endpoint


//update student record endpoint


//delete student record endpoint

//listen
app.listen(PORT, ()=> {
    console.log(`The server has started running on port ${PORT}`)
})

