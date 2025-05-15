# Lead Management App

An application for managing leads, built with **Next.js 14**, **Redux Toolkit**, and **Tailwind CSS**.

---

## 🚀 Setup Guide

Follow these steps to run the project locally:

1. Clone the repository:
     ```bash
     git clone https://github.com/Nestorvictorino/lead-management.git
     cd lead-management
     
2. install dependencies
     ```bash
     npm install
     
3. Run the development server
    ```bash
    npm run dev
    
4. Open the development server http://localhost:3000 in your browser.


🧠 Design and Architecture
Technologies Used
Next.js 14 (App Router)

React 19

Redux Toolkit for global state management

Tailwind CSS for fast and responsive styling

Axios for API requests

****Project Structure****
  ```bash
    /app              # Next.js App Router pages and routes
    /components       # Reusable components (Dropdown, Loader, etc.)
    /store            # Redux slices and store (auth, leads)
    /utils            # Utility functions and helpers
    /public           # Static assets (images, icons)
    /styles           # Global styles including Tailwind CSS
```


****State Management****

Redux Toolkit manages global state with two main slices:

  -authSlice controls user authentication state (isLoggedIn boolean).

Redux is integrated at the root layout (app/layout.tsx) by wrapping the app with the Redux Provider.

Styling

  -Tailwind CSS is used for utility-first styling, making the UI responsive and easy to maintain.

  -Basic Tailwind configuration is in tailwind.config.js.

  -Responsive classes are used to adapt to different screen sizes.

📌 Important Notes

  -The project uses React 19, which might cause compatibility issues with some older libraries.

  -It’s recommended to use npm install without --force to avoid dependency problems.

  -Authentication is simulated using a boolean isLoggedIn in Redux.

  -Lead data is fetched from API routes under /api (you can configure proxies or base URLs as needed.

🛠 Available Scripts
  ```bash
  npm run dev      # Start development server
  npm run build    # Build the project for production
  npm run start    # Run the production build
  npm run lint     # Run ESLint for code quality checks
```
