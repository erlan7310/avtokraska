const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BannersController = {
  getAllBanners: async (req, res) => {
    const banners = await prisma.banner.findMany();
    res.render('admin/banners/index', { banners });
  },

  
};

module.exports = BannersController;