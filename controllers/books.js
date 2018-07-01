const resolve = require('path').resolve
var validator = require('validator');
const models = require('../models')
var uuid = require('uuid/v4');

module.exports = {
	// getOne: (req, res) => {
	// 	 res.send('get one')
	// },
	getAll: (req, res) => {
		  models.Book.findAll().then(function(books) {
		  	 // console.log(books)
		     res.render("index", {books: books});
		 });
		 
	},
	getCreate: (req, res) => {
		res.render("register", {warning: ""});
	},
	postCreate: (req, res) => {
		 const { isbn, title, author, published } = req.body
		 if (!validator.isISBN(isbn)) {
		 	res.render("register", {warning: "Wrong ISBN Number"});
		 	return
		 }

		 if (!validator.matches(title, /^[\w\-\s]+$/i)) {
		 	res.render("register", {warning: "Wrong Title"});
		 	return
		 }

		 if (!validator.matches(author, /^[\w\-\s]+$/i)) {
		 	res.render("register", {warning: "Wrong Author"});
		 	return		 
		 }

		 if (!validator.isNumeric(published)) {
		 	res.render("register", {warning: "Wrong Publisher(Just Numeric)"});
		 	return	 
		 }

		 models.Book.findOne({where: {isbn: isbn}})
		 .then(function(book) {
		 if (book) {
		 	res.render("register", {warning: "ISBN already exist"});
		 	return
		 }
		 })
		 req.body.uuid = uuid()

		 models.Book.create(req.body).then(function() {
		     // res.sendFile(resolve('./views/index.html'));
		 	res.redirect('/');
		 });

	},

	getView: (req, res) => {
		 const slug = req.params.title
		 const parts = String(slug).split("-")
		 const uuid = parts[parts.length - 1]
		 const title = slug.replace("-"+uuid, "")
		 models.Book.findOne(
		 	{
		 		where: {
		 			title: title
		 		}
		 	})
		 .then(function(book) {
		  	 console.log(book)

		     book ? res.render("view", {book: book}) : res.send("not found")
		 }).catch((err) => {
		 	console.log(err)
		 	res.send(err)
		 })
	},


	getEdit: (req, res) => {
		 models.Book.findOne({where: {isbn: req.params.id}})
		 .then(function(book) {
		  	 console.log(book)

		     book ? res.render("update", {book: book, warning: ""}) : res.send("not found")
		 }).catch((err) => {
		 	res.send(err)
		 })
	},

	postEdit: (req, res) => {
		 const { isbn, title, author, published } = req.body
		 const book = req.body
		 book.isbn = req.params.id

		 if (!validator.matches(title, /^[\w\-\s]+$/i)) {
		 	res.render("update", {warning: "Wrong Title", book: book});
		 	return
		 }

		 if (!validator.matches(author, /^[\w\-\s]+$/i)) {
		 	res.render("update", {warning: "Wrong Author", book: book});
		 	return		 
		 }

		 if (!validator.isNumeric(published)) {
		 	res.render("update", {warning: "Wrong Publisher(Just Numeric)", book: book});
		 	return	 
		 }

		 models.Book.findOne({where: {isbn: req.params.id}})
		 .then(function(book) {
		 if (book) {
		 	res.render("update", {warning: "ISBN already exist", book: book});
		 	return
		 }
		 })

		 models.Book.update({title: title, author: author, published: published }, {where: { isbn: req.params.id } })  
		 .then(function(book){
		 	res.redirect('/');
		 })

	},

	getDelete: (req, res) => {

		models.Book.destroy({
			where: {
				isbn: req.params.id
			}
		}).then(function() {
			res.redirect('/');
		});
		 
	},
}

