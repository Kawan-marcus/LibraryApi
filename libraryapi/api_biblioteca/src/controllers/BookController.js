const Book = require('../models/Book');

const BookController = {
  async create(req, res) {
    try {
      const book = await Book.create(req.body);
      return res.status(201).json(book);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const books = await Book.findAll();
      return res.json(books);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      return res.json(book);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      await book.update(req.body);
      return res.json(book);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      await book.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = BookController;