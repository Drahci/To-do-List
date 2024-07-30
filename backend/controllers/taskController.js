const Task = require("../models/task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send(err.message);
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).send(err.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.completed = completed;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send(err.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send(err.message);
  }
};
