const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BannersController = {
  getAllBanners: async (req, res) => {
    const banners = await prisma.banner.findMany();
    res.render('admin/banners/index', { banners });
  },

  showEditForm: async (req, res) => {
    try {
      const { id } = req.params;
      const banner = await prisma.banner.findUnique({
        where: { id: parseInt(id, 10) }
      });
      if(!banner){
        return res.status(404).render('pages/notFound');
      }
        
      res.render('admin/banners/edit', { banner });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateBanner: async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    let newData = { text };
    if (req.file) {
      const photoPath = req.file.path;
      newData.photo = `/${photoPath.replace('\\', '/')}`;
    }
    
    try {
      await prisma.banner.update({
        where: { id: parseInt(id, 10) },
        data: newData
      });

      res.redirect('/admin/banners');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  front: {
    getBanners: async (req, res) => {
      const banners = await prisma.banner.findMany();
      res.render('index', { banners, useHeaderBg: false });
    }
  }
};

module.exports = BannersController;