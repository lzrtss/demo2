import Templater from '../../src/templater.js';

export class CartView {
  constructor() {
    this.cartBtn = document.querySelector('#cart-btn');
    this.templater = new Templater('./components/cart/cart.html');
    this.cartDiv = document.querySelector('#cart-placeholder');
    this.allProducts = document.querySelector('#products');
  }

  handleEvents(loadCart, addToCart) {
    this.cartBtn.addEventListener('click', loadCart);
    this.allProducts.addEventListener('click', (e) => addToCart(e));
  }

  renderCartBtnCounter(totalAmount) {
    document.querySelector('#cart-number').innerHTML = totalAmount;
  }

  loadCart(cartProducts, callback) {
    this.templater.load({}, this.cartDiv);

    let data = cartProducts.map(product => `
    <tr>
      <td class="w-25">
        <img src="${product.url}" class="img-fluid img-thumbnail" alt="Sheep">
      </td>
      <td>${product.name} (${product.gender})</td>
      <td>$${product.price}</td>
      <td class="qty">
        <!-- <select class="form-control">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select> -->
        <div class="quantity">
          <input type="button" class="px-1" value="-" class="minus">
          <input type="number" class="text-center" step="1" max="99" min="1" value="${product.orderedQty}" title="Qty" class="qty" size="4" disabled>
          <input type="button" class="px-1" value="+" class="plus">
        </div>
      </td>
      <td>
        <button class="btn btn-danger btn-sm cartRemoveBtn" data-remove-id="${product.id}">
          <i class="fa fa-times" data-remove-id="${product.id}"></i>
        </button>
      </td>
    </tr>
    `).join(' ');

    let container = this.cartDiv.querySelector('.tableContainer');
    container.innerHTML = data;

    const btns = document.querySelectorAll('.cartRemoveBtn');

    [...btns].forEach(btn => {
      btn.addEventListener('click', (e) => callback(e));
    });
  }

  getProdID(e, attrName) {
    return e.target.getAttribute(attrName);
  }

  checkTargetBtn(e) {
    return e.target.classList.contains('add-cart-btn');
  }

  disableBuyBtn(prodID) {
    document.querySelector(`[data-id='${prodID}']`).setAttribute('disabled', 'true');
  }
}
