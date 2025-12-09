# JSON Server Setup

This project uses JSON Server to simulate a REST API for product data.

## Installation

Install the required dependencies:

```bash
npm install
```

## Running the Application

### Option 1: Run both servers simultaneously (Recommended)
```bash
npm run dev
```

This will start:
- JSON Server on `http://localhost:3001`
- Angular development server on `http://localhost:4200`

### Option 2: Run servers separately

**Terminal 1 - Start JSON Server:**
```bash
npm run json-server
```

**Terminal 2 - Start Angular App:**
```bash
npm start
```

## API Endpoints

JSON Server provides the following endpoints:

- `GET http://localhost:3001/products` - Get all products
- `GET http://localhost:3001/products/:id` - Get product by ID
- `POST http://localhost:3001/products` - Create new product
- `PUT http://localhost:3001/products/:id` - Update product
- `DELETE http://localhost:3001/products/:id` - Delete product

## Database File

The product data is stored in `db.json` at the project root. You can modify this file to add, update, or remove products. JSON Server will automatically reload when the file changes.

## Benefits of JSON Server

1. **Dynamic API**: Full REST API with CRUD operations
2. **Real HTTP requests**: Simulates actual API calls
3. **Easy to modify**: Just edit the JSON file
4. **Development friendly**: Auto-reloads on file changes
5. **RESTful**: Follows REST conventions
