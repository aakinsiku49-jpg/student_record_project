require('dotenv').config();

const express  = require('express')
const {z} = require('zod')
const app = express();

//declare port using global environment
const PORT = process.env.PORT; 

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


//student records array to store the student records in memory (student attributes)
let studentsRecords = [
    {  
        studentid: Date.now() - Math.floor(Math.random() * 1000000),
        firstname: "Dharn",
        lastname: "myDharn",
        email: "dharn@example.com",
        department: "Backend dev"
    }
];
console.log(typeof (studentsRecords[0].studentid))

//exact attributes a student must have in order to qualify to create a student record(zod validation)
const studentrequireddata = z.object({firstname: z.string().min(1, "First name is required!"), 
    lastname: z.string().min(1, "Last name is required!"),
    email: z.string().email("A valid email is required!"),
    department: z.string().min(1, "Student department is required!")
})


//get all students endPoint


//create student record endpoint/Gazo Benjamin Great
app.post('/api/v1/students/createrecord',(req, res, next)=>{
    try{//Validate the request using the zod blueprint
        const validatedrequest = studentrequireddata.parse(req.body);

        //generate the unique student id
        const studentid = Date.now() - Math.floor(Math.random() * 1000000);
        //create the new student object
        const newStudent = {id: studentid,
        ...validatedrequest};

        //push the object to our in memory array
        studentsRecords.push(newStudent)

        //response
        res.status(201).json({message: "Student record created successfully",
                              student: newStudent
        });

    } catch(error) {
        //passes the error to the error handler at the end of the program
        next(error);
    }
});



//get student by student_id endpoint //By Adekanye Oluwatosin

app.get('/api/v1/students/:student_id', (req, res) => {
    const studentId = req.params.student_id;
    const studentFetched = studentsRecords.find(student => student.student_id === studentId);
    if (!studentFetched) {
        return res.status(404).json({ 
            status: 'failed',
            message: 'Student not found' });
    }
    res.status(200).json({
        status: 'success',
        message: 'Student record fetched successfully',
        student: studentFetched
    });
});


//update student record endpoint


//delete student record endpoint
app.delete('/api/v1/student/:id', (req, res) =>{

    //get student id from request
    const studentId = req.params.id;

    //check if student exsit in the array
    const studentExistence = studentsRecords.find(student => student.student_id == studentId);

    //if student does not exist return error
    if(!studentExistence){
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    };

    //remove student from the array
    studentsRecords.filter(
        student => student.student_id != studentId
    );

    //return success response with deleted student
    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        deletedStudent: studentExistence
    });
});

//error handler/By Gazo Benjamin Great
app.use((err, req,res, next)=> {
    //check if the error came from zod validation
    if (err.name === 'ZodError') {
        return res.status(400).json({
        status: 'Failed',
        error: 'Validation Error!',
        //zod returns a complex object. map it into a client-friendly list
        //the ?(optional chaining)added is to prevent the "Cannot read properties undefined (reading 'map') crash that results from the zod check"
        details: err.errors?.map(e => ({
            field: e.path.join('.'),
            message: e.message
        }))
    })};

    //handle normal server errors
    console.log("Unhnadled Error Log", error) // logs unresolved error

    //response
    res.status(err.status||500).json({
        status: "Error Occured!",
        message: err.message || "Internal Server Error!"
    })
})


//listen
app.listen(PORT, ()=> {
    console.log(`The server has started running on port ${PORT}`)
})

