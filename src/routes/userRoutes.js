const { Router } = require('express');
const userController = require('../controllers/userController');
const { auth, adminOnly } = require('../middleware/auth');

const router = Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags: [Usuários]
 *     summary: Criar nova conta
 *     description: Registra um novo usuário. O primeiro usuário registrado torna-se superadmin automaticamente.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', userController.register);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags: [Usuários]
 *     summary: Autenticar usuário
 *     description: Retorna tokens JWT (access + refresh) e dados do usuário.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', userController.login);

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags: [Usuários]
 *     summary: Meus dados
 *     description: Retorna os dados do usuário autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/me', auth, userController.me);

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Usuários]
 *     summary: Listar usuários (dashboard)
 *     description: Retorna todos os usuários. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Acesso restrito a administradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', auth, adminOnly, userController.list);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Buscar usuário (dashboard)
 *     description: Retorna dados de um usuário específico. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', auth, adminOnly, userController.getById);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualizar usuário (dashboard)
 *     description: Atualiza dados de um usuário. Apenas superadmin pode alterar outro superadmin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', auth, adminOnly, userController.update);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Remover usuário (dashboard)
 *     description: Remove um usuário. Não é possível remover superadmins.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário removido
 *       403:
 *         description: Não é possível remover superadmin
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', auth, adminOnly, userController.remove);

module.exports = router;
