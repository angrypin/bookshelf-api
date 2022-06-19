const {
	saveTheBook, getAllBooks, getOneBook, updateBook
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
}];

module.exports = routes;