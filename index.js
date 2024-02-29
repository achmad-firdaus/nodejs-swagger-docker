// index.js
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const fs = require('fs');
const os = require('os');

const swaggerDocument = JSON.parse(fs.readFileSync('./api.json', 'utf8'));

const app = express();

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.BASE || '127.0.0.1';

swaggerDocument.servers.forEach(server => {
    server.url = server.url.replace('{{hostname}}', HOSTNAME || 'localhost');
    server.url = server.url.replace('{{port}}', PORT || '3000');
});

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Dummy data for users
const users = [
    { id: 1, name: 'John Doea1', email: 'john@example.com' },
    { id: 2, name: 'Alice Smith', email: 'alice@example.com' }
];

// Route to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Route to get a user by ID
app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.json(user);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
