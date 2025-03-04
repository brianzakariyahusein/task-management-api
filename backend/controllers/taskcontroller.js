const Task = require('../models/Task');

// 🔥 Buat Task Baru
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        
        console.log("Request body:", req.body);
        console.log("User ID:", req.user?._id); // Cek apakah user terdeteksi dari JWT

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            user: req.user._id, 
        });

        res.status(201).json(task);
    } catch (error) {
        console.error("Error saat menambahkan task:", error); // Tambahkan log ini
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🔥 Ambil Semua Task
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// 🔥 Update Task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Pastikan hanya user yang membuat task yang bisa mengedit
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// 🔥 Hapus Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Pastikan hanya user yang membuat task yang bisa menghapus
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.deleteOne();
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// 🔥 Pastikan semua fungsi diekspor!
module.exports = { createTask, getTasks, updateTask, deleteTask };
