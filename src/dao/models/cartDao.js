const Cart = require('../../models/Cart');

class CartDao {
    async createCart(cartData) {
        const cart = new Cart(cartData);
        return await cart.save();
    }

    async getCartById(id) {
        return await Cart.findById(id).populate('products.productId'); // Populate para obtener detalles del producto
    }

    async updateCart(id, updateData) {
        return await Cart.findByIdAndUpdate(id, updateData, { new: true }).populate('products.productId');
    }

    async deleteCart(id) {
        return await Cart.findByIdAndDelete(id);
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        const productIndex = cart.products.findIndex(p => p.productId.equals(productId));

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        return await cart.save();
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        cart.products = cart.products.filter(p => !p.productId.equals(productId));
        return await cart.save();
    }
}

module.exports = CartDao;