const request = require('supertest');
const app = require('../src/app');
const TaskModel = require('../src/models/taskModel');

describe('Task Manager API - Testes do MVP', () => {
  beforeEach(() => {
    TaskModel.reset();
  });

  test('POST /tasks - Deve criar uma tarefa', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Criar documentação', description: 'README do projeto' });
    
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Criar documentação');
  });

  test('GET /tasks - Deve listar tarefas', async () => {
    TaskModel.create({ title: 'Tarefa 1' });
    const res = await request(app).get('/tasks');
    
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('PUT /tasks/:id - Deve atualizar tarefa', async () => {
    const task = TaskModel.create({ title: 'Antiga' });
    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ title: 'Nova', completed: true });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Nova');
    expect(res.body.completed).toBe(true);
  });

  test('DELETE /tasks/:id - Deve deletar tarefa', async () => {
    const task = TaskModel.create({ title: 'Deletar' });
    const res = await request(app).delete(`/tasks/${task.id}`);

    expect(res.status).toBe(200);
  });
});
