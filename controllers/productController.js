const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const ProductsController = {
  getAllProducts: async (req, res) => {
    const products = await prisma.product.findMany({
      include: {
        categories: true
      }
    });
    res.render('admin/products/index', { products });
  },

  showCreateForm: async (req, res) => {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: true
      }
    });

    res.render('admin/products/create', { categories });
  },

  createProduct: async (req, res) => {
    try {
      const { name, description, manufacturer, color, volume, vendorCode, categories } = req.body;
      let photoUrl = '';
      let validCategories = categories;
      
      if(req.file){
        const photoPath = req.file.path;
        photoUrl = `/${photoPath.replaceAll('\\', '/')}`;
      }

      if(!Array.isArray(validCategories)){
        validCategories = validCategories ? [validCategories] : [];
      }

      await prisma.product.create({
        data: {
          name,
          description,
          photo: photoUrl,
          manufacturer,
          color: color || null,
          volume: parseFloat(volume),
          vendorCode,
          categories: {
            connect: validCategories.map((categoryId) => ({ id: parseInt(categoryId) }))
          }
        }
      });
      res.redirect('/admin/products');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  showEditForm: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
          categories: true
        }
      });
      if(!product){
        return res.status(404).render('pages/notFound');
      }
      const categories = await prisma.category.findMany({
        include: {
          children: true
        }
      });

      res.render('admin/products/edit', { product, categories });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, manufacturer, color, volume, vendorCode, categories } = req.body;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      let photoUrl = product.photo;
      
      if(req.file){
        const photoPath = req.file.path;
        photoUrl = `/${photoPath.replaceAll('\\', '/')}`;
        
        if (product && product.photo) {
          const filePath = path.join(__dirname, '..', ...product.photo.split('/'));
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
      
      const data = {
        name,
        description,
        manufacturer,
        color,
        photo: photoUrl,
        volume: parseFloat(volume),
        vendorCode,
        categories: {
          connect: [...categories].map((categoryId) => ({ id: parseInt(categoryId) }))
        }
      }

      await prisma.product.update({
        where: { id: parseInt(id) },
        data
      })
      res.redirect('/admin/products');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });

      if (product && product.photo) {
        const filePath = path.join(__dirname, '..', ...product.photo.split('/'));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await prisma.product.delete({
        where: { id: parseInt(id) }
      });
      res.redirect('/admin/products');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = ProductsController;