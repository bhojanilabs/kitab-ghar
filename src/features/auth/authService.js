import { supabase } from "../../services/supabase/supabase";

const getRedirectUrl = (path) => `${window.location.origin}${path}`;

export async function signUpWithEmail({ displayName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { display_name: displayName.trim() },
      emailRedirectTo: getRedirectUrl("/auth/callback"),
    },
  });

  if (error) throw error;
  return data;
}

export async function signInWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) throw error;
  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: getRedirectUrl("/auth/callback") },
  });

  if (error) throw error;
  return data;
}

export async function linkGoogleIdentity() {
  const { data, error } = await supabase.auth.linkIdentity({
    provider: "google",
    options: { redirectTo: getRedirectUrl("/auth/callback") },
  });

  if (error) throw error;
  return data;
}

export async function getUserIdentities() {
  const { data, error } = await supabase.auth.getUserIdentities();

  if (error) throw error;
  return data.identities ?? [];
}

export async function resendVerificationEmail(email) {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email: email.trim(),
    options: { emailRedirectTo: getRedirectUrl("/auth/callback") },
  });

  if (error) throw error;
  return data;
}

export async function sendPasswordResetEmail(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: getRedirectUrl("/auth/reset-password"),
  });

  if (error) throw error;
  return data;
}

export async function updatePassword(password, currentPassword) {
  const attributes = { password };

  if (currentPassword) attributes.current_password = currentPassword;

  const { data, error } = await supabase.auth.updateUser(attributes);

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}