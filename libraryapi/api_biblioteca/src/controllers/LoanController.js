const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User');

const LoanController = {
  async create(req, res) {
    try {
      const { userId, bookId, returnDate } = req.body;
      
      // Verificar se o livro está disponível
      const book = await Book.findByPk(bookId);
      if (!book.available) {
        return res.status(400).json({ error: 'Book is not available' });
      }

      // Verificar número de empréstimos ativos do usuário
      const activeLoans = await Loan.count({
        where: {
          userId,
          returned: false
        }
      });

      if (activeLoans >= 3) {
        return res.status(400).json({ error: 'User has reached maximum number of loans' });
      }

      // Criar empréstimo e atualizar disponibilidade do livro
      const loan = await Loan.create({
        userId,
        bookId,
        returnDate
      });

      await book.update({ available: false });

      return res.status(201).json(loan);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async returnBook(req, res) {
    try {
      const loan = await Loan.findByPk(req.params.id);
      if (!loan) return res.status(404).json({ error: 'Loan not found' });

      await loan.update({ returned: true });
      await Book.update({ available: true }, { where: { id: loan.bookId } });

      return res.json(loan);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const loans = await Loan.findAll({
        include: [
          { model: Book },
          { model: User }
        ]
      });
      return res.json(loans);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getOverdueLoans(req, res) {
    try {
      const overdueLoans = await Loan.findAll({
        where: {
          returned: false,
          returnDate: {
            [Op.lt]: new Date()
          }
        },
        include: [
          { model: Book },
          { model: User }
        ]
      });
      return res.json(overdueLoans);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = LoanController;