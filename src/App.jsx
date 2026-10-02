import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { ROUTES } from "./config/routes";
import AboutPage from "./pages/public/AboutPage";
import HowItWorksPage from "./pages/public/HowItWorksPage";

function Placeholder({ title }) {
  return <h1>{title}</h1>;
}

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout />}>
          <Route path={ROUTES.home} element={<Placeholder title="Kitab Ghar" />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.howItWorks} element={<HowItWorksPage />} />
          <Route path={ROUTES.browse} element={<Placeholder title="Browse Books" />} />
          <Route path={ROUTES.book} element={<Placeholder title="Book Detail" />} />
          <Route path={ROUTES.user} element={<Placeholder title="User Profile" />} />
          <Route path={ROUTES.auth} element={<Placeholder title="Login / Sign Up" />} />
          <Route path={ROUTES.giveBook} element={<Placeholder title="Give a Book" />} />
          <Route path={ROUTES.account} element={<Placeholder title="My Account" />} />
          <Route path="*" element={<Placeholder title="Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;