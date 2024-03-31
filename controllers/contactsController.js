const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ContactsController = {
  front: {
    getContacts: async (req, res) => {
      res.render('contacts', { useHeaderBg: true });
    }
  }
};

module.exports = ContactsController;