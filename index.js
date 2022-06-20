/* final project by shubham */

let product_list = fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product');

//creating section for clothing
const clothing = document.createElement('h2');
clothing.innerHTML = 'Clothing For Men and Women';
clothing.id = 'clothingsec';
//clothing div
const clothingConatiner = document.createElement('div');
clothingConatiner.classList.add('clothingcontainer');

//crearting Section for acc accessories
const accessories = document.createElement('h2');
accessories.innerHTML = 'Accessories For Men and Women';
accessories.id = 'accessoriessec';
//accessoriesdiv
const accessoriesContainer = document.createElement('div');
accessoriesContainer.classList.add('accessoriescontainer');

const mainContainer = document.querySelector('#maincontainer');

//adding to main container
mainContainer.append(accessoriesContainer);
mainContainer.prepend(accessories);
mainContainer.prepend(clothingConatiner);
mainContainer.prepend(clothing);

const localData = JSON.parse(localStorage.getItem('cart'));
console.log(localData);
let totalCartitems = 0;

if (JSON.parse(localStorage.getItem('cart')) !== null) {
  for (let i = 0; i < localData.length; i++) {
    totalCartitems += localData[i].quantity;
  }
}

//cart count
let cart = document.querySelector('#count');
if (JSON.parse(localStorage.getItem('cart')) == null) {
  cart.innerText = 0;
} else {
  cart.innerText = totalCartitems;
}

//// fetch api data
product_list
  .then((resp) => resp.json())
  .then((responseData) => {
    responseData.map((product) => {
      let box = document.createElement('div');
      box.classList.add('box');
      box.id = product.id;
      let productDescription = document.createElement('div');
      productDescription.classList.add('productdesc');
      box.appendChild(productDescription);

      let link = document.createElement('a');
      link.href = `product_det.html?id=${product.id}`;

      if (product.isAccessory === false) {
        //creating box for each product
        clothingConatiner.appendChild(link);
        clothingConatiner.appendChild(box);
        addProduct();
      } else {
        //creating box for each product
        accessoriesContainer.appendChild(box);
        addProduct();
      }

      // common function to add products
      function addProduct() {
        // fetching required product field details
        let productImg = document.createElement('img');
        let productTitle = document.createElement('h3');
        let productBrand = document.createElement('h5');
        let productPrice = document.createElement('h6');
        productImg.src = product.preview;

        // product.photos[Math.floor(Math.random() * product.photos.length)];
        productTitle.innerText = product.name;
        productBrand.innerText = product.brand;
        productPrice.innerText = `Rs ${product.price}`;

        // outer container for box
        let boxContainer = document.createElement('div');
        boxContainer.className = 'boxcontainer';

        box.appendChild(boxContainer);
        boxContainer.appendChild(link);
        link.appendChild(productDescription);
        // adding elements to box
        link.prepend(productImg);
        productDescription.appendChild(productTitle);
        productDescription.appendChild(productBrand);
        productDescription.appendChild(productPrice);
      }
    });
  })
  .catch((e) => {
    console.log(e);
  });
