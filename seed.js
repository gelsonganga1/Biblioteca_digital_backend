require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('./src/config/database');
const { User } = require('./src/models');

async function seed() {
  const count = await User.count();

  if (count === 0) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Super Admin',
      email: 'gelsonganga82@gmail.com',
      password: hashed,
      role: 'superadmin',
    });
    console.log('Superadmin criado: gelsonganga82@gmail.com / admin123');
  } else {
    console.log(`${count} usuário(s) encontrado(s). Seed ignorado.`);
  }
}

if (require.main === module) {
  sequelize.sync().then(seed).then(() => sequelize.close()).catch((err) => {
    console.error('Erro no seed:', err);
    process.exit(1);
  });
}

module.exports = seed;
