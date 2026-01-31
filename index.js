 
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

    // Hide mobile menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
      }
    });

    async function getProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      allProducts = await res.json();
      display(allProducts);
    }

    function display(products) {
      grid.innerHTML = "";

      products.slice(0, 18).forEach((item, index) => {
        grid.innerHTML += `
          <div class="product-card">
            <div class="image-wrap">
              <img src="${item.image}">
            </div>
            <h4>${shorten(item.title, 30)}</h4>
            <p>${shorten(item.description, 70)}</p>
            <div class="price">$ ${item.price}</div>
            <div class="btns">
              <button onclick="showDetails(${item.id})">Details</button>
              <button onclick="addToCart(${item.id}, '${item.title}', '${item.image}', ${item.price})">Add To Cart</button>
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

    // Function part for  update cart counter

    function updateCartCounter() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      const cartLink = document.getElementById('cartLink');
      if (cartLink) {
        cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart (${totalItems})`;
      }
    }

    // Update cart counter 

    document.addEventListener('DOMContentLoaded', updateCartCounter);

    // Function to add item to cart
    function addToCart(id, title, image, price) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ id, title, image, price, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
      alert(`${title} added to cart!`);
    }

    // Function to show details 
    function showDetails(id) {
      alert(`Details for product ID: ${id}`);
    }
 