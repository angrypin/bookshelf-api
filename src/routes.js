const {
	saveTheBook
} = require('./handler');

const routes = [{
	method: 'POST',
	path: '/books',
	handler: saveTheBook
}];

module.exports = routes;