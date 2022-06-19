const books = require('./books');
const { nanoid } = require('nanoid');

const saveTheBook = (req, h) => {
	const id = nanoid(16);
	const {
		name, year, author,
		summary, publisher, pageCount,
		readPage, reading
	} = req.payload;
	const finished = pageCount === readPage;
	const updatedAt = new Date().toISOString();
	const insertedAt = updatedAt;

	if (name === undefined) {
		return h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku'
		})
			.code(400);
	} else if (readPage > pageCount) {
		return h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
		})
			.code(400);
	}

	const newBook = {
		id, name, year,
		author, summary, publisher,
		pageCount, readPage, finished,
		reading, insertedAt, updatedAt
	};
	books.push(newBook);

	const isSaved = books.filter(book => book.id === id).length > 0;
	if (isSaved) {
		return h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id
			}
		})
			.code(201);
	}

	return h.response({
		status: 'fail',
		message: 'Buku gagal ditambahkan'
	})
		.code(500);
};

const getAllBooks = () => ({
	status: 'success',
	data: {
		books: books.map(book => {
			const {
				id, name, publisher
			} = book;

			return {id, name, publisher};
		})
	}
});



module.exports = {
	saveTheBook,
	getAllBooks
};