const { Router } = require('express');
const departmentController = require('../controllers/departmentController');
const { auth, adminOnly } = require('../middleware/auth');

const router = Router();

/**
 * @openapi
 * /api/departments:
 *   get:
 *     tags: [Departamentos]
 *     summary: Listar departamentos
 *     description: Retorna todos os departamentos/repartições disponíveis.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 */
router.get('/', auth, departmentController.list);

/**
 * @openapi
 * /api/departments/{id}:
 *   get:
 *     tags: [Departamentos]
 *     summary: Buscar departamento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do departamento
 *     responses:
 *       200:
 *         description: Dados do departamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       404:
 *         description: Departamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', auth, departmentController.getById);

/**
 * @openapi
 * /api/departments:
 *   post:
 *     tags: [Departamentos]
 *     summary: Criar departamento (dashboard)
 *     description: Cria um novo departamento. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepartmentInput'
 *     responses:
 *       201:
 *         description: Departamento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       403:
 *         description: Acesso restrito a administradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', auth, adminOnly, departmentController.create);

/**
 * @openapi
 * /api/departments/{id}:
 *   put:
 *     tags: [Departamentos]
 *     summary: Atualizar departamento (dashboard)
 *     description: Atualiza dados de um departamento. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepartmentInput'
 *     responses:
 *       200:
 *         description: Departamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       404:
 *         description: Departamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', auth, adminOnly, departmentController.update);

/**
 * @openapi
 * /api/departments/{id}:
 *   delete:
 *     tags: [Departamentos]
 *     summary: Remover departamento (dashboard)
 *     description: Remove um departamento. Acesso apenas para superadmin e admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do departamento
 *     responses:
 *       204:
 *         description: Departamento removido
 *       404:
 *         description: Departamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', auth, adminOnly, departmentController.remove);

module.exports = router;
