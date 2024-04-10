# Backend Routes Documentation

This `backend_routes.md` file provides details about the server-side routes for the Mock Make application, linking the frontend functionalities with the database operations.

## Users

### Authentication

- **POST `/api/auth/signup`**
  - Register a new user.
  - Input fields: `username`, `email`, `password`.
  - Returns: User data on success; error message on failure.

- **POST `/api/auth/login`**
  - Log in an existing user.
  - Input fields: `email`, `password`.
  - Returns: User data on success; error message on failure.

- **GET `/api/auth/logout`**
  - Log out the current user.
  - Returns: Success message.

- **GET `/api/auth/`**
  - Check current authentication status.
  - Returns: Current user data if authenticated; 'Unauthorized' error otherwise.

## Products

- **GET `/api/products/`**
  - Retrieve all product listings.
  - Returns: Array of product objects.

- **GET `/api/products/<int:id>`**
  - Retrieve a single product by ID.
  - Returns: Product object on success; error message on failure.

- **POST `/api/products/`** (Protected)
  - Create a new product listing.
  - Input fields: `description`, `vendorId`.
  - Returns: New product object on success; error message on failure.

- **PUT `/api/products/<int:id>`** (Protected)
  - Update an existing product by ID.
  - Input fields: `description`, `vendorId`.
  - Returns: Updated product object on success; error message on failure.

- **DELETE `/api/products/<int:id>`** (Protected)
  - Delete a product listing by ID.
  - Returns: Success message on deletion; error message on failure.

## Orders

- **POST `/api/orders`** (Protected)
  - Create a new order for logged-in users.
- **GET `/api/orders/<int:orderId>`** (Protected)
  - View an order for the logged-in user.
- **PUT `/api/orders/<int:orderId>`** (Protected)
  - Update an existing order for the logged-in user.
- **DELETE `/api/orders/<int:orderId>`** (Protected)
  - Delete an existing order for the logged-in user.

## Reviews

- **GET `/api/products/<int:id>/reviews`**
  - Retrieve all reviews for a specific product by product ID.
  - Returns: Array of review objects.

- **POST `/api/products/<int:id>/reviews`** (Protected)
  - Create a review for a specific product by product ID.
  - Input fields: `userId`, `content`.
  - Returns: New review object on success; error message on failure.

- **DELETE `/api/reviews/<int:id>`** (Protected)
  - Delete a review by review ID.
  - Returns: Success message on deletion; error message on failure.

## Wish List

- **POST `/api/users/<int:userId>/wishlist`** (Protected)
  - Add an item to the wish list for logged-in users.
- **GET `/api/users/<int:userId>/wishlist`** (Protected)
  - View the wish list for the logged-in user.
- **DELETE `/api/users/<int:userId>/wishlist/<int:productId>`** (Protected)
  - Remove an item from the wish list for the logged-in user.


## Product Images

- **GET `/api/products/<int:id>/product_images`**
  - Retrieve all images for a specific product by product ID.
  - Returns: Array of image URLs.

- **POST `/api/products/<int:id>/product_images`** (Protected)
  - Upload new image(s) for a product by product ID.
  - Input fields: Form-data with images.
  - Returns: Array of new image URLs on success; error message on failure.

## Shopping Cart

- **GET `/api/cart/<int:id>`** (Protected)
  - Retrieve cart items for a user by user ID.
  - Returns: Array of cart item objects.

- **POST `/api/cart/`** (Protected)
  - Add a new item to the cart.
  - Input fields: `productId`, `quantity`.
  - Returns: Cart item object on success; error message on failure.

- **DELETE `/api/cart/<int:itemId>`** (Protected)
  - Remove an item from the cart by cart item ID.
  - Returns: Success message on deletion; error message on failure.

## Search (Bonus)

- **GET `/api/search/<string:query>`**
  - Perform a keyword search for products.
  - Returns: Array of product objects that match the search query.

*Note: Routes marked as (Protected) require the user to be authenticated and may require additional permission checks to ensure that the user is authorized to perform the action.*
