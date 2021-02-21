//db.js
async function connect() {
   if (global.connection)
       return global.connection.connect();

   const { Pool } = require('pg');
   const pool = new Pool({
       connectionString: process.env.DATABASE_URL
   });

   const client = await pool.connect();

   //apenas testando a conexão
   const res = await client.query('SELECT NOW()');
   console.log(res.rows[0]);
   client.release();

   //guardando para usar sempre o mesmo pool
   global.connection = pool;
   return pool.connect();
}

module.exports = { connect }