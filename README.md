<img src="./public/favicon.ico" align="right" width="160px" height="170px"/>

# [Billbook-V2](https://vzw.we0mmm.site/) ![We0mmmBadge](https://img.shields.io/badge/-We0mmm-blue?logo=visual-studio-code)

* This is a billing management app for mobile carrier bills;
* React as frontend with Nextjs framework, and Django as backend;
* Only authenticated user can use this app;
* Designed admin management page to add, update, or delete users, billing cycles, or statements; 
* Both front and back end are protected by JWT authentication; 
---
* SSR & CSR pre-render non-user specific pages;
* The app use ```React Hook Form```, ```Yup``` to do real-time form check include userID and PIN; 
* Using ```React Hooks``` to display admin page tabs, user name, and share state value between different components;
* ```swr``` handles user spcific page data fetch;
* ```CORS(corsOptions)``` on backend, ```{withCredentials: true}``` on frontend with ```axios```;
* ```certbot``` SSL for both front and back;
* ```Nginx``` serve subdomain for API calls;
* DARK mode supported;
