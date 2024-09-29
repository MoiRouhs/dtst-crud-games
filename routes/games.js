import { Router } from 'express';
import {testGames, create } from '../controllers/games.js';

const router = Router();
router.get('/test', testGames);
router.post('/add', create );

export default router ;
