
"clickEventuse strict";
let cart = [];
let cartTotal = 0;
const cartDom = document.querySelector(".cart");
const addtocartbtnDom = document.querySelectorAll('[data-action="add-to-cart"]');

const cartButton = document.querySelector("#cartButton")
cartButton.addEventListener("click", updateCart);
function updateCart() {
  document.querySelector(".offcanvas-cart").innerHTML = ''
  document.querySelector(".offcanvas-footer").innerHTML = ''
  try {
    const clones = document.querySelectorAll('.cart-items');
    const clone2 = document.querySelector('.cart-footer').cloneNode(true);
    let count = 0
    clones.forEach(item1 => {
      let item = item1.cloneNode(true)
      const decrease = item.querySelector('[data-action="decrease-item"]')
      decrease.dataset.action = ''
      decrease.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelectorAll('[data-action="decrease-item"]')[${count}].dispatchEvent(event);
      updateCart()
    }`)
      const remove = item.querySelector('[data-action="remove-item"]')
      remove.dataset.action = ''
      remove.setAttribute('onclick', ` {
      const event = new Event("click")
      document.querySelectorAll('[data-action="remove-item"]')[${count}].dispatchEvent(event);
      updateCart()
    }`)
      const increase = item.querySelector('[data-action="increase-item"]')
      increase.dataset.action = ''
      increase.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelectorAll('[data-action="increase-item"]')[${count}].dispatchEvent(event);
      updateCart()
    }`)
      document.querySelector(".offcanvas-cart").innerHTML += item.innerHTML
      count += 1
    });
    const clear = clone2.querySelector('[data-action="clear-cart"]')
    clear.dataset.action = ''
    clear.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelector('[data-action="clear-cart"]').dispatchEvent(event);
      updateCart()
    }`)
    const check = clone2.querySelector('[data-action="check-out"]')
    check.dataset.action = ''
    check.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelector('[data-action="check-out"]').dispatchEvent(event);
      updateCart()
    }`)
    document.querySelector(".offcanvas-footer").innerHTML = clone2.innerHTML
  }
  catch (err) {
    console.log(err)
  }
}
addtocartbtnDom.forEach(addtocartbtnDom => {
  addtocartbtnDom.addEventListener("click", () => {
    const productDom = addtocartbtnDom.parentNode.parentNode;
    const product = {
      img: productDom.querySelector(".product-img").getAttribute("src"),
      name: productDom.querySelector(".product-name").innerText,
      price: productDom.querySelector(".product-price").innerText,
      quantity: 1
    };
    const IsinCart = cart.filter(cartItem => cartItem.name === product.name).length > 0;
    if (IsinCart === false) {
      cartDom.insertAdjacentHTML("beforeend", `
  <div class="row cart-items mt-2 mb-3 p-2 animated flipInX border">
    <div class="col-md-3 col-sm-4 col-5 p-2">
        <img src="${product.img}" alt="${product.name}" style="max-width: 60px;"/>
    </div>
    <div class="col-md-3 col-sm-5 col-5 p-2 mt-0">
        <p class=" cart_item_name">${product.name}</p>
    </div>
    <div class="col-md-2 col-sm-3 col-2 p-2 mt-0">
        <p class="cart_item_price">${product.price}</p>
    </div>
    <div class="d-md-none col-sm-2 col-2"></div>
    <div class="col-md-1 col-sm-2 col-2 p-2 mt-0 ml-auto">
        <button class="btn badge badge-secondary" type="button" data-action="increase-item">&plus;
    </div>
    <div class="col-md-1 col-sm-2 col-2 p-2 mt-0">
      <p class="cart_item_quantity">${product.quantity}</p>
    </div>
    <div class="col-md-1 col-sm-2 col-2 p-2 mt-0">
      <button class="btn badge badge-info" type="button" data-action="decrease-item">&minus;
    </div>
    <div class="col-md-1 col-sm-2 col-2 p-2 mt-0">
      <button class="btn badge badge-danger" type="button" data-action="remove-item">&times;
    </div>
  </div> `);

      if (document.querySelector('.cart-footer') === null) {
        cartDom.insertAdjacentHTML("afterend", `
      <div class="d-flex flex-row shadow-sm cart-footer mt-2 mb-3 animated flipInX border">
        <div class="p-2">
          <button class="btn btn-dark" type="button" data-action="clear-cart">Clear Cart
        </div>
        <div class="p-2 ml-auto">
          <button class="btn btn-dark" type="button" data-action="check-out">Pay <span class="pay"></span> 
            &#10137;
        </div>
      </div>`);
      }
      addtocartbtnDom.innerText = "In cart";
      addtocartbtnDom.disabled = true;
      cart.push(product);

      const cartItemsDom = cartDom.querySelectorAll(".cart-items");
      cartItemsDom.forEach(cartItemDom => {
        if (cartItemDom.querySelector(".cart_item_name").innerText === product.name) {
          cartTotal += parseInt(cartItemDom.querySelector(".cart_item_quantity").innerText)
            * parseInt(cartItemDom.querySelector(".cart_item_price").innerText.replace("£", ""));
          document.querySelector('.pay').innerText = "£" + cartTotal;
          // increase item in cart
          cartItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                cartItemDom.querySelector(".cart_item_quantity").innerText = ++cartItem.quantity;
                cartItemDom.querySelector(".cart_item_price").innerText = "£" + parseInt(cartItem.quantity) *
                  parseInt(cartItem.price.replace("£", ""));
                cartTotal += parseInt(cartItem.price.replace("£", ""))
                document.querySelector('.pay').innerText = "£" + cartTotal;
              }
            });
          });
          // decrease item in cart
          cartItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                  cartItemDom.querySelector(".cart_item_quantity").innerText = --cartItem.quantity;
                  cartItemDom.querySelector(".cart_item_price").innerText = "£" + parseInt(cartItem.quantity) *
                    parseInt(cartItem.price.replace("£", ""));
                  cartTotal -= parseInt(cartItem.price.replace("£", ""))
                  document.querySelector('.pay').innerText = "£" + cartTotal;
                }
              }
            });
          });
          //remove item from cart
          cartItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                cartTotal -= parseInt(cartItemDom.querySelector(".cart_item_price").innerText.replace("£", ""));
                document.querySelector('.pay').innerText = "£" + cartTotal;
                cartItemDom.remove();
                cart = cart.filter(cartItem => cartItem.name !== product.name);
                addtocartbtnDom.innerText = "Add to cart";
                addtocartbtnDom.disabled = false;
              }
              if (cart.length < 1) {
                document.querySelector('.cart-footer').remove();
              }
            });
          });

          //clear cart
          document.querySelector('[data-action="clear-cart"]').addEventListener("click", () => {
            cartItemDom.remove();
            cart = [];
            cartTotal = 0;
            if (document.querySelector('.cart-footer') !== null) {
              document.querySelector('.cart-footer').remove();
            }
            addtocartbtnDom.innerText = "Add to cart";
            addtocartbtnDom.disabled = false;
          });

          document.querySelector('[data-action="check-out"]').addEventListener("click", () => {
            if (document.getElementById('paypal-form') === null) {
              checkOut();
            }
          });
        }
      });
    }
  });
});

function animateImg(img) {
  img.classList.add("animated", "shake");
}

function normalImg(img) {
  img.classList.remove("animated", "shake");
}

function checkOut() {
  let paypalHTMLForm = `'
  <form id="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" >
    <input type="hidden" name="cmd" value="_cart">
    <input type="hidden" name="upload" value="1">
    <input type="hidden" name="business" value="gmanish478@gmail.com">
    <input type="hidden" name="currency_code" value="INR">`;

  cart.forEach((cartItem, index) => {
    ++index;
    paypalHTMLForm += ` <input type="hidden" name="item_name_${index}" value="${cartItem.name}">
    <input type="hidden" name="amount_${index}" value="${cartItem.price.replace("£.", "")}">
    <input type="hidden" name="quantity_${index}" value="${cartItem.quantity}">`;
  });
  paypalHTMLForm += `<input type="submit" value="PayPal" class="paypal">
  </form><div class="overlay">Please wait...</div>`;
  document.querySelector('body').insertAdjacentHTML("beforeend", paypalHTMLForm);
  document.getElementById("paypal-form").submit();
}
