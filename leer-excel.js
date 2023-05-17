const csv = require('csv-parser');
const fs = require('fs');
// importar bs de datos
const db = require('./db/db');

const createTips = ( ) => {
  db.prepare('DROP TABLE IF EXISTS tips').run( );
  const statement = db.prepare(`
          CREATE TABLE IF NOT EXISTS tips (
              tip1 TEXT NOT NULL,
              tip2 DATE NOT NULL,
              tip3 TEXT NOT NULL
          )
      `);
  statement.run( );
};

const createTables = async ( ) => {
  console.log('Creando tablas...');
  createTips( );
  console.log('Tablas creadas');
};
createTables();

fs.createReadStream('./TIPS.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => {
    // console.log(data);
    db.prepare('INSERT INTO tips (tip1, tip2, tip3) VALUES (?, ?, ?)').run(data.hola, data.tip2, data.tip3);
  });

