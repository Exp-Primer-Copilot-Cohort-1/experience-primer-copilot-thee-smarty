// Create web server


// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

//Handle requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests
app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments.json'));
});

// Handle POST requests
app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')));
    const newComment = {
        id: comments.length + 1,
    };
    Object.assign(newComment, req.body);
    comments.push(newComment);
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2));
    res.send(newComment);
});
