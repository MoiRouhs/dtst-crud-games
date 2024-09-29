import mariadb from 'mariadb';

// Crea conexión con la DB
const connection = async ()=>{
  const pool = mariadb.createPool({
    host:process.env.HOST,
    user:process.env.USERDB,
    password: process.env.PASSWORD,
    connectionLimit: 10
  })

  const iniciar = async ()=>{
    // Verificación del a conexión
    pool.getConnection()
      .then(()=>{
        console.log('conectado')
      })
      .catch(error =>{
        console.log('Error:', error)
        process.exit()
      })

    // Creación de tabla
    let conn;
    try{
      conn = await pool.getConnection();
      // Creación DB
      await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.NAMEDB}`);

      // Creación Tabla
      await conn.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.NAMEDB}.games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        console VARCHAR(100),
        releaseYear YEAR,
        numberOfPlayers INT,
        image VARCHAR(255)
      );
    `);
      console.log(`Base de datos '${process.env.NAMEDB}' y tabla 'games' creada o ya existe.`);
    }catch(error){
      console.error('Error:', error)
    }finally{
      if(conn) conn.close()
    }
  }

  const query = async (argQuery)=>{
    let conn;
    try{
      conn = await pool.getConnection();
      console.log('Conectado');
      await conn.query(`USE ${process.env.NAMEDB};`); 
      const respuesta = await conn.query(argQuery);
      return respuesta ;
    }catch(error){
      console.error('Error en la consulta:', error);
      throw error; // Lanzar error para manejarlo en otra parte si es necesario
    }finally{
      if (conn) conn.release();
    }
  }
  return { iniciar, query };
}
export default connection;
