const express = require('express');
const app = express();
app.use(express.json());

const courses =[
        {id:1, name: 'course1'},
        {id:2, name: 'course2'},
        {id:3, name: 'course3'},
];       
let curentid = 100;


app.get('/', (req, res)=>{
        res.send('hello world');
});
app.get('/api/courses',(req, res)=>{
       res.send(courses);
        
});
app.post ('/api/courses',(req, res)=>{
        const course ={
                id: curentid++,
                name: req.body.name,
        };
        courses.push(course);
        res.send(course);
});

app.get('/api/courses/:id',(req, res)=>{
      const course =  courses.find(c => c.id === parseInt(req.params.id));
      if(!course) res.status(404).send('det har gåt fell');
      
      res.send(course);
});
app.put('/api/courses/:id', (req, res)=>{
        const course =  courses.find(c => c.id === parseInt(req.params.id));
        if(!course) res.status(404).send('det har gåt fell');

        course.name= req.body.name;
        res.send(course);
});
app.delete('/api/courses/:id',(req, res)=>{
        const course =  courses.find(c => c.id === parseInt(req.params.id));
        if(!course) res.status(404).send('det har gåt fell');

        const index = courses.indexOf(course);
        courses.splice(index, 1);

        res.send(course);
});

//port
const port = process.env.PORT|| 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`))