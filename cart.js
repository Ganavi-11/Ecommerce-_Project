
    const cartDiv = document.getElementById("cartItems");
    const orderSummaryDiv = document.getElementById("orderSummary");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
      cartDiv.innerHTML = "";
      let subtotal = 0;
      let shipping = 10;

      if (cart.length === 0) {
        cartDiv.innerHTML = "<p class='empty'>Your cart is empty </p><button class='continue-shopping-btn' onclick=\"window.location.href='./index.html'\">Continue Shopping</button>";
        orderSummaryDiv.innerHTML = "";
        return;
      }

      cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        cartDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}">
          <div class="cart-info">
            <h4>${item.title}</h4>
            <p>Price: $${item.price}</p>
            <div class="quantity-controls">
              <button onclick="decreaseQty(${index})">-</button>
              <span>Qty: ${item.qty}</span>
              <button onclick="increaseQty(${index})">+</button>
            </div>
            <p>Total: $${itemTotal.toFixed(2)}</p>
          </div>
          <div class="cart-actions">
            <button onclick="removeItem(${index})">Remove</button>
          </div>
        </div>
      `;
      });

      const total = subtotal + shipping;

      orderSummaryDiv.innerHTML = `
      <p>Product: $${subtotal.toFixed(2)}</p>
      <p>Shipping: $${shipping.toFixed(2)}</p>
      <p><strong>Total amount: $${total.toFixed(2)}</strong></p>
      <button class="checkout-btn" onclick="window.location.href='index.html'">Go and Check Out</button>
    `;
    }

    function removeItem(index) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCounter();
    }

    function increaseQty(index) {
      cart[index].qty += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCounter();
    }

    function decreaseQty(index) {
      if (cart[index].qty > 1) {
        cart[index].qty -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCounter();
      }
    }

    // Function to update cart counter
    function updateCartCounter() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      const cartLink = document.getElementById('cartLink');
      if (cartLink) {
        cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart (${totalItems})`;
      }
    }

    // Function to update cart counter
    function updateCartCounter() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      const cartLink = document.getElementById('cartLink');
      if (cartLink) {
        cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart (${totalItems})`;
      }
      const cartLinkMobile = document.getElementById('cartLinkMobile');
      if (cartLinkMobile) {
        cartLinkMobile.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart (${totalItems})`;
      }
    }

    // Update cart counter
    document.addEventListener('DOMContentLoaded', updateCartCounter);

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Hide mobile menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
      }
    });

    renderCart();
 