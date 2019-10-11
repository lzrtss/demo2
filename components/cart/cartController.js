import { CartView } from './cartView.js';
import { CartModel } from './cartModel.js';

export class CartController {
  constructor() {
    this.model = new CartModel();
    this.view = new CartView();
    this.initCart();
  }

  initCart() {
    this.model.initCartState();
    this.renderCartBtnCounter();
    this.handleEvents();
  }

  renderCartBtnCounter() {
    const currentCounter = this.model.getPurchaseCounter();
    this.view.renderCartBtnCounter(currentCounter);
  }

  handleEvents() {
    this.view.handleEvents(
      this.loadCart.bind(this),
      this.addToCart.bind(this)
    );
  }

  loadCart() {
    const addedProducts = this.model.getAddedProducts();
    this.view.loadCart(addedProducts, this.removeProdFromCart.bind(this));
  }

  addToCart(e) {
    if (this.view.checkTargetBtn(e)) {
      const prodID = Number(this.view.getProdID(e, 'data-id'));
      const productData = this.model.getProductData(prodID);

      this.model.incProductCounterInCart(productData);
      this.model.addProdToCart(productData);
      if (productData.orderedQty >= productData.quantity) {
        this.view.disableBuyBtn(prodID);
      }
    }
    this.model.updateCartLS();
    this.model.initCartState();
    this.renderCartBtnCounter();


    // if (this.view.checkTargetBtn(e)) {
    //   const prodID = Number(this.view.getProdID(e, 'data-id'));
    //   const productData = this.model.getProductData(prodID);
    //   const cartProductData = this.model.getCartData(prodID);

    //   if (!!cartProductData === true) {
    //     this.model.incProductCounterInCart(cartProductData);
    //     if (cartProductData.ordered >= cartProductData.quantity) {
    //       this.view.disableBuyBtn(prodID);
    //     }
    //   } else {
    //     this.model.incProductCounterInCart(productData);
    //     this.model.addProdToCart(productData);
    //     if (productData.ordered >= productData.quantity) {
    //       this.view.disableBuyBtn(prodID);
    //     }
    //   }
    //   this.model.updateCartLS();
    //   this.renderCartBtnCounter();
    // }
  }

  removeProdFromCart(e) {
    const prodID = Number(this.view.getProdID(e, 'data-remove-id'));

    this.model.removeProdFromCart(prodID);
    this.model.updateCartLS();
    this.model.initCartState();
    this.renderCartBtnCounter();
    this.loadCart();
  }

}