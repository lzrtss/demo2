export default class Templater {
  constructor(link) {
    this.elements = [];
    this.isCatch = false;
    this.isLoad = false;

    fetch(link)
      .then(response => response.text())
      .then(result => {
        this.template = result;
        this.isLoad = true;
        this.isCatch ? this.render() : null;
      });
  }

  load(objProduct, domNode) {
    if (this.isLoad) {
      this.show(objProduct, domNode);
    } else {
      this.isCatch = true;
      this.elements.push({
        objProduct,
        domNode
      });
    }
  }

  render() {
    this.elements.forEach(({ objProduct, domNode }) => {
      this.show(objProduct, domNode);
    });
  }

  show(objProduct, domNode) {
    const node = domNode;
    let htmlData = this.template;
    for (const key in objProduct) {
      const re = new RegExp(`{{${key}}}`, "g");
      htmlData = htmlData.replace(re, objProduct[key]);
    }
    node.innerHTML += htmlData;
  }
}










// const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
// let fragment = document.createElement('div');
// cartProducts.forEach(prod => {
//   let elem = document.createElement('div');
//   this.templater.load(prod, elem);
//   fragment.append(elem);
// });

// console.log(this.cartDiv);
// console.log(fragment);
// console.log(cartProducts);
// this.cartDiv.append(fragment.innerHTML);