import connection from '../database/connection.js';

export const testGames = (req, res)=>{
    return res.status(200).send({
        message: "Enviado desde controlador games.js"
    });  
};

export const create = async (req, res)=>{
    try{
        let params = req.body;
        console.log('params:', params)

        if(!params.code || !params.name || !params.description || !params.console || !params.release_year || !params.number_of_players || !params.image ){
            return res.status(400).json({
                status:'Error',
                message: "Faltan datos por enviar"
            });	    
        };
        let conexion = await connection();
        let respuesta = await conexion.query(`
            INSERT  INTO games (code,name,description,console,releaseYear,numberOfPlayers,image)
            VALUES (${params.code},'${params.name}','${params.description}','${params.console}', '${params.release_year}', ${params.number_of_players},'${params.image}')
            ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description), console = VALUES(console), releaseYear = VALUES(releaseYear), numberOfPlayers = VALUES(numberOfPlayers), image = VALUES(image);
        `)
        console.log('respuesta', respuesta)
        return res.status(200).json({
            status: "success",
            message: "Juego registrado actualizado"
        });

    }catch(error){
        console.log('Error en registro de juego:', error);
        return res.status(500).json({
            status: "Error",
            message: "Error en registro del juego"
        });
    }
};
export const allGames = async(req, res) =>{
    try{
        let conexion = await connection();
        let respuesta = await conexion.query("SELECT * FROM games")
        console.log(respuesta)
        return res.status(200).json({
            status: "success",
            data: respuesta
        });
    }catch(error){
        console.log('Error en registro de juego:', error);
        return res.status(500).json({
            status: "Error",
            message: "Error consultar lista de juegos"
        });
    }
}