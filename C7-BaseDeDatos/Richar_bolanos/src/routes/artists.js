const { Router }  = require('express');
const sequelize = require('../db/sequelize');
const { QueryTypes } = require('sequelize');

const router = Router();
//POST /songs
app.post('/songs', async (req, res) => {
    const { title, artistId, releaseYear, duration, coverUrl } = req.body;
    try {
        const [song] = await sequelize.query(`
        INSERT INTO Songs (title, artistId, releaseYear, duration, coverUrl)
        VALUES (:title, :artistId, :releaseYear, :duration, :coverUrl)
        RETURNING *;`, {
            replacements: { title, artistId, releaseYear, duration, coverUrl },
            type: sequelize.QueryTypes.INSERT
        });
        res.status(201).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//GET /songs
app.get('/songs', async (req, res) => {
    try {
        const songs = await sequelize.query(`
        SELECT * FROM Songs;`, {
            type: sequelize.QueryTypes.SELECT
        });
        res.json(songs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//PUT /songs/:id
app.put('/songs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, artistId, releaseYear, duration, coverUrl } = req.body;
    try {
        const [updatedSong] = await sequelize.query(`
        UPDATE Songs
        SET title = :title, artistId = :artistId, releaseYear = :releaseYear, duration = :duration, coverUrl = :coverUrl
        WHERE id = :id
        RETURNING *;`, {
            replacements: { id, title, artistId, releaseYear, duration, coverUrl },
            type: sequelize.QueryTypes.UPDATE
        });
        res.json(updatedSong);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//DELETE /songs/:id
app.delete('/songs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(`
        DELETE FROM Songs WHERE id = :id;`, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
        });
        res.json({ message: 'Song deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});