const books = require('./books');
const { nanoid } = require('nanoid');

const validate = (name, readPage, pageCount, isSave = true) => {
	const msg = isSave ? 'menambahkan' : 'memperbarui';
	if (name === undefined) {
		return {
			status: 'fail',
			message: `Gagal ${msg} buku. Mohon isi nama buku`
		};
	} else if (readPage > pageCount) {
		return {
			status: 'fail',
			message: `Gagal ${msg} buku. readPage tidak boleh lebih besar dari pageCount`
		};
	}
};

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
	const isInvalid = validate(name, readPage, pageCount);

	if (isInvalid) {
		return h.response(isInvalid).code(400);
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

			return { id, name, publisher };
		})
	}
});

const getOneBook = (req, h) => {
	const { bookId } = req.params;
	const book = books.filter(b => b.id === bookId)[0];

	if (book !== undefined) {
		return {
			status: 'success',
			data: {
				book
			}
		}
	}

	return h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan'
	})
		.code(404);
};

const updateBook = (req, h) => {
	const { bookId } = req.params;
	const {
		name, year, author,
		summary, publisher, pageCount,
		readPage, reading
	} = req.payload;
	const updatedAt = new Date().toISOString();
	const index = books.findIndex(book => book.id === bookId);
	const isInvalid = validate(name, readPage, pageCount, false);

	if (isInvalid) {
		return h.response(isInvalid).code(400);
	}

	if (index !== -1) {
		books[index] = {
			...books[index],
			name, year, author,
			summary, publisher, pageCount,
			readPage, reading, updatedAt
		};

		return {
			status: 'success',
			message: 'Buku berhasil diperbarui'
		}
	}

	return h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan'
	})
		.code(404);
}

module.exports = {
	saveTheBook,
	getAllBooks,
	getOneBook,
	updateBook
};