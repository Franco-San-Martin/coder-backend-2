const Product = require('../../models/Product');

class ProductDao {
    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async getProducts(query = {}) {
        return await Product.find(query);
    }

    async updateProduct(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductDao;