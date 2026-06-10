const { Router } = require('express');
const appointmentController = require('../controllers/appointmentController');
const { auth } = require('../middleware/auth');

const router = Router();

/**
 * @openapi
 * /api/appointments:
 *   get:
 *     tags: [Agendamentos]
 *     summary: Listar agendamentos
 *     description: Clientes veem apenas seus próprios agendamentos. Superadmin e admin veem todos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */
router.get('/', auth, appointmentController.list);

/**
 * @openapi
 * /api/appointments/{id}:
 *   get:
 *     tags: [Agendamentos]
 *     summary: Buscar agendamento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Dados do agendamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', auth, appointmentController.getById);

/**
 * @openapi
 * /api/appointments:
 *   post:
 *     tags: [Agendamentos]
 *     summary: Criar agendamento
 *     description: Cria um novo agendamento. O user_id é atribuído automaticamente ao cliente logado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       201:
 *         description: Agendamento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 */
router.post('/', auth, appointmentController.create);

/**
 * @openapi
 * /api/appointments/{id}:
 *   put:
 *     tags: [Agendamentos]
 *     summary: Atualizar agendamento
 *     description: Permite alterar data, hora, status ou observações. Clientes só alteram seus próprios agendamentos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentUpdate'
 *     responses:
 *       200:
 *         description: Agendamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', auth, appointmentController.update);

/**
 * @openapi
 * /api/appointments/{id}:
 *   delete:
 *     tags: [Agendamentos]
 *     summary: Cancelar/remover agendamento
 *     description: Remove um agendamento. Clientes só removem seus próprios agendamentos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       204:
 *         description: Agendamento removido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', auth, appointmentController.remove);

module.exports = router;
