# Veyora Boutique E-Commerce Platform 

Veyora is a modern, boutique e-commerce web application tailored specifically for Kenyan youth. It bridges authentic local food favorites with trendy youth fashion apparel, featuring smooth asynchronous data handling, KES pricing, and complete shopping cart CRUD operations.

---

##  Key Features

* **Asynchronous Data Fetching:** Uses the native JavaScript `fetch()` API with `async/await` to load product data dynamically from a local `products.json` file.
* **Separated Product Categories:** Clearly organized sections for **Kenyan Food Menu** and **Youth Fashion & Clothing** with enlarged, high-resolution product cards.
* **Interactive Shopping Cart (CRUD):**
  * **Create/Add:** Add items directly from the catalog.
  * **Read:** View real-time item lists, quantities, and individual cost breakdowns.
  * **Update:** Increase (`+`) or decrease (`-`) item quantities dynamically with automatic grand total recalculation.
  * **Delete:** Completely remove items from the cart.
* **Local Currency Support:** All prices are explicitly calculated and displayed in **Kenyan Shillings (KES)**.
* **Simulated Checkout & Forms:** Includes an M-Pesa payment simulation alert, a contact/delivery details form, and a user feedback submission box.

---

##  Tech Stack

* **HTML5:** Semantic markup structure.
* **CSS3:** Custom styling featuring a high-contrast palette (Pure White `#FFFFFF`, Cobalt Blue `#1D4ED8`, and Sunset Gold `#F59E0B`).
* **JavaScript (ES6+):** Asynchronous API integration, DOM manipulation, state management, and event handling.
* **JSON:** Structured data source (`products.json`).

---

##  Project File Structure

```text
veyora-ecommerce/
│
├── index.html       # Main HTML structure
├── styles.css       # Custom styling and layout grid
├── script.js        # Asynchronous fetch logic, DOM rendering, & cart CRUD
└── products.json    # Local data source for product catalog
>>>>>>> 1b177f8fff7dc115d59aa81c4df744926bcf6e75
