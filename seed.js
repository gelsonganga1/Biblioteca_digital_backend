require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const { User } = require('./models');

async function seed() {
  await sequelize.sync();

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
    console.log('Já existem usuários no banco. Seed ignorado.');
  }

  await sequelize.close();
}

seed().catch((err) => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
