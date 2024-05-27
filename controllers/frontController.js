const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { formatDate, truncateText, extractTextFromHTML, calculatePageRange } = require('../utils');

const FrontController = {
  getMain: async (req, res) => {
    const banners = await prisma.banner.findMany();
    const products = await prisma.product.findMany({
      where: {
        topSellers: true
      },
      take: 9,
      orderBy: {
        id: 'desc'
      }
    });
    const news = await prisma.news.findMany({
      take: 4,
      orderBy: {
        updatedAt: 'desc'
      }
    });
    const categories = await prisma.category.findMany({
      where: {
        parentId: null
      },
      include: {
        children: true
      }
    })

    res.render('index', { 
      banners,
      products,
      news,
      categories,
      formatDate,
      truncateText,
      extractTextFromHTML,
      useHeaderBg: false 
    });
  },
  getProducts: async (req, res) => {
    const productId = req.query.productId;
    const categoryId = req.query.categoryId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;
    const skip = (page - 1) * pageSize;
    const whereClause = {};

    if(categoryId){
      whereClause.categories = {
        some: {
          id: parseInt(categoryId)
        }
      }
    }

    const [products, totalItems] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        take: pageSize,
        skip: skip,
      }),
      prisma.product.count({
        where: whereClause
      }),
    ]);
    const totalPages = Math.ceil(totalItems / pageSize);

    const news = await prisma.news.findMany({
      take: 4,
      orderBy: {
        updatedAt: 'desc'
      }
    });
    const categories = await prisma.category.findMany({
      where: {
        parentId: null
      },
      include: {
        children: true
      }
    })
    res.render('catalog', { 
      products,
      currentPage: page,
      totalPages,
      news,
      categories,
      categoryId,
      productId,
      formatDate,
      truncateText,
      calculatePageRange,
      extractTextFromHTML, 
      useHeaderBg: true 
    });
  },
  getProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
          categories: true
        }
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Произошла ошибка при получении информации о продукте' });
    }
  },
  getNews: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;
    const skip = (page - 1) * pageSize;
    const categories = await prisma.category.findMany({
      where: {
        parentId: null
      },
      include: {
        children: true
      }
    });

    const [news, totalItems] = await Promise.all([
      prisma.news.findMany({
        take: pageSize,
        skip: skip,
      }),
      prisma.news.count(),
    ]);
    const totalPages = Math.ceil(totalItems / pageSize);
    
    res.render('news', { 
      news,
      currentPage: page,
      totalPages,
      categories,
      formatDate,
      truncateText,
      calculatePageRange,
      extractTextFromHTML,  
      useHeaderBg: true 
    });
  },
  getNewsById: async (req, res) => {
    const { id } = req.params;
    const categories = await prisma.category.findMany({
      where: {
        parentId: null
      },
      include: {
        children: true
      }
    });
    const news = await prisma.news.findUnique({
      where: { id: parseInt(id)},
      include: {
        user: true
      }
    });

    res.render('oneNews', { useHeaderBg: true, news, categories, formatDate });
  },
  getContacts: async (req, res) => {
    const news = await prisma.news.findMany({
      take: 4,
      orderBy: {
        updatedAt: 'desc'
      }
    });
    const categories = await prisma.category.findMany({
      where: {
        parentId: null
      },
      include: {
        children: true
      }
    });

    res.render('contacts', { 
      news,
      categories,
      formatDate,
      truncateText,
      extractTextFromHTML, 
      useHeaderBg: true 
    });
  },
  searchProducts: async (req, res) => {
    const search = req.query.search;
    try {
      const products = await prisma.product.findMany({
        where: {
          name: {
            startsWith: search
          }
        }
      });

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Произошла ошибка при получении информации о продукте' });
    }
    
  }
}

module.exports = FrontController;