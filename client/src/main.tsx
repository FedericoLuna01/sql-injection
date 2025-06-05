import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginForm } from './components/login-form.tsx'
import AdminPage from './components/admin-page.tsx'
import { Toaster } from './components/ui/sonner';
import { AuthContextProvider } from './contexts/auth-context/auth-context-provider.tsx'
import ProtectedRoute from './components/protected-route.tsx'
import Layout from './components/layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    <Toaster position="top-center" richColors />
  </StrictMode>,
)
