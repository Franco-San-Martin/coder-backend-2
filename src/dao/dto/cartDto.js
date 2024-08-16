class CartDto {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(p => ({
            productId: p.productId._id,
            productName: p.productId.name,
            quantity: p.quantity,
            price: p.productId.price
        }));
        this.totalAmount = this.products.reduce((total, item) => total + item.quantity * item.price, 0);
    }
}

module.exports = CartDto;