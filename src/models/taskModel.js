let tasks = [];
let currentId = 1;

class TaskModel {
  static getAll() {
    return tasks;
  }

  static getById(id) {
    return tasks.find(t => t.id === parseInt(id));
  }

  static create({ title, description }) {
    const newTask = {
      id: currentId++,
      title,
      description: description || '',
      completed: false,
      createdAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  }

  static update(id, { title, description, completed }) {
    const task = this.getById(id);
    if (!task) return null;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    return task;
  }

  static delete(id) {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }

  static reset() {
    tasks = [];
    currentId = 1;
  }
}

module.exports = TaskModel;
