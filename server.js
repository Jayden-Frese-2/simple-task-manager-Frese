import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

 

const app = express();

const PORT = process.env.PORT || 3000;

 

// Resolve directories for serving static frontend files

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

 

// Middleware

app.use(express.json()); // Allows Express to parse JSON data sent in request bodies

app.use(express.static(path.join(__dirname, 'public'))); // Serves frontend files from the /public folder

 

// In-memory data store (resets whenever the server restarts)

let tasks = [

    { id: 1, text: "Learn Node.js & Express basics" },

    { id: 2, text: "Build a cool REST API frontend" }

];

 

// --- REST API ENDPOINTS ---

 

// 1. GET /api/tasks - Retrieve all tasks

app.get('/api/tasks', (req, res) => {

    res.status(200).json(tasks);

});

 

// 2. POST /api/tasks - Create a new task

app.post('/api/tasks', (req, res) => {

    const { text } = req.body;

 

    // Simple Validation

    if (!text || text.trim() === "") {

        return res.status(400).json({ error: "Task text is required." });

    }

 

    const newTask = {

        id: Date.now(), // Generate a basic unique timestamp ID

        text: text.trim()

    };

 

    tasks.push(newTask);

    res.status(201).json(newTask); // 201 status code means "Created"

});

 

// 3. DELETE /api/tasks/:id - Delete a task by its ID

app.delete('/api/tasks/:id', (req, res) => {

    const taskId = parseInt(req.params.id);

    const initialLength = tasks.length;

   

    tasks = tasks.filter(task => task.id !== taskId);

 

    if (tasks.length === initialLength) {

        return res.status(404).json({ error: "Task not found." });

    }

 

    res.status(200).json({ success: true, message: `Task ${taskId} deleted.` });

});

 

// Start the server

app.listen(PORT, () => {

    console.log(`🚀 Server running smoothly at http://localhost:${PORT}`);

});