# Setup Instructions

This app was built with Angular and Ionic. It has search, sorting. I used JSON Server to mock the API.

## What you need first

I used v20.19.6. It is advisable to use nvm for node switching.

## Getting started

Navigate to the project folder and install everything:

```bash
cd Firstmac
npm i
```

This installs Angular, Ionic, JSON Server, and a few other packages needed to run both the frontend and mock API.

## Running everything

The easiest way is to run both servers at once:

```bash
npm run dev
```

This starts the JSON Server on port 3001 and the Angular app on port 4200.

Or you can run it separately using two terminals

```bash
npm run json-server

npm start
```

## browser

Open your browser to `http://localhost:4200` and you should see the product catalog. There are 10 products with search and sorting features. Products with discounts show a green badge with "Discount Value: X". Click on any product to see its details page.

The JSON Server API runs on `http://localhost:3001/products` if you want to check it out directly.

## API endpoint

JSON Server gives you a full REST API automatically:

- GET /products - all products (what the app uses)
- GET /products/1 - single product

## Project layout

```
src/app/components/product-card/  - the product cards
src/app/home/                     - main page  
src/app/services/                 - API calls
db.json                           - product data
```

## Other commands

- `npm start` - just the Angular app
- `npm run json-server` - just the API server  
- `npm test` - run the tests
- `npm run build` - build for production

## Update the products

Just edit `db.json` and JSON Server will pick up the changes automatically. Each product needs an id, name, price, description, and discount (set to 0 if no discount).

## Testing

```bash
npm test
```
