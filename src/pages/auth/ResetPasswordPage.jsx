import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/feedback/useToast";
import { ROUTES } from "../../config/routes";
import { updatePassword } from "../../features/auth/authService";
import { supabase } from "../../services/supabase/supabase";
import "./PasswordRecovery.css";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [checkingRecovery, setCheckingRecovery] = useState(true);
  const [validRecovery, setValidRecovery] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    const timeout = window.setTimeout(() => {
      if (!active) return;
      setCheckingRecovery(false);
    }, 1500);

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === "PASSWORD_RECOVERY" && session?.user) {
        window.clearTimeout(timeout);
        setValidRecovery(true);
        setCheckingRecovery(false);
      }
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
      data.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validRecovery) return;

    if (password.length < 8) {
      showToast({
        type: "warning",
        title: "PASSWORD TOO SHORT",
        message: "Use at least 8 characters for your password.",
      });
      return;
    }

    if (password !== confirmation) {
      showToast({
        type: "warning",
        title: "PASSWORDS DON'T MATCH",
        message: "Enter the same password in both fields.",
      });
      return;
    }

    setSubmitting(true);

    try {
      await updatePassword(password);

      showToast({
        type: "success",
        title: "PASSWORD UPDATED",
        message: "Your new password is ready to use.",
      });

      navigate(ROUTES.account, { replace: true });
    } catch {
      showToast({
        type: "error",
        title: "RESET FAILED",
        message: "This reset link may have expired. Request a new one and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingRecovery) {
    return (
      <main className="recovery-page">
        <section className="recovery-card">
          <span className="recovery-card__eyebrow">ACCOUNT RECOVERY</span>
          <h1>Checking your reset link...</h1>
          <p>Please wait while we verify your password recovery session.</p>
        </section>
      </main>
    );
  }

  if (!validRecovery) {
    return (
      <main className="recovery-page">
        <section className="recovery-card">
          <span className="recovery-card__eyebrow">RESET LINK REQUIRED</span>
          <h1>This reset link isn't available.</h1>
          <p>Request a password reset email and open the secure link from your inbox.</p>

          <Link className="recovery-submit" to={ROUTES.forgotPassword}>
            <span>Request New Link</span>
            <ArrowRight aria-hidden="true" />
          </Link>

          <Link className="recovery-back" to={ROUTES.auth}>
            <ArrowLeft aria-hidden="true" />
            Back to Sign In
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="recovery-page">
      <section className="recovery-card">
        <span className="recovery-card__eyebrow">NEW PASSWORD</span>
        <h1>Choose a new password.</h1>
        <p>Use at least 8 characters and choose something you don't use elsewhere.</p>

        <form className="recovery-form" onSubmit={handleSubmit}>
          <label>
            <span>New Password</span>
            <div className="recovery-input">
              <LockKeyhole aria-hidden="true" />
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required />
            </div>
          </label>

          <label>
            <span>Confirm New Password</span>
            <div className="recovery-input">
              <LockKeyhole aria-hidden="true" />
              <input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Enter it again" autoComplete="new-password" minLength={8} required />
            </div>
          </label>

          <button type="submit" className="recovery-submit" disabled={submitting}>
            <span>{submitting ? "Updating..." : "Update Password"}</span>
            {!submitting && <ArrowRight aria-hidden="true" />}
          </button>
        </form>
      </section>
    </main>
  );
}