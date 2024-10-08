import { Router } from 'express';
import {testGames, create, allGames ,getGame } from '../controllers/games.js';

const router = Router();
router.get('/test', testGames);
router.post('/add', create );
router.get("/all", allGames)
router.get("/:id", getGame)
export default router ;
