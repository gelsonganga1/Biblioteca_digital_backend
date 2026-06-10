const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Agendamento Angola - API',
      description: 'API para agendamento de serviços públicos e privados. Permite gerenciar usuários, departamentos, serviços e agendamentos com controle de acesso por níveis (superadmin, admin, client).',
      version: '1.0.0',
      contact: {
        name: 'Suporte Agendamento Angola',
        email: 'suporte@agendamento.co.ao',
      },
    },
    servers: [
      {
        url: 'https://biblioteca-digital-backend-2.onrender.com',
        description: 'Produção (Render)',
      },
      {
        url: `http://localhost:${process.env.PORT || 3005}`,
        description: 'Desenvolvimento',
      },
    ],
    tags: [
      { name: 'Usuários', description: 'Registro, autenticação e gestão de usuários' },
      { name: 'Departamentos', description: 'Gestão de departamentos/repartições' },
      { name: 'Serviços', description: 'Gestão de serviços oferecidos' },
      { name: 'Agendamentos', description: 'Criação e gestão de agendamentos' },
      { name: 'Health', description: 'Monitoramento da API' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Mensagem de erro' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            phone: { type: 'string', nullable: true, example: '+244 900 000 000' },
            role: { type: 'string', enum: ['superadmin', 'admin', 'client'], example: 'client' },
            is_active: { type: 'boolean', example: true },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            password: { type: 'string', format: 'password', example: '123456' },
            phone: { type: 'string', example: '+244 900 000 000' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@agendamento.co.ao' },
            password: { type: 'string', format: 'password', example: 'admin123' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            access: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
            refresh: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
          },
        },
        Department: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Conservatória do Registo Civil' },
            address: { type: 'string', nullable: true, example: 'Luanda, Ingombota' },
            phone: { type: 'string', nullable: true, example: '+244 222 000 000' },
            is_active: { type: 'boolean', example: true },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        DepartmentInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Conservatória do Registo Civil' },
            address: { type: 'string', example: 'Luanda, Ingombota' },
            phone: { type: 'string', example: '+244 222 000 000' },
          },
        },
        Service: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Emissão de Bilhete de Identidade' },
            description: { type: 'string', nullable: true, example: '1ª via do BI' },
            duration: { type: 'integer', nullable: true, example: 30 },
            price: { type: 'number', nullable: true, example: 0 },
            is_active: { type: 'boolean', example: true },
            department_id: { type: 'integer', example: 1 },
            department: { $ref: '#/components/schemas/Department' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        ServiceInput: {
          type: 'object',
          required: ['name', 'department_id'],
          properties: {
            name: { type: 'string', example: 'Emissão de Bilhete de Identidade' },
            description: { type: 'string', example: '1ª via do BI' },
            duration: { type: 'integer', example: 30 },
            price: { type: 'number', example: 0 },
            department_id: { type: 'integer', example: 1 },
          },
        },
        Appointment: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 1 },
            service_id: { type: 'integer', example: 1 },
            department_id: { type: 'integer', example: 1 },
            date: { type: 'string', format: 'date', example: '2026-06-20' },
            time: { type: 'string', format: 'time', example: '09:30' },
            status: { type: 'string', enum: ['scheduled', 'confirmed', 'completed', 'cancelled'], example: 'scheduled' },
            notes: { type: 'string', nullable: true, example: 'Primeira via do BI' },
            user: { $ref: '#/components/schemas/User' },
            service: { $ref: '#/components/schemas/Service' },
            department: { $ref: '#/components/schemas/Department' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        AppointmentInput: {
          type: 'object',
          required: ['service_id', 'department_id', 'date', 'time'],
          properties: {
            service_id: { type: 'integer', example: 1 },
            department_id: { type: 'integer', example: 1 },
            date: { type: 'string', format: 'date', example: '2026-06-20' },
            time: { type: 'string', format: 'time', example: '09:30' },
            notes: { type: 'string', example: 'Primeira via do BI' },
          },
        },
        AppointmentUpdate: {
          type: 'object',
          properties: {
            date: { type: 'string', format: 'date', example: '2026-06-25' },
            time: { type: 'string', format: 'time', example: '10:00' },
            status: { type: 'string', enum: ['scheduled', 'confirmed', 'completed', 'cancelled'], example: 'confirmed' },
            notes: { type: 'string', example: 'Remarcado' },
          },
        },
        UserUpdate: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'João Silva Atualizado' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            password: { type: 'string', format: 'password', example: 'nova123' },
            phone: { type: 'string', example: '+244 999 999 999' },
            role: { type: 'string', enum: ['superadmin', 'admin', 'client'], example: 'admin' },
          },
        },

      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/server.js'],
});

module.exports = swaggerSpec;
