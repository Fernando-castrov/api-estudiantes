const express=require('express');
const app=express();

app.use(express.json());

const estudiantes =[
    {id:1,nombre:'Jorge',edad:15,escritos:true},
    {id:2,nombre:'Julio',edad:20,escritos:true},
    {id:3,nombre:'Jose',edad:25,escritos:true},
    {id:4,nombre:'Juan',edad:30,escritos:true},
    {id:5,nombre:'Julian',edad:35,escritos:true},    
]
////DIRECCION LOCAL
app.get('/',(req, res) => {
res.send ('Node js api');
});

//// CONSULTAMOS ESTUDIANTES
app.get('/api/estudiantes',(req,res)=>{
    res.send(estudiantes);
})

///CONSULTAMOS ESTUDIANTE POR SU ID
app.get('/api/estudiantes/:id',(req,res)=>{
    const estudiante= estudiantes.find(c=>c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send('Entudiante no encontrado');
    else res.send(estudiante);
})

////CREA NUEVO ESTUDIANTE
app.post('/api/estudiantes',(req, res) => {
    const estudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        escritos: (req.body.escritos ==='true')
    };

    estudiantes.push(estudiante);
    res.send(estudiante);
});

////ELIMINA ESTUDIANTE
app.delete('/api/estudiantes/:id',(req,res)=>{
    const estudiante=estudiantes.find(c=>c.id===parseInt(req.params.id));
    if (!estudiante)return res.status(404).send('Estudiante no encontrado');
    
        const index = estudiantes.indexOf(estudiante);
        estudiantes.splice(index,1);
        res.send(estudiante);

});

const port = process.env.port ||80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
