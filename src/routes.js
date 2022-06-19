const {
	saveTheBook, getAllBooks, getOneBook
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
}];

module.exports = routes;