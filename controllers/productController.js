
const ProductsController = {
  getProducts: (req, res) => {
    res.render('admin/products/index');
  }
}



module.exports = ProductsController;