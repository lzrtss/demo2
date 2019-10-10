export class CartModel {
  getAddedProducts() {

    // ===========================================================

    // LABEL FOR CART
    const allProducts = JSON.parse(localStorage.getItem('products'));
    let totalAmount = 0;
    allProducts.forEach(prod => {
      totalAmount += prod.ordered;
    });

    document.querySelector('#cart-number').innerHTML = totalAmount; // should be in View!

    // ============================================================

    return JSON.parse(localStorage.getItem('cartProducts'));
  }

  addToCart(e) {
    if (e.target.classList.contains('add-cart-btn')) {

      const id = e.target.getAttribute('data-id');
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

      const allProducts = JSON.parse(localStorage.getItem('products'));
      const product = allProducts.find(prod => prod.id == id);

      if (cartProducts.find(prod => prod.id == id)) {
        if (product.ordered < product.quantity) {
          cartProducts.forEach(prod => {
            if (prod.id == id) {
              prod.ordered += 1;
            }
          });
          product.ordered += 1;

        } else {
          document.querySelector(`[data-id='${id}']`)
            .setAttribute('disabled', 'disabled'); // maybe should be in View???
        }
      } else if (product.ordered < product.quantity) {
        product.ordered += 1;
        cartProducts.push(product);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      }

      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      localStorage.setItem('products', JSON.stringify(allProducts));
    }
  }
}