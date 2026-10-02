import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ToastProvider from "./components/feedback/ToastProvider";
import { ROUTES } from "./config/routes";
import { AuthProvider } from "./features/auth/AuthProvider";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import AuthPage from "./pages/auth/AuthPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import AboutPage from "./pages/public/AboutPage";
import HowItWorksPage from "./pages/public/HowItWorksPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import AccountPage from "./pages/account/AccountPage";

function Placeholder({ title }) {
  return <h1>{title}</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.home} element={<Placeholder title="Kitab Ghar" />} />
              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.howItWorks} element={<HowItWorksPage />} />
              <Route path={ROUTES.browse} element={<Placeholder title="Browse Books" />} />
              <Route path={ROUTES.book} element={<Placeholder title="Book Detail" />} />
              <Route path={ROUTES.user} element={<Placeholder title="User Profile" />} />
              <Route path={ROUTES.auth} element={<AuthPage />} />
              <Route path={ROUTES.authCallback} element={<AuthCallbackPage />} />
              <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
              <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
              <Route path={ROUTES.giveBook} element={<Placeholder title="Give a Book" />} />
              <Route path={ROUTES.account} element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
              <Route path="*" element={<Placeholder title="Page Not Found" />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;