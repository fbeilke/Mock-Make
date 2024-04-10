# Frontend Routes for Mock Make

## Account Management

- `/signup`
  - Page where new users can create an account.
  - Public access.

- `/login`
  - Page where returning users can log into their accounts.
  - Public access.

- `/logout`
  - Functionality to log out the current user.
  - Handled via a logout action, typically a button in the user interface.

- `/demo`
  - Access to the site's features using a demo account.
  - Public access.

## Products Management

- `/products`
  - Displays all available product listings.
  - Public access.

- `/products/new`
  - Page where logged-in users can add new product listings.
  - Protected route, requires user authentication.

- `/products/:productId`
  - Detailed view of a specific product.
  - Public access.

- `/products/:productId/edit`
  - Page for editing product details by the listing owner.
  - Protected route, requires user authentication and ownership verification.

## Order Management

- `/orders`
  - Page where logged-in users can view their orders.
  - Protected route, requires user authentication.

- `/orders/new`
  - Interface for creating a new order.
  - Protected route, requires user authentication.

- `/orders/:orderId`
  - View details of a specific order.
  - Protected route, requires user authentication.

## Review Management

- `/products/:productId/reviews`
  - View reviews for a specific product.
  - Public access.

- `/products/:productId/reviews/new`
  - Page to write a new review for a product.
  - Protected route, requires user authentication.

## Wish List Management

- `/wishlist`
  - User's list of favorite or desired products.
  - Protected route, requires user authentication.
  - Users can view all items in their wish list and have the option to remove them.

## Shopping Cart

- `/cart`
  - View and manage the shopping cart.
  - Protected route, requires user authentication.

## Search (Bonus)

- `/search`
  - Search for products based on query.
  - Public access.

## Product Images

- `/products/:productId/images`
  - View images for a specific product.
  - Public access.
