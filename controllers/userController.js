const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const UserController = {
	getAllUsers: async (req, res) => {
		const users = await prisma.user.findMany({
			include: {
				role: true
			}
		});
		res.render('admin/users/index', { users });
	},

	showCreateForm: async (req, res) => {
		const roles = await prisma.role.findMany();
		res.render('admin/users/create', { roles });
	},

	createUser: async (req, res) => {
		try {
			const { surname, name, patronymic, username, password, roleId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          surname,
          name,
          patronymic,
          username,
          password: hashedPassword,
          roleId: parseInt(roleId, 10)
        },
      });
      res.redirect('/admin/users');
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	showEditForm: async (req, res) => {
		try {
			const { id } = req.params;
			const user = await prisma.user.findUnique({
				where: { id: parseInt(id, 10) }
			});
			if(!user){
				return res.status(404).render('pages/notFound');
			}
			const roles = await prisma.role.findMany();
			res.render('admin/users/edit', { user, roles });
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	updateUser: async (req, res) => {
		try {
			const { id } = req.params;
			const { surname, name, patronymic, username, roleId } = req.body;
			const data = {
				surname,
				name,
				patronymic,
				username,
				roleId: parseInt(roleId, 10)
			};

			await prisma.user.update({
				where: { id: parseInt(id, 10) },
				data
			});
			res.redirect('/admin/users');
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	deleteUser: async (req, res) => {
		try {
			const { id } = req.params;
			await prisma.user.delete({
				where: { id: parseInt(id, 10) }
			});
			res.redirect('/admin/users');
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	changePassword: async (req, res) => {
		try {
			const { userId, password } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);

			const data = {
				password: hashedPassword
			};

			await prisma.user.update({
				where: { id: userId },
				data
			});

			res.json({ message: "Пароль успешно изменен. На серв" });
		} catch (error) {
			res.status(500).json({ message: "Ошибка при смене пароля.", error: error.message });
		}
	}
}

module.exports = UserController;