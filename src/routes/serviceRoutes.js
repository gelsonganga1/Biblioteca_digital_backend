const { Router } = require('express');
const serviceController = require('../controllers/serviceController');
const { auth, adminOnly } = require('../middleware/auth');

const router = Router();

/**
 * @openapi
 * /api/services:
 *   get:
 *     tags: [Serviços]
 *     summary: Listar serviços
 *     description: Retorna todos os serviços disponíveis com seus respectivos departamentos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
router.get('/', auth, serviceController.list);

/**
 * @openapi
 * /api/services/{id}:
 *   get:
 *     tags: [Serviços]
 *     summary: Buscar serviço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Dados do serviço
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Serviço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', auth, serviceController.getById);

/**
 * @openapi
 * /api/services:
 *   post:
 *     tags: [Serviços]
 *     summary: Criar serviço (dashboard)
 *     description: Cria um novo serviço vinculado a um departamento. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceInput'
 *     responses:
 *       201:
 *         description: Serviço criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       403:
 *         description: Acesso restrito a administradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', auth, adminOnly, serviceController.create);

/**
 * @openapi
 * /api/services/{id}:
 *   put:
 *     tags: [Serviços]
 *     summary: Atualizar serviço (dashboard)
 *     description: Atualiza dados de um serviço. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceInput'
 *     responses:
 *       200:
 *         description: Serviço atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Serviço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', auth, adminOnly, serviceController.update);

/**
 * @openapi
 * /api/services/{id}:
 *   delete:
 *     tags: [Serviços]
 *     summary: Remover serviço (dashboard)
 *     description: Remove um serviço. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       204:
 *         description: Serviço removido
 *       404:
 *         description: Serviço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', auth, adminOnly, serviceController.remove);

module.exports = router;
