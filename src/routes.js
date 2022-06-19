const {
	saveTheBook, getAllBooks
} = require('./handler');

const routes = [{
	method: 'POST',
	path: '/books',
	handler: saveTheBook
}, {
	method: 'GET',
	path: '/books',
	handler: getAllBooks
}];

module.exports = routes;