# Frontend Routes for Mock Make

## Account Management

- `Dropdown Menu`
  - Provides options for login, logout, and sign-up within a dropdown menu interface.
  - Login and sign-up are accessible to public users.
  - Logout is accessible to authenticated users.


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
  - Logged in users can add review with a popup modal.

- `/products/:productId/edit`
  - Page for editing product details by the listing owner.
  - Protected route, requires user authentication and ownership verification.


## Order Management

- `/cart`
  - View and manage the shopping cart.
  - Protected route, requires user authentication.

- `/orders`
  - Page where logged-in users can view their orders.
  - Protected route, requires user authentication.

- `/orders/:orderId`
  - View details of a specific order.
  - Protected route, requires user authentication.


## Wish List Management

- `/wishlist`
  - User's list of favorite or desired products.
  - Protected route, requires user authentication.
  - Users can view all items in their wish list and have the option to remove them.


## Search (Bonus)

- `/search`
  - Search for products based on query.
  - Public access.

## Product Images

- `/products/:productId/images`
  - View images for a specific product.
  - Public access.
