# UmmahLink-graphql
A Website Social app Using Nextjs, Typescript, Tailwindcss, React-query,Nestjs,Graphql, Zustand

## Overview
- Official website: https://ummah-link-graphql.vercel.app
- Author: SM Tanimur Rahman ( [@SMTanimur](https://github.com/SMTanimur) )

## Preview
![HomePage](https://github.com/SMTanimur/UmmahLink-graphql/assets/80884335/11a17c1f-4317-40ca-b9cb-406fa4632d5d)


## Resources

GithubUrl : https://github.com/SMTanimur/UmmahLink-graphql
## Frontend Main technology used
- Nextjs 13, Typescript
- Tailwindcss
- Zustand (State management)
- Axios (Support fetching data) and Graphql
- Swiper (Slider), react-modal
- React-form-hook , yup (Validation)
- React-hot-toast, sweetalert2 (Message UI)
- React-perfect-scrollbar
- React-perfect-scrollbar
- react-virtuoso
- 
## Backend Main technology used
- Nestjs, Typescript
- Graphql
- Mongoose
- Express
- Passportjs
- Express-session base (Auth)


## Features

- Create User
- Search user by name or username
- Post Todos:[Create/Update/Delete/Like]
- Comment Todos:[Create/Update/Delete/Like] with nested comment
- Follow or Unfollow user
- Profile page: allowing to change profile photo, fullname, password, phone number, address, add payment method with credit card
- Collect voucher code and apply at checkout
- Bookmark favourite products, store recently watched products
- Realtime notification of order status and discount code expiration

## Environment Variables

```
MONGODB_URI=mongodb://127.0.0.1:27017/ummahlink-graphql
NODE_ENV=development
PORT=3333
JWT_EXPIRATION=3036
JWT_SECRET=sjfdjfkkedfjkedf
MAIL=
WEB_URL=
API_URL=http://localhost:3333
SESSION_SECRET_KEY=fjdsfjksd
SESSION_NAME=ummahlink_sid
API_LOG_ENABLE=true
CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
NEXT_PUBLIC_API_BASE_ENDPOINT=http://localhost:3333
```

## Screenshots

<details>
 <summary>Home Page</summary>
 <p>
 
 ![homepage](https://user-images.githubusercontent.com/61537853/191778840-f6a056ad-f1f4-4f5c-b8fd-a415d5191ad7.png)
 </p>
</details>
<details>
 <summary>Product Details Page</summary>
 <p>

![product-detail](https://user-images.githubusercontent.com/61537853/191779641-26c3ca3d-6708-49d6-ba33-5a7bc560afc0.png)
 </p>
</details>
<details>
 <summary>Cart Page</summary>
 <p>

![cart-page](https://user-images.githubusercontent.com/61537853/191882927-898eec87-64da-4dcb-a426-a094e9a7d4f7.png)
 </p>
</details>
<details>
 <summary>Checkout Page</summary>
 <p>

![checkout-page](https://user-images.githubusercontent.com/61537853/191882914-313555f2-03c7-4718-a874-4b0213480115.png)
 </p>
</details>
<details>
 <summary>Seach Page</summary>
 <p>

 ![searchpage](https://user-images.githubusercontent.com/61537853/191779399-862c0d7b-930a-40ab-9673-905abcf80070.png)
 </p>
</details>
<details>
 <summary>Sign Up Page</summary>
 <p>
 
![sign-up](https://user-images.githubusercontent.com/61537853/191889741-68966572-404f-47c2-92bf-7ca26e58a90c.png)
 </p>
</details>
<details>
 <summary>Sign In Page</summary>
 <p>
 
![sign-in](https://user-images.githubusercontent.com/61537853/191889758-a7e43bbc-7cdd-4b78-b0e3-e1e41dbc51e2.png)
 </p>
</details>
<details>
 <summary>Profile Page</summary>
 <p>

 ![user-profile](https://user-images.githubusercontent.com/61537853/191779988-af7ea2bc-3ce9-4ac7-965c-42e38f4da716.png)
 </p>
</details>
<details>
 <summary>Change Password Page</summary>
 <p>

 ![user-password-page](https://user-images.githubusercontent.com/61537853/191780195-2e9c63fe-1261-40c5-adb9-1f9d781ad8e3.png)
 </p>
</details>
<details>
 <summary>Voucher collected</summary>
 <p>

 ![user-voucher-collect](https://user-images.githubusercontent.com/61537853/191880801-b1bdb4d9-3625-4a65-8473-0d1a0982eb38.png)
 </p>
</details>
<details>
 <summary>View History</summary>
 <p>

 ![user-product-history](https://user-images.githubusercontent.com/61537853/191880841-1d6b14f8-e65c-4900-a4bd-eca61e67e987.png)
 </p>
</details>
<details>
 <summary>Product Favorite Page</summary>
 <p>

 ![user-product-favorite](https://user-images.githubusercontent.com/61537853/191880884-86fa7b5a-9e64-41d2-93ef-9497fa4a9f64.png)
 </p>
</details>
<details>
 <summary>Notification Page</summary>
 <p>

 ![user-notification](https://user-images.githubusercontent.com/61537853/191880950-9a85728c-1c66-49da-a4e7-21b61883a96c.png)
 </p>
</details>
<details>
 <summary>Card Bank Page</summary>
 <p>

 ![user-card-bank](https://user-images.githubusercontent.com/61537853/191880964-38b89af9-379f-43dd-8038-7e5ef2bc4fac.png)
 </p>
</details>
<details>
 <summary>Order Details Page</summary>
 <p>

 ![user-order-detail](https://user-images.githubusercontent.com/61537853/191881295-af09809f-ec73-40eb-939a-c1a28aff1767.png)
 </p>
</details>
<details>
 <summary>Dashboard Overview Page</summary>
 <p>

 ![dashboard-manage](https://user-images.githubusercontent.com/61537853/191881420-ccfbddd1-ed4b-4f4f-96dd-889b5959aaff.png)
 </p>
</details>
<details>
 <summary>Dashboard Banner Manage Page</summary>
 <p>

![dashboard-banner-manage](https://user-images.githubusercontent.com/61537853/191881483-742e1786-13d5-44d4-a86f-e1cfdff0174a.png)
 </p>
</details>
<details>
 <summary>Dashboard Product Manage Page</summary>
 <p>

![dashboard-product-manage](https://user-images.githubusercontent.com/61537853/191881520-8afbcef1-897f-4955-9360-ab99b2293742.png)
 </p>
</details>
<details>
 <summary>Dashboard Product Add New Page</summary>
 <p>

![dashboard-add-product](https://user-images.githubusercontent.com/61537853/191881604-6c45f552-bede-4885-a071-85410d74bbf0.png)
 </p>
</details>
<details>
 <summary>Dashboard Product Update Page</summary>
 <p>

![dashboard-product-update](https://user-images.githubusercontent.com/61537853/191881824-5f6f17ce-2e57-4246-8ffa-cabcc6dfded4.png)
 </p>
</details>
<details>
 <summary>Dashboard Category Manage Page</summary>
 <p>

![dashboard-category-manage](https://user-images.githubusercontent.com/61537853/191881871-41ec6887-13ea-45e8-9b64-4a6d38fbf339.png)
 </p>
</details>
<details>
 <summary>Dashboard Category Add New Page</summary>
 <p>

![dashboard-add-category](https://user-images.githubusercontent.com/61537853/191881874-57a292d2-27ca-494f-a081-bc365676a349.png)
 </p>
</details>
<details>
 <summary>Dashboard Order Manage Page</summary>
 <p>

![dashboard-order-manage](https://user-images.githubusercontent.com/61537853/191881956-37c1e472-9916-4745-9c30-5245cad26ef1.png)
 </p>
</details>
<details>
 <summary>Dashboard User Manage Page</summary>
 <p>

![dashboard-user-manage](https://user-images.githubusercontent.com/61537853/191882034-54d5f2dc-352c-4f89-b9d2-e42f1a797706.png)
 </p>
</details>
<details>
 <summary>Dashboard User Add New Page</summary>
 <p>

![dashboard-add-user](https://user-images.githubusercontent.com/61537853/191882046-c6ef8c8b-e1ec-48d2-a336-68a7b38fe7da.png)
 </p>
</details>
<details>
 <summary>Dashboard User Update Page</summary>
 <p>

![dashboard-user-update](https://user-images.githubusercontent.com/61537853/191882048-8940ac41-78e3-4dac-a069-692f35188664.png)
 </p>
</details>
<details>
 <summary>Dashboard Voucher Manage Page</summary>
 <p>

![dashboard-voucher-manage](https://user-images.githubusercontent.com/61537853/191882494-8964ab32-f68d-4e6e-baca-1a25fab4f957.png)
 </p>
</details>
<details>
 <summary>Dashboard Voucher Add New Page</summary>
 <p>

![dashboard-voucher-add](https://user-images.githubusercontent.com/61537853/191882498-caedc9e0-efa5-466c-9a5d-303384511997.png)
 </p>
</details>
<details>
 <summary>Dashboard Voucher Update Page</summary>
 <p>

![dashboard-voucher-update](https://user-images.githubusercontent.com/61537853/191882502-b5be177d-048a-450c-9423-6ecd95a4d7fa.png)
 </p>
</details>
<details>
 <summary>Page Not Found</summary>
 <p>

![page-not-found](https://user-images.githubusercontent.com/61537853/191882449-6170cbe9-983f-4206-9d1f-39427f071323.png)
 </p>
</details>

