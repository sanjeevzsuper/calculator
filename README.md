# Calculator

## Overview

The **Calculator** project is a React-based application developed with TypeScript. It offers a clean and interactive UI for performing arithmetic operations. The project is structured to be developer-friendly and follows modern React practices.

## Features

- Built with React and TypeScript.
- Unit testing setup using `@testing-library/react`.
- Pre-configured ESLint and Prettier for consistent code style.
- Optimized for modern browsers.

## Installation

To set up and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/sanjeevzsuper/calculator.git
   cd calculator
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Scripts

Here are the available npm scripts for development and testing:

- **Start the development server**: `npm start`
- **Build the production version**: `npm run build`
- **Run tests**: `npm test`
- **Eject the configuration**: `npm run eject`

## Project Structure

The project follows a standard React structure:

```
calculator/
├── public/                # Static files
├── src/                   # Source code
│   ├── assets/            # Reusable assets
│   ├── components/        # Reusable components
│   ├── constants/         # Constants files
│   ├── contexts/          # Context files for state management
│   ├── types/             # Reusable types
│   ├── utils/             # Reusable utilities
│   ├── App.tsx            # Main app entry
│   ├── index.tsx          # ReactDOM render entry
│   └── styles/            # Application styles
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Dependencies

Key dependencies used in this project:

- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `typescript`: ^4.4.2
- `@testing-library/react`: ^13.0.0

For a complete list, see `package.json`.

## Development Notes

- Ensure that you have Node.js and npm installed.
- Follow the Prettier and ESLint configurations to maintain code consistency.

## License

This project is licensed under [LICENSE].
