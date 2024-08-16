const express = require('express');
const router = express.Router();
const CartRepository = require('../repositories/cartRepository');
const ProductRepository = require('../repositories/productRepository');
const TicketRepository = require('../repositories/ticketRepository');
const authorization = require('../middleware/authorization');

router.post('/:cid/purchase', authorization('user'), async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartRepository = new CartRepository();
        const productRepository = new ProductRepository();
        const ticketRepository = new TicketRepository();

        const cart = await cartRepository.getCartById(cartId);
        const productsNotPurchased = [];

        let totalAmount = 0;

        for (let item of cart.products) {
            const product = await productRepository.getProductById(item.productId);

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                totalAmount += product.price * item.quantity;
                await productRepository.updateProduct(product._id, product);
            } else {
                productsNotPurchased.push(item.productId);
            }
        }

        if (totalAmount > 0) {
            const ticket = await ticketRepository.createTicket({
                code: generateUniqueCode(),
                amount: totalAmount,
                purchaser: req.user.email
            });

            cart.products = cart.products.filter(item =>
                !productsNotPurchased.includes(item.productId)
            );

            await cartRepository.updateCart(cart._id, cart);

            return res.json({ ticket, productsNotPurchased });
        } else {
            return res.status(400).json({ message: 'No products could be purchased', productsNotPurchased });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete purchase' });
    }
});

module.exports = router;

function generateUniqueCode() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}