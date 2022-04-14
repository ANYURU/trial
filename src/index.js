import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import App from './routes/App'
import { AuthProvider } from './auth/AuthContext'
import './index.css';

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
