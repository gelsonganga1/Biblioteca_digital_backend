require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('../src/config/database');
const { User } = require('../src/models');

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Administrador';

  if (!email || !password) {
    console.error('Uso: node scripts/create-admin.js <email> <password> [nome]');
    process.exit(1);
  }

  await sequelize.sync();

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log(`Usuário ${email} já existe. Atualizando para admin...`);
    existing.role = 'admin';
    existing.password = await bcrypt.hash(password, 10);
    await existing.save();
    console.log('Usuário atualizado para admin com sucesso.');
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role: 'admin' });
    console.log(`Admin criado: ${email} / ${password}`);
  }

  await sequelize.close();
}

createAdmin().catch((err) => {
  console.error('Erro:', err.message);
  process.exit(1);
});
