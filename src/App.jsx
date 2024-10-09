import React, { useState } from 'react';
import { AddGame, DeleteGame, ListGame, UpdateGame } from './components'

export const App = () => {
  const [games, setGames] = useState([]);

  const addGame = (game) => {
    setGames([...games, game]);
  };

  const updateGame = (updatedGame) => {
    setGames(games.map(game => game.code === updatedGame.code ? updatedGame : game));
  };

  const deleteGame = (code) => {
    setGames(games.filter(game => game.code !== code));
  };

  return (
    <Router>
      <div style={{ textAlign: 'center' }}>
        <h1>GESTIÓN DE JUEGOS</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
          <Link to="/create">
            <div style={{ border: '1px solid black', padding: '20px' }}>Agregar Juego</div>
          </Link>
          <Link to="/list">
            <div style={{ border: '1px solid black', padding: '20px' }}>Lista Juegos</div>
          </Link>
          <Link to="/update">
            <div style={{ border: '1px solid black', padding: '20px' }}>Actualizar Juegos</div>
          </Link>
          <Link to="/delete">
            <div style={{ border: '1px solid black', padding: '20px' }}>Eliminar Juegos</div>
          </Link>
        </div>
        <Route path="/create" render={() => <AddGame addGame={addGame} />} />
        <Route path="/list" render={() => <ListGame games={games} updateGame={updateGame} deleteGame={deleteGame} />} />
        <Route path="/update" render={() => <UpdateGame updateGame={updateGame} />} />
        <Route path="/delete" render={() => <DeleteGame deleteGame={deleteGame} />} />
      </div>
    </Router>
  );
}

