const { Service, Department } = require('../models');

exports.list = async (req, res) => {
  const services = await Service.findAll({
    include: [{ model: Department, as: 'department', attributes: ['id', 'name'] }],
  });
  res.json(services);
};

exports.getById = async (req, res) => {
  const service = await Service.findByPk(req.params.id, {
    include: [{ model: Department, as: 'department', attributes: ['id', 'name'] }],
  });
  if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
  res.json(service);
};

exports.create = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

exports.update = async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
  await service.update(req.body);
  res.json(service);
};

exports.remove = async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
  await service.destroy();
  res.status(204).send();
};
