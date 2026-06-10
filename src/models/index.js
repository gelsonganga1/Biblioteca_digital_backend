const User = require('./User');
const Department = require('./Department');
const Service = require('./Service');
const Appointment = require('./Appointment');

Department.hasMany(Service, { foreignKey: 'department_id', as: 'services' });
Service.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

User.hasMany(Appointment, { foreignKey: 'user_id', as: 'appointments' });
Appointment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Service.hasMany(Appointment, { foreignKey: 'service_id', as: 'appointments' });
Appointment.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

Department.hasMany(Appointment, { foreignKey: 'department_id', as: 'appointments' });
Appointment.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

module.exports = { User, Department, Service, Appointment };
