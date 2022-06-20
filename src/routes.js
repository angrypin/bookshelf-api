const {
	saveTheBook, getAllBooks, getOneBook, updateBook, deleteBook
} = require('./handler');

const routes = [{
	method: 'POST',
	path: '/books',
	handler: saveTheBook
}, {
	method: 'GET',
	path: '/books',
	handler: getAllBooks
}, {
	method: 'GET',
	path: '/books/{bookId}',
	handler: getOneBook
}, {
	method: 'PUT',
	path: '/books/{bookId}',
	handler: updateBook
}, {
	method: 'DELETE',
	path: '/books/{bookId}',
	handler: deleteBook
}];

module.exports = routes;