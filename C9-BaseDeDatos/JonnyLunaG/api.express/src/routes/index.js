import express from 'express';
import artistRoutes from './artists.js';
import songRoutes from './songs.js';

const router =  new Router();

router.use('/artists', artistRoutes);
router.use('/songs', songRoutes);

export default router;
