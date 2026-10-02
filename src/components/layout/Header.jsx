import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  LogIn,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { ROUTES } from "../../config/routes";
import "./Header.css";

const navigation = [
  { number: "01", label: "Home", to: ROUTES.home, tone: "purple" },
  { number: "02", label: "About", to: ROUTES.about, tone: "pink" },
  {
    number: "03",
    label: "How It Works",
    to: ROUTES.howItWorks,
    tone: "green",
  },
  { number: "04", label: "Browse", to: ROUTES.browse, tone: "yellow" },
];

export default function Header({ user = null }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-shell">
        <Link
          className="brand"
          to={ROUTES.home}
          aria-label="Kitab Ghar home"
          onClick={closeMobileMenu}
        >
          <span className="brand-icon" aria-hidden="true">
            <BookOpen />
          </span>

          <span className="brand-copy">
            <strong>KITAB GHAR</strong>
            <small>BOOKS SHOULD KEEP MOVING</small>
          </span>
        </Link>

        <nav className="nav nav--desktop" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="give-button" to={ROUTES.giveBook}>
            <span>Give a Book</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>

          <Link
            className={`identity-ticket ${
              user ? "identity-ticket--account" : "identity-ticket--guest"
            }`}
            to={user ? ROUTES.account : ROUTES.auth}
            aria-label={user ? "Open your Kitab Ghar account" : "Log in or sign up"}
          >
            <span className="identity-ticket__stub">
              {user ? <UserRound aria-hidden="true" /> : <LogIn aria-hidden="true" />}
            </span>

            <span className="identity-ticket__copy">
              <small>{user ? "MY KITAB GHAR" : "YOUR SHELF"}</small>
              <strong>{user ? user.name || "Account" : "Sign In"}</strong>
            </span>

            <span className="identity-ticket__notches" aria-hidden="true" />
          </Link>

          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${mobileOpen ? "mobile-nav--open" : ""}`}
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav__top">
            <span>NAVIGATION</span>
          </div>

          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `mobile-nav__link mobile-nav__link--${item.tone} ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="mobile-nav__number">{item.number}</span>
              <strong>{item.label}</strong>
              <ArrowUpRight aria-hidden="true" />
            </NavLink>
          ))}

          <div className="mobile-nav__bottom">
            <Link
              to={user ? ROUTES.account : ROUTES.auth}
              onClick={closeMobileMenu}
            >
              {user ? (
                <>
                  <UserRound aria-hidden="true" />
                  <span>
                    <small>MY KITAB GHAR</small>
                    <strong>{user.name || "Account"}</strong>
                  </span>
                </>
              ) : (
                <>
                  <LogIn aria-hidden="true" />
                  <span>
                    <small>HAVE AN ACCOUNT?</small>
                    <strong>Sign In / Join</strong>
                  </span>
                </>
              )}
            </Link>

            <span className="mobile-nav__mark" aria-hidden="true">
              KG
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}