const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const student = require('./InitialData');
const { shift } = require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let ID = student.length;

app.get('/api/student',(req,res)=>{

    res.send(student);
    return;
});

app.get('/api/student/:id',(req,res)=>{
 
    const id = parseInt(req.params.id);
    const Student = student.find(stu => stu.id === id);

    if(!Student)
    {
      res.status(404).send(`Not Found! ${id}`); 
      return;
    }

     res.send(Student);
   
});


app.post('/api/student',(req,res)=>{
   
    const schema ={
        id: ID+1,
        name: req.body.name,
        currentClass: req.body.currentClass,
        division: req.body.division
    };
   
    if(!schema.name|| !schema.currentClass || !schema.division)
    {
        res.status(400).send("Incomplete data");
        return;
    }
  
    student.push(schema);
     ID++;
    res.send({id: ID});

});



app.put('/api/student/:id',(req,res)=>{

   const id = student.find(Student=> Student.id === parseInt(req.params.id));

   if(!id)
   {
    res.status(400).send(`Not Found! ${id}`); 
      return;   
   }

   const schema = {
    id: parseInt(req.params.id),
    name: req.body.name,
    currentClass: req.body.currentClass,
    division: req.body.division
   };
  
  
if(!schema.name|| !schema.currentClass || !schema.division)
    {
        res.status(400).send("Incomplete data");
        return;
    }
    
    student.splice(parseInt(req.params.id), 1,schema);
    res.type('application/x-www-form-urlencoded').send(student);

});

app.delete('/api/student/:id',(req,res)=>{
    const id = student.find(Student=> Student.id === parseInt(req.params.id));

    if(!id)
    {
     res.status(404).send(`Not Found! `); 
       return;   
    }
   
    student.splice(parseInt(req.params.id)-1,1);

    res.status(200).send(student);
 

});





app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
