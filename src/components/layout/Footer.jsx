import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <section className="footer-intro">
          <div className="footer-intro__copy">
            <span className="footer-eyebrow">Keep books moving</span>
            <h2>A BOOK YOU&apos;RE DONE WITH COULD BE SOMEONE&apos;S NEXT.</h2>
          </div>

          <Link className="footer-cta" to={ROUTES.giveBook}>
            Give a Book
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <div className="footer-divider" />

        <section className="footer-directory">
          <div className="footer-brand">
            <Link className="footer-logo" to={ROUTES.home} aria-label="Kitab Ghar home">
              <span className="footer-brand-books" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>KITAB GHAR</span>
            </Link>

            <p>A Karachi-first book exchange helping useful books find their next desk.</p>
            <span className="footer-location">Karachi, Pakistan</span>
          </div>

          <nav className="footer-column" aria-label="Explore">
            <h3>Explore</h3>
            <div className="footer-links">
              <Link to={ROUTES.home}>Home</Link>
              <Link to={ROUTES.browse}>Browse</Link>
              <Link to={ROUTES.giveBook}>Give a Book</Link>
            </div>
          </nav>

          <nav className="footer-column" aria-label="Kitab Ghar">
            <h3>Kitab Ghar</h3>
            <div className="footer-links">
              <Link to={ROUTES.about}>About</Link>
              <Link to={ROUTES.howItWorks}>How It Works</Link>
            </div>
          </nav>

          <div className="footer-column" aria-label="Support">
            <h3>Support</h3>
            <div className="footer-links">
              <span>Contact</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </section>

        <section className="footer-ending">
          <div className="footer-bottom">
            <span>© {CURRENT_YEAR} Kitab Ghar</span>
            <span className="footer-bottom-message">Built to keep books moving.</span>
            <span>Karachi, Pakistan</span>
          </div>
        </section>
      </div>
    </footer>
  );
}