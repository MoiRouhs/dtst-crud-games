import React from 'react';
import UpdateGame from './UpdateGame';

const ListGame = ({ games, updateGame, deleteGame }) => {
    return (
        <div>
            <h2>Lista de Juegos</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.code}>
                        {game.name} - {game.console}
                        <UpdateGame game={game} updateGame={updateGame} />
                        <DeleteGame deleteGame={deleteGame} code={game.code} />
                        <button onClick={() => deleteGame(game.code)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default ListGame;

