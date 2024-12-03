const User = require('../models/User');

const UserController = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.update(req.body);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;