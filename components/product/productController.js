import { ProductView } from './productView.js';
import { ProductModel } from './productModel.js';

export class ProductController {
  constructor(observer) {
    this.observer = observer;
    this.model = new ProductModel();
    this.view = new ProductView();
    this.observer.subscribe('RenderProducts', this.sendProductsToRender.bind(this));
    this.handleEvents();
  }

  handleEvents() {
    this.view.handleEvents(this.updateProducts.bind(this));
  }

  updateProducts() {
    this.model.getProducts().then(products => this.view.render(products));
  }

  sendProductsToRender(products) {
    this.view.render(products);
  }
}