const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CategoriesController = {
  getAllCategories: async (req, res) => {
    const categories = await prisma.category.findMany({
      include: {
        parent: true
      }
    });
    res.render('admin/categories/index', { categories });
  },

  showCreateForm: async (req, res) => {
    const categories = await prisma.category.findMany({
      where: { parentId: null }
    });

    res.render('admin/categories/create', { categories });
  },

  createCategory: async (req, res) => {
    try {
      const { name, parentId } = req.body;
      await prisma.category.create({
        data: {
          name,
          parentId: parentId === '0' ? null : parseInt(parentId, 10)
        }
      });

      res.redirect('/admin/categories');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  showEditForm: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id, 10) }
      });
      if(!category){
        return res.status(404).render('pages/notFound');
      }
      const categories = await prisma.category.findMany({
        where: { 
          AND: [
            {parentId: null},
            {id: { not: parseInt(id, 10)}}
          ]
        }
      });
      res.render('admin/categories/edit', { category, categories });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, parentId } = req.body;
      const data = {
        name,
        parentId: parentId === '0' ? null : parseInt(parentId, 10)
      };
      await prisma.category.update({
        where: { id: parseInt(id, 10) },
        data
      });
      res.redirect('/admin/categories');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.category.delete({
        where: { id: parseInt(id, 10)}
      });
      res.redirect('/admin/categories');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = CategoriesController;