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

//student records array to store the student records in memory
let studentsRecords = [
    {
        student_id: Date.now() - Math.floor(Math.random() * 1000000),
        name: "Dharn",
        email: "dharn@example.com"
    }
];

//get all students endPoint



//create student record endpoint


//get student by student_id endpoint


//update student record endpoint


//delete student record endpoint
app.delete('/api/v1/students/:student_id', (req, res) => { 
    const studentId = Number(req.params.student_id);
    // Logic to delete the student record from the database using the studentId
    const studentIndex = studentsRecords.findIndex(student => student.student_id === studentId);
    if (studentIndex !== -1) {
       const deletedStudent = studentsRecords.splice(studentIndex, 1);
        res.status(200).json({ message: "Student record deleted successfully",
            //THis is to return the deleted student record in the response
            student: deletedStudent[0]
         });
    } else {
        res.status(404).json({ message: "Student record not found" });
    }
});


//listen
app.listen(PORT, ()=> {
    console.log(`The server has started running on port ${PORT}`)
})

