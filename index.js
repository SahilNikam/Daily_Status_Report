// app object has four methods 
// app.get();
// app.post(); // for creating the new entry
// app.put();  for adding value
// app.delete();

const express = require('express');
const Joi = require('joi');

const app =  express();
app.use(express.json());

let genres = [
    { id: 1, name: "Romance"},
    { id: 2, name: "Action"},
    { id: 3, name: "Biopic"}
];

function validationGenres(genra){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genra, schema);
};

app.get('/api/genres', (req, res) => {
    if(!genres)
        return res.status(404).send("Movies list not found");
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genra = genres.find( g => g.id === parseInt(req.params.id));
    if(!genra) 
        return res.status(404).send("genra is not found");
    res.send(genra);
});

app.post('/api/genres', (req, res) => {
    const result = validationGenres(req.body);
    if(result.error)
        return res.status(400).send("Format is not proper");
    const genra = {
        id : genres.length + 1,
        name : req.body.name
    };
    genres.push(genra);
    res.send(genra);
});

app.put('/api/genres/:id', (req, res) => {
    const genra = genres.find( g => g.id === parseInt(req.params.id));
    if(!genra)
        return res.status(404).send("genra is not found");
    const result = validationGenres(req.body);
    // console.log(result);
    if(result.error)
        return res.status(400).send("Format is not proper");
    genra.name = req.body.name;
    res.send(genra);
});

app.delete('/api/genres/:id', (req, res) => {
    const genra = genres.find( g => g.id === parseInt(req.params.id));
    if(!genra) 
        return res.status(404).send("genra is not found");
    genres = genres.filter(g => g !== genra);
    res.send(genra);
});

app.listen(3000,() => console.log("Listening the port 3000"));


