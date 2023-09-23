# Ecommerce_API

Welcome to the Ecommerce API project! This API allows users to interact with an e-commerce platform by providing features like user authentication, product management, cart management, order placement, and more.

## Introduction

The Ecommerce API provides a set of endpoints to facilitate various e-commerce operations. Users can interact with the API to register, log in, view products, add items to their cart, place orders, manage their cart, and more.

## Features

- User registration and authentication.
- Product listing and individual product details,add products.
- Cart management with the ability to add, remove, and update quantities.
- Order placement and order history tracking.
- Secure token-based authentication using JSON Web Tokens (JWT).
- Swagger documentation for API reference.

## Technologies Used

- Node.js
- Express.js
- MongoDB for data storage
- Redis for caching
- JSON Web Tokens (JWT) for authentication
- Swagger for API documentation
- Bcrypt for hashing the password

## Getting Started

- npm run server

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js and npm installed.
- MongoDB server running.
- Redis server running.

### Installation

1.Clone the repository:

git clone https://github.com/yash-levi1896/E-commerce-API.git

Navigate to the project directory:

cd E-commerce-API

Install dependencies:

npm install

Create a .env file in the project root and configure your environment variables:

port = any port number
mongourl=your-mongodb-connection-uri
secret=your-secret-key
redisurl=your redis lab url
redispassword= Your redis password


### Usage

<b>1.Authentication:</b>

Register: /user/register - Allows users to create an account.<br/>
Login: /user/login - Allows users to log in and receive a JWT token.<br/>
Logout: /user/logout - Logs the user out by invalidating the JWT token.<br/>

<b>2.Product Management:</b>

Get All Products: /product/getproduct - Retrieves a list of all available products.<br/>
Get Product by ID: product/products/:id - Retrieves product details by ID.<br/>
Get Product by category ID: /product/:categoryid - Retrieves product details by  category ID.<br/>
Add products: /product/addproduct - Add the product.<br/>

<b>3.Cart Management</b>:

Add to Cart: /cart/addcartproduct/ - Adds a product to the user's cart.<br/>
Get Cart Products: /cart/getcartproduct - Retrieves the user's cart items.<br/>
Update Cart Product Quantity: /cart/update-quantity/{product-id} - Updates the quantity of a cart product.<br/>
Delete Cart Product: /cart/delete/:id - Removes a product from the cart.<br/>

<b>4.Order Management</b>:

Place Order: /order/placeorder - Places an order based on the items in the user's cart.<br/>
Get Order History: /order/orderhistory/:id- Retrieves the user's order history.<br/>
Get Order Details: /order/orderDetails/:id - Retrieves the user's order Deatils.<br/>


### URL'S:-
1.Backend deployee url:-https://ecommerce-api-0lpk.onrender.com/

2.SwaggerUi documentation url:-https://ecommerce-api-0lpk.onrender.com/documentation/