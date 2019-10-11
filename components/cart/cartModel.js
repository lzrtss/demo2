export class CartModel {
  constructor() {
  }

  initCartState() {
    this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(this.cartPoducts);
    if (!!this.cartProducts === false || this.cartProducts === 'undefined' || this.cartProducts === 'null') {
      this.cartProducts = [];
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    }
    // LABEL FOR CART
    const allProducts = JSON.parse(localStorage.getItem('products'));
    let totalAmount = 0;
    allProducts.forEach(prod => {
      totalAmount += prod.ordered;
    });
    this.totalAmount = totalAmount;
  }

  getPurchaseCounter() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    let totalAmount = 0;
    cartProducts.forEach(prod => {
      totalAmount += prod.ordered;
    });
    return totalAmount;
  }

  getAddedProducts() {
    return JSON.parse(localStorage.getItem('cartProducts'));
  }

  getProductData(prodID) {
    const allProducts = JSON.parse(localStorage.getItem('products'));
    return allProducts.find(prod => prod.id === prodID);
  }

  getCartData(prodID) {
    if (arguments.length === 0) {
      return this.cartProducts;
    }
    return this.cartProducts.find(prod => prod.id === prodID);
  }

  incProductCounterInCart(product) {
    product.ordered += 1;
  }

  addProdToCart(product) {
    this.cartProducts.push(product);
  }

  updateCartLS() {
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  removeProdFromCart(prodID) {
    const prod = this.cartProducts.find(prod => prod.id === prodID);
    const prodInd = this.cartProducts.indexOf(prod);
    this.cartProducts.splice(prodInd, 1);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  // addToCart(targetID) {
  //   // if (e.target.classList.contains('add-cart-btn')) {
  //   // const id = e.target.getAttribute('data-id');


  //   if (cartProducts.find(prod => prod.id === id)) {
  //     if (product.ordered < product.quantity) {
  //       cartProducts.forEach(prod => {
  //         if (prod.id == id) {
  //           prod.ordered += 1;
  //         }
  //       });
  //       product.ordered += 1;

  //     } else {
  //       // document.querySelector(`[data-id='${id}']`)
  //       //   .setAttribute('disabled', 'disabled'); // should be in View
  //     }
  //   } else if (product.ordered < product.quantity) {
  //     product.ordered += 1;
  //     cartProducts.push(product);
  //     localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  //   }

  //   localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  //   localStorage.setItem('products', JSON.stringify(allProducts));
  //   // }
  // }
}