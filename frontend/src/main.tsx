// ship-tornado-v3/frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css'; // Your updated global styles
import { ThemeProvider } from './components/theme/theme-provider.jsx'; // Import your new ThemeProvider

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system" // Can be "light", "dark", or "system"
        enableSystem
        disableTransitionOnChange // Optional: Prevents theme transition flash on page load
      >
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}