// Code Addapted from number 7 on 'https://www.codehim.com/collections/javascript-shopping-cart-examples-with-demo/'


"clickEventuse strict";
let cart = [];
let cartTotal = 0;
const cartDom = document.querySelector(".cart");
const addtocartbtnDom = document.querySelectorAll('[data-action="add-to-cart"]');

// Own Code for new offcanvas cart
const cartButton = document.querySelector("#cartButton") // Button for offcanvas on extra small devices
cartButton.addEventListener("click", updateCart); // When offcanvas cart is opened
function updateCart() {
  document.querySelector(".offcanvas-cart").innerHTML = '' // Set the cart html to blank
  document.querySelector(".offcanvas-footer").innerHTML = ''
  try { // try and catch for debugging
    const clones = document.querySelectorAll('.cart-items'); // Get items from cart
    const clone2 = document.querySelector('.cart-footer').cloneNode(true); // Get footer from cart
    let count = 0
    clones.forEach(item1 => { // For each item in cart
      let item = item1.cloneNode(true) // Clone item
      const decrease = item.querySelector('[data-action="decrease-item"]') // Get decrease button
      decrease.dataset.action = ''
      decrease.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelectorAll('[data-action="decrease-item"]')[${count}].dispatchEvent(event);
      updateCart()
    }`) // Set button's onclick attribute to create a click event on the old button
      const remove = item.querySelector('[data-action="remove-item"]') // Get Remove button
      remove.dataset.action = ''
      remove.setAttribute('onclick', ` {
      const event = new Event("click")
      document.querySelectorAll('[data-action="remove-item"]')[${count}].dispatchEvent(event);
      updateCart()
    }`) // Set button's onclick attribute to create a click event on the old button
      const increase = item.querySelector('[data-action="increase-item"]') // Get Increase button
      increase.dataset.action = ''
      increase.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelectorAll('[data-action="increase-item"]')[${count}].dispatchEvent(event);
      updateCart()
    }`) // Set button's onclick attribute to create a click event on the old button
      document.querySelector(".offcanvas-cart").innerHTML += item.innerHTML // Add cart item to the cart
      count += 1
    });
    const clear = clone2.querySelector('[data-action="clear-cart"]') // Add Clear cart to offcanvas cart footer
    clear.dataset.action = ''
    clear.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelector('[data-action="clear-cart"]').dispatchEvent(event);
      updateCart()
    }`) // Set button's onclick attribute to create a click event on the old button
    const check = clone2.querySelector('[data-action="check-out"]') // Add Check out to offcanvas cart footer
    check.dataset.action = ''
    check.setAttribute('onclick', `{
      const event = new Event("click")
      document.querySelector('[data-action="check-out"]').dispatchEvent(event);
      updateCart()
    }`) // Set button's onclick attribute to create a click event on the old button
    document.querySelector(".offcanvas-footer").innerHTML = clone2.innerHTML // Add footer to offcanvas footer
  }
  catch (err) {
    console.log(err)
  }
}

// Adapted Code

addtocartbtnDom.forEach(addtocartbtnDom => { // For each add to cart button
  addtocartbtnDom.addEventListener("click", () => { // When button is clicked
    const productDom = addtocartbtnDom.parentNode.parentNode; // Get the product from the button
    const product = {
      img: productDom.querySelector(".product-img").getAttribute("src"), // Get product attributes
      name: productDom.querySelector(".product-name").innerText,
      price: productDom.querySelector(".product-price").innerText,
      quantity: 1
    };
    const IsinCart = cart.filter(cartItem => cartItem.name === product.name).length > 0; // Check if product is already in the cart
    if (IsinCart === false) { // If not in cart add the item to the cart be inserting the following html
      // HTML Edited to be more responsive and to fit the website better
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
        // HTML Edited to be more responsive and to fit the website better
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

      const cartItemsDom = cartDom.querySelectorAll(".cart-items"); // For all cart items
      cartItemsDom.forEach(cartItemDom => {
        // For all pricing changed from Rs. and £ after price to £ before the price.
        // Added replace functions to convert string with £ in to integer
        if (cartItemDom.querySelector(".cart_item_name").innerText === product.name) { // If item  is the product
          cartTotal += parseInt(cartItemDom.querySelector(".cart_item_quantity").innerText) // Add item price to cart total
            * parseInt(cartItemDom.querySelector(".cart_item_price").innerText.replace("£", ""));
          document.querySelector('.pay').innerText = "£" + cartTotal;
          // increase item in cart
          cartItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => { // If increase item button pressed
            cart.forEach(cartItem => { // For all items in cart
              if (cartItem.name === product.name) { // If item is the product
                cartItemDom.querySelector(".cart_item_quantity").innerText = ++cartItem.quantity; // Increase quanity
                cartItemDom.querySelector(".cart_item_price").innerText = "£" + parseInt(cartItem.quantity) *
                  parseInt(cartItem.price.replace("£", "")); // Increase price
                cartTotal += parseInt(cartItem.price.replace("£", ""))
                document.querySelector('.pay').innerText = "£" + cartTotal; // Increase cart total
              }
            });
          });
          // decrease item in cart
          cartItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => { // If decrease item button pressed
            cart.forEach(cartItem => { // For all items in cart
              if (cartItem.name === product.name) { // If item is the product
                if (cartItem.quantity > 1) {
                  cartItemDom.querySelector(".cart_item_quantity").innerText = --cartItem.quantity; // Decrease quanity
                  cartItemDom.querySelector(".cart_item_price").innerText = "£" + parseInt(cartItem.quantity) *
                    parseInt(cartItem.price.replace("£", "")); // Decrease price
                  cartTotal -= parseInt(cartItem.price.replace("£", ""))
                  document.querySelector('.pay').innerText = "£" + cartTotal; // Decrease cart total
                }
              }
            });
          });
          //remove item from cart
          cartItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => { // If Remove item button pressed
            cart.forEach(cartItem => { // For all items in cart
              if (cartItem.name === product.name) { // If item is the product
                cartTotal -= parseInt(cartItemDom.querySelector(".cart_item_price").innerText.replace("£", "")); // Decrease cart total
                document.querySelector('.pay').innerText = "£" + cartTotal;
                cartItemDom.remove(); // Remove item from cart
                cart = cart.filter(cartItem => cartItem.name !== product.name); // Remove item from cart list
                addtocartbtnDom.innerText = "Add to cart"; // Change button to say add to cart
                addtocartbtnDom.disabled = false;
              }
              if (cart.length < 1) { // If the cart is empy
                document.querySelector('.cart-footer').remove(); // Remove cart footer
              }
            });
          });

          //clear cart
          document.querySelector('[data-action="clear-cart"]').addEventListener("click", () => { // If clear cart button pressed
            cartItemDom.remove(); // Remove items from cart
            cart = []; // Reset cart list
            cartTotal = 0; // Reset cart total
            if (document.querySelector('.cart-footer') !== null) { // If their is a cart footer
              document.querySelector('.cart-footer').remove(); // Remove cart footer
            }
            addtocartbtnDom.innerText = "Add to cart"; // Change button to say add to cart
            addtocartbtnDom.disabled = false;
          });

          document.querySelector('[data-action="check-out"]').addEventListener("click", () => { // If checkout button pressed
            if (document.getElementById('paypal-form') === null) { // If paypal from is empty
              checkOut(); // Checkout
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
