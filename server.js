require("dotenv").config();
const express = require("express");
const app = express();

//declare port using global environment
const PORT = process.env.PORT || 3000;

//Middleware in order to accept request from the body
app.use(express.json());

//middleware to track error easily
app.use((req, res, next) => {
  console.log(
    `This is getting request from ${req.url} using ${req.method} VERB`,
  );
  next();
});

//Test endpoint
app.get("/", (req, res) => {
  res.send("This is Student Record API");
});

//student records array to store the student records in memory (student attributes)
let studentsRecords = [
  {
    studentid: Date.now() - Math.floor(Math.random() * 1000000),
    firstname: "Dharn",
    lastname: "myDharn",
    email: "dharn@example.com",
    department: "Backend dev",
  },
];
console.log(typeof studentsRecords[0].studentid);

//get all students endPoint //By Marvelous Anthony
app.get("/api/v1/students", (req, res) => {
  res.status(200).json({
    total_students: studentsRecords.length,
    students: studentsRecords,
  });
});

//create student record endpoint/Gazo Benjamin Great

app.post("/api/v1/students/create", (req, res) => {
  const { firstname, lastname, email, department } = req.body;
  if (!firstname || !lastname || !email || !department)
    return res.status(404).json({
      status: "failed",
      message: "All fields are required to be filled",
    });
  const newStudentRecord = {
    student_id: Date.now() - Math.floor(Math.random() * 1000000),
    firstname,
    lastname,
    email,
    department,
  };

  studentsRecords.push(newStudentRecord);
  res.status(201).json({
    status: "success",
    message: "Student is added successfully!!",
    newStudentRecord,
  });
});

//get student by student_id endpoint //By Adekanye Oluwatosin

app.get("/api/v1/students/:student_id", (req, res) => {
  const studentId = req.params.student_id;
  const studentFetched = studentsRecords.find(
    (student) => student.student_id === studentId,
  );
  if (!studentFetched) {
    return res.status(404).json({
      status: "failed",
      message: "Student not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Student record fetched successfully",
    student: studentFetched,
  });
});

//update student record endpoint
/* By 
- Onyekachi Jasper-Duruzor 
- Laureen Otieno
*/
app.patch("/api/v1/student/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = studentsRecords.find(
    (student) => student.studentid === studentId,
  );
  //   if record does not exist return error
  if (!student)
    return res.status(404).json({
      status: "failed",
      message: "Student not found",
    });

  // validate request body to ensure it contains at least one field to update
  // validate that the fields being updated are Not existing student records

  // update student record with new data from request body
  Object.assign(student, req.body);
  res.status(200).json({
    status: "success",
    data: student,
  });
});

//delete student record endpoint //By Rose Mary
app.delete("/api/v1/student/:id", (req, res) => {
  //get student id from request
  const studentId = req.params.id;

  //check if student exsit in the array
  const studentExistence = studentsRecords.find(
    (student) => student.student_id == studentId,
  );

  //if student does not exist return error
  if (!studentExistence) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  //remove student from the array
  studentsRecords.filter((student) => student.student_id != studentId);

  //return success response with deleted student
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    deletedStudent: studentExistence,
  });
});

//listen
app.listen(PORT, () => {
  console.log(`The server has started running on port ${PORT}`);
});
