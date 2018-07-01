const book = require('./controllers/books')

module.exports = (app) => {
	// app.get('/books/:id', book.getOne)
	app.get('/', book.getAll)
	app.get('/create', book.getCreate)
	app.post('/create', book.postCreate)

	app.get('/:title/view', book.getView)
	// app.post('/:id/view', book.postEdit)

	app.get('/:id/edit', book.getEdit)
	app.post('/:id/edit', book.postEdit)

	// app.put('/:id/edit', book.edit)
	// app.get('/:title/:id', book.view)
	app.get('/:id', book.getDelete)
}