const { Department } = require('../models');

exports.list = async (req, res) => {
  const departments = await Department.findAll();
  res.json(departments);
};

exports.getById = async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  if (!department) return res.status(404).json({ error: 'Departamento não encontrado' });
  res.json(department);
};

exports.create = async (req, res) => {
  const department = await Department.create(req.body);
  res.status(201).json(department);
};

exports.update = async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  if (!department) return res.status(404).json({ error: 'Departamento não encontrado' });
  await department.update(req.body);
  res.json(department);
};

exports.remove = async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  if (!department) return res.status(404).json({ error: 'Departamento não encontrado' });
  await department.destroy();
  res.status(204).send();
};
