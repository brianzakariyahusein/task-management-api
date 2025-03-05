const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskcontroller'); 
const router = express.Router();

// Route untuk menambahkan task baru
router.post('/', createTask);

// Route untuk mendapatkan semua task
router.get('/', getTasks);

// Route untuk mengupdate task
router.put('/:id', updateTask);

// Route untuk menghapus task
router.delete('/:id', deleteTask);

module.exports = router;
