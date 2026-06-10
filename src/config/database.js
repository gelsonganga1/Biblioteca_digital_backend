const path = require('path');
const { Sequelize } = require('sequelize');

const dbUrl = process.env.DATABASE_URL;

let sequelize;

if (dbUrl) {
  sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  try {
    require.resolve('sqlite3');
  } catch (err) {
    console.error('');
    console.error('═══════════════════════════════════════════════════════════');
    console.error('  SQLite não disponível neste ambiente.');
    console.error('  Defina DATABASE_URL para usar PostgreSQL.');
    console.error('  Exemplo: DATABASE_URL=postgres://usuario:senha@host:5432/bd');
    console.error('═══════════════════════════════════════════════════════════');
    console.error('');
    process.exit(1);
  }

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../db.sqlite3'),
    logging: false,
  });
}

module.exports = sequelize;
