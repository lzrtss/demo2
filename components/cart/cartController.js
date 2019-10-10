import { CartView } from './cartView.js';
import { CartModel } from './cartModel.js';

export class CartController {
  constructor() {
    this.model = new CartModel();
    this.view = new CartView();
    // this.observer.subscribe('RenderCart', this.loadCart.bind(this)); // remove!
    this.handleEvents();
  }

  handleEvents() {
    this.view.handleEvents(
      this.loadCart.bind(this),
      this.addToCart.bind(this)
    );
  }

  loadCart() {
    const addedProducts = this.model.getAddedProducts();
    this.view.loadCart(addedProducts);
  }

  addToCart(e) {
    this.model.addToCart(e);
  }
}