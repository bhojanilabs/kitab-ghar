import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../../components/feedback/useToast";
import { ROUTES } from "../../config/routes";
import { sendPasswordResetEmail } from "../../features/auth/authService";
import "./PasswordRecovery.css";

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await sendPasswordResetEmail(email);

      showToast({
        type: "success",
        title: "CHECK YOUR EMAIL",
        message: "If an account exists for that email, we've sent password reset instructions.",
      });

      setEmail("");
    } catch {
      showToast({
        type: "error",
        title: "REQUEST FAILED",
        message: "We couldn't send the reset email. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="recovery-page">
      <section className="recovery-card">
        <span className="recovery-card__eyebrow">ACCOUNT RECOVERY</span>
        <h1>Forgot your password?</h1>
        <p>Enter your email and we'll send you a secure link to choose a new password.</p>

        <form className="recovery-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <div className="recovery-input">
              <Mail aria-hidden="true" />
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
            </div>
          </label>

          <button type="submit" className="recovery-submit" disabled={submitting}>
            <span>{submitting ? "Sending..." : "Send Reset Link"}</span>
            {!submitting && <ArrowRight aria-hidden="true" />}
          </button>
        </form>

        <Link className="recovery-back" to={ROUTES.auth}>
          <ArrowLeft aria-hidden="true" />
          Back to Sign In
        </Link>
      </section>
    </main>
  );
}