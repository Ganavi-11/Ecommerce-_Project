
    const grid = document.getElementById("productGrid");
    const buttons = document.querySelectorAll(".filterButtons button");
    let allProducts = [];

    const shorten = (text, n) => {
      return text.length > n ? text.slice(0, n) + "..." : text;
    };

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    async function getProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      allProducts = await res.json();
      display(allProducts);
    }

    function display(products) {
      grid.innerHTML = "";

      products.slice(0, 18).forEach((item) => {
        grid.innerHTML += `
          <div class="product-card" data-id="${item.id}">
            <div class="image-wrap">
              <img src="${item.image}">
            </div>
            <h4>${shorten(item.title, 30)}</h4>
            <p>${shorten(item.description, 70)}</p>
            <div class="price">$ ${item.price}</div>
            <div class="btns">
              <button>Details</button>
              <button>Add To Cart</button>
            </div>
          </div>
        `;
      });
    }

    buttons.forEach((btn) => {
      btn.onclick = () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const map = {
          "Men's Clothing": "men's clothing",
          "Women's Clothing": "women's clothing",
          Jewelery: "jewelery",
          Electronics: "electronics",
          All: "all",
        };

        if (btn.textContent === "All") {
          display(allProducts);
        } else {
          const filtered = allProducts.filter(
            (p) => p.category === map[btn.textContent]
          );
          display(filtered);
        }
      };
    });

    getProducts();

    // Function to update cart counter
    function updateCartCounter() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      const cartLink = document.getElementById('cartLink');
      if (cartLink) {
        cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart (${totalItems})`;
      }
    }

    // Add to cart functionality
    document.addEventListener('click', (e) => {
      if (e.target.textContent === 'Add To Cart') {
        const card = e.target.closest('.product-card');
        const id = parseInt(card.getAttribute('data-id'));
        const product = allProducts.find(p => p.id === id);

        if (!product) return; // Safety check

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
          existingItem.qty += 1;
        } else {
          cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        alert('Item added to cart!');
      }
    });

    // Update cart counter on page load
    document.addEventListener('DOMContentLoaded', updateCartCounter);
  