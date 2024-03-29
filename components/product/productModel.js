export class ProductModel {
  getProducts() {
    if (localStorage.getItem('products')) {
      return Promise.resolve(JSON.parse(localStorage.getItem('products')));
    } else {
      return fetch('./data/goods.json')
        .then(products => products.json())
        .then(products => {
          products.forEach(prod => {
            prod.statusFilter = [];
            prod.ordered = false;
            prod.orderedQty = 0;
          });
          localStorage.setItem('products', JSON.stringify(products));
          localStorage.setItem('notSortedProducts', JSON.stringify(products));

          return products.filter(prodObj => prodObj.statusFilter.length === 0);
        });
    }
  }

}