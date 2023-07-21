// Create web server

// Import express
const express = require('express');
const app = express();

// Import morgan
const morgan = require('morgan');

// Import body-parser
const bodyParser = require('body-parser');

// Import mongoose
const mongoose = require('mongoose');

// Import models
const {Comments} = require('./models/comments');

// Import config
const {DATABASE_URL, PORT} = require('./config');

// Use morgan
app.use(morgan('common'));

// Use body-parser
app.use(bodyParser.json());

// Create GET request
app.get('/posts/:postId/comments', (req, res) => {
	Comments
		.find()
		.exec()
		.then(comments => {
			res.json(comments.map(comment => comment.apiRepr()));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Something went wrong'});
		});
});

// Create GET request
app.get('/posts/:postId/comments/:id', (req, res) => {
	Comments
		.findById(req.params.id)
		.exec()
		.then(comment => res.json(comment.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Something went wrong'});
		});
});

// Create POST request
app.post('/posts/:postId/comments', (req, res) => {
	const requiredFields = ['text', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \'${field}\' in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Comments
		.create({
			text: req.body.text
        })
    });