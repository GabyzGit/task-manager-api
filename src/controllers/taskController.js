const TaskModel = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  const tasks = TaskModel.getAll();
  res.status(200).json(tasks);
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
  }
  const newTask = TaskModel.create({ title, description });
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const updatedTask = TaskModel.update(id, { title, description, completed });

  if (!updatedTask) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  res.status(200).json(updatedTask);
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const deleted = TaskModel.delete(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  res.status(200).json({ message: 'Tarefa removida com sucesso.' });
};
