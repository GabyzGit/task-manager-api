const request = require('supertest');
const app = require('../src/app');
const TaskModel = require('../src/models/taskModel');

describe('Task Manager API - Testes Automatizados CI/CD', () => {
  beforeEach(() => {
    TaskModel.reset();
  });

  // Teste 1: Criação de tarefa
  test('1. POST /tasks - Deve criar uma nova tarefa com sucesso', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Estudar CI/CD', description: 'Configurar GitHub Actions' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.title).toBe('Estudar CI/CD');
    expect(response.body.completed).toBe(false);
  });

  // Teste 2: Validação de erro (título obrigatório)
  test('2. POST /tasks - Deve retornar erro 400 se o título estiver vazio', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ description: 'Tarefa sem título' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Teste 3: Listagem de tarefas
  test('3. GET /tasks - Deve retornar a lista de tarefas cadastradas', async () => {
    TaskModel.create({ title: 'Tarefa A' });
    TaskModel.create({ title: 'Tarefa B' });

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  // Teste 4: Atualização de tarefa
  test('4. PUT /tasks/:id - Deve atualizar o status de uma tarefa', async () => {
    const task = TaskModel.create({ title: 'Tarefa Antiga' });

    const response = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ title: 'Tarefa Atualizada', completed: true });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Tarefa Atualizada');
    expect(response.body.completed).toBe(true);
  });
});