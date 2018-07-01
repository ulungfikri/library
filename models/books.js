
module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {
	  isbn: {
	    type: Sequelize.STRING,
	    unique: true
	  },

	  title: {
	    type: Sequelize.STRING
	  },

	  author: {
	    type: Sequelize.STRING
	  },

	  published: {
	    type: Sequelize.STRING
	  },

	  uuid: {
	    type: Sequelize.UUID
	  },

	  createdAt: {
	    type: Sequelize.DATE
	  }

	})

	return Book
}