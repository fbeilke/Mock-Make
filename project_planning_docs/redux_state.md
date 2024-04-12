# Example Redux State

```javascript
{
   users: {
      1: {
         id: 1,
         username: "Demo",
         first_name: "John"
         last_name: "Doe"
         vendor_name: null
         email: "demo@aa.io",
         user_wishes: {
            3: {
               product_id: 3
               quantity: 1
            }
         },
         orders: [1]
         user_cart_products: {
            1: {
               product_id: 1
               quantity: 1
            }
         }
      },
      allUsersIds: [1],
   },


   products: {
      1: {
         id: 1,
         vendor_id: 1
         name: "Demo Product 1"
         description: "Demo description"
         price: 1.99
         category: "Home Goods"
         product_images: {
            1: {
               id: 1
               url: "demo1.url"
               preview: true
            }
         }
      },
      2: {
         id: 2,
         vendor_id: 1
         name: "Demo Product 2"
         description: "Demo description"
         price: 15.55
         category: "Art & Collectibles"
         product_images: {
            2: {
               id: 2
               url: "demo2.url"
               preview: true
            }
         }
      },
      allProductsIds: [1, 2],
   },


   reviews: {
      1: {
         id: 1,
         user_id: 1
         product_id: 1
         content: "Review info"
         rating: 5
         image: "URL"
      },
      allReviewsIds: [1],
   },


   orders: {
      1: {
         id: 1
         user_id: 1
         status: "Complete"
         product_orders: {
            2: {
               product_id:2
               quantity: 1
            }
         }
      }
      allOrdersIds: [1],
   },


   session: {
      user: {
         id: 1,
         username: "Demo",
         first_name: "John"
         last_name: "Doe"
         vendor_name: null
         email: "demo@aa.io",
      }
   },
}
```
