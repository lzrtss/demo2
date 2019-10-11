export class CartModel {
  initCartState() {
    this.allProducts = JSON.parse(localStorage.getItem('products'));
    this.cartProducts = this.allProducts.filter(prod => prod.ordered === true);
  }

  getPurchaseCounter() {
    let totalAmount = 0;
    this.cartProducts.forEach(prod => {
      totalAmount += prod.orderedQty;
    });
    return totalAmount;
  }

  getAddedProducts() {
    return this.cartProducts;
  }

  getProductData(prodID) {
    return this.allProducts.find(prod => prod.id === prodID);
  }

  incProductCounterInCart(product) {
    product.orderedQty += 1;
  }

  addProdToCart(product) {
    product.ordered = true;
  }

  updateCartLS() {
    localStorage.setItem('products', JSON.stringify(this.allProducts));
  }

  removeProdFromCart(prodID) {
    const prod = this.cartProducts.find(prod => prod.id === prodID);
    prod.ordered = false;
    prod.orderedQty = 0;
  }

}