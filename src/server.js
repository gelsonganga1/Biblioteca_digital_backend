require('dotenv').config();

const REQUIRED_ENV_VARS = ['JWT_SECRET', 'DATABASE_URL'];
const missing = REQUIRED_ENV_VARS.filter(v => !process.env[v]);
if (missing.length) {
  console.error(`Erro: Variáveis de ambiente obrigatórias não definidas: ${missing.join(', ')}`);
  console.error('Defina-as no arquivo .env ou nas Environment Variables do Render.');
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const sequelize = require('./config/database');
const seed = require('../seed');
require('./models');

const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);

/**
 * @openapi
 * /api/health:
 *   get:
 *     tags: [Health]
 *     summary: Verificar status da API
 *     description: Endpoint de saúde para monitoramento.
 *     security: []
 *     responses:
 *       200:
 *         description: API saudável
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

sequelize.sync({ alter: false })
  .then(async () => {
    await seed();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api/docs`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    console.error(err.stack);
    process.exit(1);
  });
