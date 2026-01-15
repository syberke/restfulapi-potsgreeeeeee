const prisma = require("../prisma");

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET task by ID
exports.getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// CREATE task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await prisma.task.create({
      data: { title, description }
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE task
exports.updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    const updated = await prisma.task.update({
      where: { id },
      data: { title, description, completed }
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.task.delete({ where: { id } });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
