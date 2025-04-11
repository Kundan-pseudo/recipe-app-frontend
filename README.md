# Recipe Finder Frontend

A React-based frontend application for searching and viewing recipes with a typeahead/autocomplete feature.

## Features

- Typeahead/autocomplete search for recipes by name or cuisine
- Responsive design for all device sizes
- Detailed recipe view with ingredients and instructions
- Clean, modern UI with Bootstrap styling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd recipe-app-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:8080/api
```

Replace the URL with your backend API endpoint.

## Running the Application

### Development Mode

To start the development server:

```
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Production Build

To create a production build:

```
npm run build
```

This will build the app for production to the `build` folder.

## Project Structure

The project follows atomic design principles:

- **Atoms**: Basic building blocks (buttons, inputs, etc.)
- **Molecules**: Simple combinations of atoms (search bar, cards, etc.)
- **Organisms**: Complex UI components (header, recipe detail, etc.)
- **Templates**: Page layouts
- **Pages**: Complete pages

## Testing

To run tests:

```
npm test
```

## Code Coverage

To check code coverage:

```
npm test -- --coverage
```

## Technologies Used

- React
- TypeScript
- React Router
- React Bootstrap
- Axios

## License

This project is licensed under the MIT License - see the LICENSE file for details.
