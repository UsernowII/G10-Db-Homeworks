const { Router } = express = require('express')
const { movies } = require('./data')
const router = Router();



router.get('/', function (req, res) {
    res.send('Hello World')
})

router.get('/movies', (req, res) => {
    res.json(movies);
});

router.get('/movies/id', (req, res) => {

    console.log(req.params.id);
    const id = req.params.id
    
    movies.find(movie=>movie.id===id);
    res.json(id);
});

// crear recursos
router.post('/movies', (req, res) => {
    // recibir datos
    console.log(req.body)

// error controlado
    if(!req.body.title){
        return res.status(400).json({message: "Titile is required"})
    }

    const id = movies.length + 1

    const movie = {
        ...req.body,
        id,
    }
    
    
    movies.push(movie)
    res.status(201).json(movie);
   
});

module.exports=router;