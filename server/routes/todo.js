// Import required modules
const express = require('express');
const router = express.Router();
const Task = require('../models/Todo'); 
const { isLoggedIn } = require('../middleware/checkAuth');

// Apply isLoggedIn middleware to the entire /todo route
router.use(isLoggedIn);

// GET route for the /todo page
router.get('/todo', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.render('todo', { user: req.user, tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to add a new task
router.post('/todo/add', async (req, res) => {
    try {
        const { content } = req.body;
        const newTask = await Task.create({ user: req.user._id, content });
        res.json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Export the router
module.exports = router;