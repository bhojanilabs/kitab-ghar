import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/feedback/useToast";
import { ROUTES } from "../../config/routes";
import { supabase } from "../../services/supabase/supabase";

function getSafeReturnPath() {
  const storedPath = sessionStorage.getItem("kitabGharAuthReturnTo");
  sessionStorage.removeItem("kitabGharAuthReturnTo");

  if (storedPath?.startsWith("/") && !storedPath.startsWith("//")) return storedPath;
  return ROUTES.account;
}

function clearAuthFlow() {
  sessionStorage.removeItem("kitabGharAuthReturnTo");
  sessionStorage.removeItem("kitabGharGoogleAuthMode");
  sessionStorage.removeItem("kitabGharAuthFlow");
}

function isNewOAuthUser(user) {
  if (!user?.created_at || !user?.last_sign_in_at) return false;

  const createdAt = new Date(user.created_at).getTime();
  const signedInAt = new Date(user.last_sign_in_at).getTime();

  return Math.abs(signedInAt - createdAt) < 10000;
}

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;

    async function fail(message, destination = ROUTES.auth) {
      clearAuthFlow();

      if (!active) return;

      showToast({
        type: "error",
        title: "AUTHENTICATION FAILED",
        message,
      });

      navigate(destination, { replace: true });
    }

    async function completeAuthentication() {
      const url = new URL(window.location.href);
      const authFlow = sessionStorage.getItem("kitabGharAuthFlow");
      const googleMode = sessionStorage.getItem("kitabGharGoogleAuthMode");

      if (url.searchParams.get("error")) {
        const destination = authFlow === "link-google" ? ROUTES.account : ROUTES.auth;
        await fail("We couldn't complete that request. Please try again.", destination);
        return;
      }

      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          const destination = authFlow === "link-google" ? ROUTES.account : ROUTES.auth;
          await fail("We couldn't complete that request. Please try again.", destination);
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error || !data.session?.user) {
        await fail("Your authentication could not be completed. Please try again.");
        return;
      }

      if (authFlow === "link-google") {
        clearAuthFlow();

        showToast({
          type: "success",
          title: "GOOGLE CONNECTED",
          message: "You can now use Google with this Kitab Ghar account.",
        });

        navigate(ROUTES.account, { replace: true });
        return;
      }

      if (authFlow === "email-signup") {
        const returnTo = getSafeReturnPath();

        sessionStorage.removeItem("kitabGharAuthFlow");
        sessionStorage.removeItem("kitabGharGoogleAuthMode");

        showToast({
          type: "success",
          title: "EMAIL VERIFIED",
          message: "Your Kitab Ghar account is ready.",
        });

        navigate(returnTo, { replace: true });
        return;
      }

      if (googleMode) {
        const newUser = isNewOAuthUser(data.session.user);

        if (googleMode === "signin" && newUser) {
          await supabase.auth.signOut();

          if (!active) return;

          clearAuthFlow();

          showToast({
            type: "warning",
            title: "CREATE YOUR ACCOUNT",
            message: "This Google account is new to Kitab Ghar. Create your account to continue.",
          });

          navigate(ROUTES.auth, { replace: true, state: { mode: "signup" } });
          return;
        }

        if (googleMode === "signup" && !newUser) {
          await supabase.auth.signOut();

          if (!active) return;

          clearAuthFlow();

          showToast({
            type: "warning",
            title: "ACCOUNT ALREADY EXISTS",
            message: "You already have a Kitab Ghar account. Sign in instead.",
          });

          navigate(ROUTES.auth, { replace: true, state: { mode: "signin" } });
          return;
        }

        const returnTo = getSafeReturnPath();

        sessionStorage.removeItem("kitabGharGoogleAuthMode");
        sessionStorage.removeItem("kitabGharAuthFlow");

        showToast({
          type: "success",
          title: newUser ? "WELCOME TO KITAB GHAR" : "WELCOME BACK",
          message: newUser ? "Your Kitab Ghar account is ready." : "You are signed in.",
        });

        navigate(returnTo, { replace: true });
        return;
      }

      clearAuthFlow();

      showToast({
        type: "success",
        title: "WELCOME BACK",
        message: "You are signed in to Kitab Ghar.",
      });

      navigate(ROUTES.account, { replace: true });
    }

    completeAuthentication();

    return () => {
      active = false;
    };
  }, [navigate, showToast]);

  return (
    <main className="auth-status-page">
      <strong>CHECKING YOUR ACCOUNT...</strong>
    </main>
  );
}