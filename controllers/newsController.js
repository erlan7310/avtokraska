const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');
const { cleanSrcInContent } = require('../utils');

const NewsController = {
  getAllNews: async (req, res) => {
    const news = await prisma.news.findMany({
      include: {
        user: true
      }
    });
    res.render('admin/news/index', { news });
  },

  showCreateForm: (req, res) => {
    res.render('admin/news/create');
  },

  createNews: async (req, res) => {
    try {
      const { title, content } = req.body;
      let photoUrl = '';
      if(req.file){
        const photoPath = req.file.path;
        photoUrl = `/${photoPath.replaceAll('\\', '/')}`;
      }

      await prisma.news.create({
        data: {
          title,
          content: cleanSrcInContent(content),
          previewPhoto: photoUrl,
          userId: req.session.userId
        }
      });
      res.redirect('/admin/news');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  showEditForm: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: { id: parseInt(id) }
      });
     
      if(!news){
        return res.status(404).render('pages/notFound');
      }

      res.render('admin/news/edit', { news });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateNews: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const news = await prisma.news.findUnique({
        where: { id: parseInt(id) },
      });
      let photoUrl = news.previewPhoto;
      if(req.file){
        const photoPath = req.file.path;
        photoUrl = `/${photoPath.replaceAll('\\', '/')}`;

        if (news && news.previewPhoto) {
          const filePath = path.join(__dirname, '..', ...news.previewPhoto.split('/'));
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }

      const data = {
        title,
        content: cleanSrcInContent(content),
        previewPhoto: photoUrl,
      }

      await prisma.news.update({
        where: { id: parseInt(id) },
        data
      })
      res.redirect('/admin/news');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteNews: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: { id: parseInt(id) },
      });

      if (news && news.previewPhoto) {
        const filePath = path.join(__dirname, '..', ...news.previewPhoto.split('/'));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await prisma.news.delete({
        where: { id: parseInt(id) }
      });
      res.redirect('/admin/news');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  front: {
    getNews: async (req, res) => {
      const news = await prisma.news.findMany({
        include: {
          user: true
        }
      });
      res.render('news', { news, useHeaderBg: true });
    }
  }
}

module.exports = NewsController;