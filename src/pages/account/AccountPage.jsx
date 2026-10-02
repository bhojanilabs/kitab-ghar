import { BookOpen, Check, KeyRound, Link2, LogOut, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/feedback/useToast";
import { ROUTES } from "../../config/routes";
import { getUserIdentities, linkGoogleIdentity, signOut, updatePassword } from "../../features/auth/authService";
import { useAuth } from "../../features/auth/useAuth";
import "./AccountPage.css";

function getDisplayName(user) {
  return user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Reader";
}

function isGmailAddress(email) {
  return email?.trim().toLowerCase().endsWith("@gmail.com");
}

export default function AccountPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [identities, setIdentities] = useState([]);
  const [loadingIdentities, setLoadingIdentities] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [connectingGoogle, setConnectingGoogle] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const hasGoogle = identities.some((identity) => identity.provider === "google");
  const hasEmailIdentity = identities.some((identity) => identity.provider === "email");
  const canConnectGoogle = isGmailAddress(user?.email) && !hasGoogle;

  useEffect(() => {
    let active = true;

    async function loadIdentities() {
      try {
        const result = await getUserIdentities();
        if (active) setIdentities(result);
      } catch {
        if (active) {
          showToast({
            type: "error",
            title: "ACCOUNT DETAILS UNAVAILABLE",
            message: "We couldn't load your sign-in methods.",
          });
        }
      } finally {
        if (active) setLoadingIdentities(false);
      }
    }

    loadIdentities();

    return () => {
      active = false;
    };
  }, [showToast]);

  async function handleConnectGoogle() {
    setConnectingGoogle(true);

    try {
      sessionStorage.setItem("kitabGharAuthFlow", "link-google");
      sessionStorage.setItem("kitabGharAuthReturnTo", ROUTES.account);
      await linkGoogleIdentity();
    } catch {
      sessionStorage.removeItem("kitabGharAuthFlow");
      sessionStorage.removeItem("kitabGharAuthReturnTo");

      showToast({
        type: "error",
        title: "GOOGLE CONNECTION FAILED",
        message: "We couldn't connect Google. Please try again.",
      });

      setConnectingGoogle(false);
    }
  }

  async function handlePasswordChange(event) {
    event.preventDefault();

    if (newPassword.length < 8) {
      showToast({
        type: "warning",
        title: "PASSWORD TOO SHORT",
        message: "Use at least 8 characters for your password.",
      });
      return;
    }

    if (newPassword !== confirmation) {
      showToast({
        type: "warning",
        title: "PASSWORDS DON'T MATCH",
        message: "Enter the same new password in both fields.",
      });
      return;
    }

    setChangingPassword(true);

    try {
      await updatePassword(newPassword, hasEmailIdentity ? currentPassword : undefined);

      showToast({
        type: "success",
        title: hasEmailIdentity ? "PASSWORD CHANGED" : "PASSWORD ADDED",
        message: hasEmailIdentity ? "Your password has been updated." : "You can now sign in using your email and password.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmation("");

      if (!hasEmailIdentity) {
        const result = await getUserIdentities();
        setIdentities(result);
      }
    } catch {
      showToast({
        type: "error",
        title: hasEmailIdentity ? "PASSWORD CHANGE FAILED" : "PASSWORD COULD NOT BE ADDED",
        message: hasEmailIdentity ? "Check your current password and try again." : "We couldn't add a password. Please try again.",
      });
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await signOut();

      showToast({
        type: "success",
        title: "SIGNED OUT",
        message: "See you again at Kitab Ghar.",
      });

      navigate(ROUTES.home, { replace: true });
    } catch {
      showToast({
        type: "error",
        title: "SIGN OUT FAILED",
        message: "We couldn't sign you out. Please try again.",
      });

      setSigningOut(false);
    }
  }

  return (
    <main className="account-page">
      <header className="account-heading">
        <span>YOUR KITAB GHAR</span>
        <h1>My Account</h1>
        <p>Manage your identity, sign-in methods and Kitab Ghar activity.</p>
      </header>

      <section className="account-profile">
        <div className="account-profile__icon"><UserRound aria-hidden="true" /></div>

        <div className="account-profile__identity">
          <span>READER</span>
          <h2>{getDisplayName(user)}</h2>
          <div className="account-profile__email"><Mail aria-hidden="true" /><span>{user?.email}</span></div>
        </div>
      </section>

      <section className="account-settings">
        <div className="account-section-heading">
          <span>ACCOUNT SETTINGS</span>
          <h2>Sign-in methods</h2>
        </div>

        <div className="account-method">
          <div>
            <strong>Email</strong>
            <span>{user?.email}</span>
          </div>
          <span className="account-method__status"><Check aria-hidden="true" /> Connected</span>
        </div>

        {!loadingIdentities && (hasGoogle || isGmailAddress(user?.email)) && (
          <div className="account-method">
            <div>
              <strong>Google</strong>
              <span>{hasGoogle ? "Connected to this account" : "Connect your Gmail identity for easier sign in"}</span>
            </div>

            {hasGoogle ? (
              <span className="account-method__status"><Check aria-hidden="true" /> Connected</span>
            ) : canConnectGoogle ? (
              <button type="button" className="account-connect" onClick={handleConnectGoogle} disabled={connectingGoogle}>
                <Link2 aria-hidden="true" />
                {connectingGoogle ? "Connecting..." : "Connect Google"}
              </button>
            ) : null}
          </div>
        )}

        {!loadingIdentities && (
          <form className="account-password" onSubmit={handlePasswordChange}>
            <div className="account-password__heading">
              <KeyRound aria-hidden="true" />
              <div>
                <strong>{hasEmailIdentity ? "Change Password" : "Add Password"}</strong>
                <span>{hasEmailIdentity ? "Update the password used with your email." : "Add email and password sign-in to this account."}</span>
              </div>
            </div>

            {hasEmailIdentity && <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Current password" autoComplete="current-password" required />}
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password — at least 8 characters" autoComplete="new-password" minLength={8} required />
            <input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Confirm new password" autoComplete="new-password" minLength={8} required />

            <button type="submit" disabled={changingPassword}>{changingPassword ? "Saving..." : hasEmailIdentity ? "Change Password" : "Add Password"}</button>
          </form>
        )}
      </section>

      <section className="account-placeholder">
        <BookOpen aria-hidden="true" />
        <div>
          <strong>YOUR BOOK ACTIVITY</strong>
          <p>Listings, requests and completed exchanges will appear here as we build the next parts of Kitab Ghar.</p>
        </div>
      </section>

      <button type="button" className="account-signout" onClick={handleSignOut} disabled={signingOut}>
        <LogOut aria-hidden="true" />
        <span>{signingOut ? "Signing Out..." : "Sign Out"}</span>
      </button>
    </main>
  );
}