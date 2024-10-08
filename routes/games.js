import { Router } from 'express';
import {testGames, create, allGames } from '../controllers/games.js';

const router = Router();
router.get('/test', testGames);
router.post('/add', create );
router.get("/all", allGames)
export default router ;
