import { login } from "../identity.js";

export default function Login() {
  return (
    <div className="login-screen">
      <div className="login-card">
        <img className="login-logo" src="/ielc-logo.png" alt="IELC logo" />
        <h1>IELC Nagercoil Synod</h1>
        <p className="login-subtitle">Admin Dashboard</p>
        <button type="button" className="btn-primary" onClick={login}>
          Log in
        </button>
        <p className="login-hint">
          Don't have an account yet? Ask the site administrator to send you an invite.
        </p>
      </div>
    </div>
  );
}
