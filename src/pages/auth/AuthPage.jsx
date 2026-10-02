import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { useToast } from "../../components/feedback/useToast";
import { ROUTES } from "../../config/routes";
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from "../../features/auth/authService";
import { useAuth } from "../../features/auth/useAuth";
import "./AuthPage.css";

function getReturnPath(location) {
  const returnTo = location.state?.returnTo;

  if (typeof returnTo === "string" && returnTo.startsWith("/") && !returnTo.startsWith("//")) return returnTo;
  return ROUTES.account;
}

export default function AuthPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(location.state?.mode === "signup" ? "signup" : "signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const returnTo = getReturnPath(location);
  const isSignUp = mode === "signup";

  if (authLoading) return null;
  if (isAuthenticated) return <Navigate to={returnTo} replace />;

  function changeMode(nextMode) {
    setMode(nextMode);
    setPassword("");
  }

  async function handleEmailAuth(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (isSignUp) {
        sessionStorage.setItem("kitabGharAuthReturnTo", returnTo);
        sessionStorage.setItem("kitabGharAuthFlow", "email-signup");

        const data = await signUpWithEmail({ displayName, email, password });

        if (data.session) {
          sessionStorage.removeItem("kitabGharAuthFlow");
          sessionStorage.removeItem("kitabGharAuthReturnTo");

          showToast({
            type: "success",
            title: "ACCOUNT CREATED",
            message: "Welcome to Kitab Ghar.",
          });

          navigate(returnTo, { replace: true });
          return;
        }

        showToast({
          type: "success",
          title: "CHECK YOUR EMAIL",
          message: "If this address can be registered, we've sent the next step to your email.",
        });

        setPassword("");
        return;
      }

      await signInWithEmail({ email, password });

      showToast({
        type: "success",
        title: "WELCOME BACK",
        message: "You are signed in to Kitab Ghar.",
      });

      navigate(returnTo, { replace: true });
    } catch (error) {
      if (!isSignUp && error?.message?.toLowerCase().includes("invalid login credentials")) {
        showToast({
          type: "error",
          title: "SIGN IN FAILED",
          message: "Your email or password is incorrect.",
        });
        return;
      }

      if (isSignUp && error?.message?.toLowerCase().includes("already registered")) {
        sessionStorage.removeItem("kitabGharAuthFlow");
        sessionStorage.removeItem("kitabGharAuthReturnTo");
        setMode("signin");
        setPassword("");

        showToast({
          type: "warning",
          title: "ACCOUNT ALREADY EXISTS",
          message: "You already have a Kitab Ghar account. Sign in instead.",
        });
        return;
      }

      showToast({
        type: "error",
        title: isSignUp ? "SIGN UP FAILED" : "SIGN IN FAILED",
        message: "We couldn't complete that request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleAuth() {
    setSubmitting(true);

    try {
      sessionStorage.setItem("kitabGharAuthReturnTo", returnTo);
      sessionStorage.setItem("kitabGharGoogleAuthMode", mode);
      await signInWithGoogle();
    } catch {
      sessionStorage.removeItem("kitabGharAuthReturnTo");
      sessionStorage.removeItem("kitabGharGoogleAuthMode");

      showToast({
        type: "error",
        title: "GOOGLE AUTHENTICATION FAILED",
        message: "We couldn't continue with Google. Please try again.",
      });

      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <span className="auth-intro__eyebrow">YOUR KITAB GHAR ACCOUNT</span>

        <h1>Keep good books<span> moving.</span></h1>

        <p>Give books you no longer need, request books that can help you, and keep track of the books you have passed forward.</p>

        <div className="auth-intro__note">
          <BookOpen aria-hidden="true" />
          <div>
            <strong>THE BOOKS STAY FREE.</strong>
            <span>Your account simply helps us make exchanges safer and easier to manage.</span>
          </div>
        </div>
      </section>

      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-card__tabs">
          <button type="button" className={mode === "signin" ? "active" : ""} onClick={() => changeMode("signin")}>Sign In</button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => changeMode("signup")}>Create Account</button>
        </div>

        <div className="auth-card__body">
          <div className="auth-card__heading">
            <span>{isSignUp ? "NEW READER" : "WELCOME BACK"}</span>
            <h2 id="auth-title">{isSignUp ? "Create your account" : "Return to your shelf"}</h2>
            <p>{isSignUp ? "A simple account for giving and receiving books." : "Sign in to continue your Kitab Ghar journey."}</p>
          </div>

          <button type="button" className="google-auth-button" onClick={handleGoogleAuth} disabled={submitting}>
            <span className="google-mark" aria-hidden="true">G</span>
            <strong>{isSignUp ? "Continue with Google" : "Sign in with Google"}</strong>
          </button>

          <div className="auth-divider"><span>OR USE EMAIL</span></div>

          <form className="auth-form" onSubmit={handleEmailAuth}>
            {isSignUp && (
              <label>
                <span>Display Name</span>
                <input type="text" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="How should we call you?" autoComplete="name" required minLength={2} maxLength={80} />
              </label>
            )}

            <label>
              <span>Email</span>
              <div className="auth-input">
                <Mail aria-hidden="true" />
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
              </div>
            </label>

            <label>
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isSignUp ? "At least 8 characters" : "Your password"} autoComplete={isSignUp ? "new-password" : "current-password"} required minLength={8} />
            </label>

            {!isSignUp && <Link className="forgot-password-link" to={ROUTES.forgotPassword}>Forgot password?</Link>}

            <button type="submit" className="auth-submit" disabled={submitting}>
              <span>{submitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}</span>
              {!submitting && <ArrowRight aria-hidden="true" />}
            </button>
          </form>

          <p className="auth-card__footer">
            {isSignUp ? "Already have a Kitab Ghar account?" : "New to Kitab Ghar?"}
            <button type="button" onClick={() => changeMode(isSignUp ? "signin" : "signup")}>{isSignUp ? "Sign in" : "Create an account"}</button>
          </p>
        </div>
      </section>
    </main>
  );
}