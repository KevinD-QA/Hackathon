const express = require('express');
const router = express.Router();

const scheme = require('./mongo')


router.get('/getAll', async (req, res) => {
    const movies = await scheme.find();
    res.send(movies);
});

router.get('/getById/:id', async (req, res) => {
    try {
        const movie = await scheme.findById(req.params.id);
        res.send(movie);
    } catch {
        res.status(404);
        res.send({ error: 'movie does not exist' })
    }
});

router.post('/create', async (req, res) => {
    const movie = new scheme(req.body);
    await movie.save();
    res.send(movie);
});

router.patch('/update/:id', async (req, res) => {
    try {
        const movie = await scheme.findById(req.params.id);
        movie.title = req.body.title;
        movie.description = req.body.description;
        movie.releaseData = req.body.releaseData;
        movie.actors = req.body.actors;
        movie.review = req.body.review;
        await movie.save();
        res.send(movie);
    } catch {
        res.status(404);
        res.send({ error: 'movie does not exist' })
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const movie = await scheme.findById(req.params.id);
        await movie.deleteOne();
        res.send(movie);
    } catch {
        res.status(404);
        res.send({ error: 'movies does not exist' })
    }
});

module.exports = router;