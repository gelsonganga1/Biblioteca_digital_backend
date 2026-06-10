const { Appointment, User, Service, Department } = require('../models');

const isDashboard = (user) => user.role === 'superadmin' || user.role === 'admin';

exports.list = async (req, res) => {
  try {
    const where = {};

    if (!isDashboard(req.user)) {
      where.user_id = req.user.id;
    }

    const appointments = await Appointment.findAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Service, as: 'service', attributes: ['id', 'name'] },
        { model: Department, as: 'department', attributes: ['id', 'name'] },
      ],
      order: [['date', 'DESC'], ['time', 'DESC']],
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Service, as: 'service', attributes: ['id', 'name'] },
        { model: Department, as: 'department', attributes: ['id', 'name'] },
      ],
    });

    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });

    if (!isDashboard(req.user) && appointment.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = {
      service_id: req.body.service_id,
      department_id: req.body.department_id,
      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes || null,
      user_id: isDashboard(req.user) ? (req.body.user_id || req.user.id) : req.user.id,
    };

    const appointment = await Appointment.create(data);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });

    if (!isDashboard(req.user) && appointment.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await appointment.update(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });

    if (!isDashboard(req.user) && appointment.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await appointment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
