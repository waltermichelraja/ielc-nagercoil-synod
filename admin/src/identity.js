// Thin wrapper around netlify-identity-widget so the rest of the app
// doesn't need to know about that library directly.
import netlifyIdentity from "netlify-identity-widget";

let initialized = false;

function init() {
  if (initialized) return;
  netlifyIdentity.init();
  initialized = true;
}

function currentUser() {
  return netlifyIdentity.currentUser();
}

function login() {
  netlifyIdentity.open("login");
}

function logout() {
  netlifyIdentity.logout();
}

function onAuthChange(callback) {
  netlifyIdentity.on("login", callback);
  netlifyIdentity.on("logout", () => callback(null));
  netlifyIdentity.on("init", callback);
}

// Returns a fresh JWT for the current session (refreshes if needed).
async function getToken() {
  const user = currentUser();
  if (!user) return null;
  return user.jwt();
}

export { init, currentUser, login, logout, onAuthChange, getToken };
