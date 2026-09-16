// Small helpers shared by every function: a consistent JSON response
// shape, and the Netlify Identity check that gates all of them.

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

// Netlify automatically verifies the Identity JWT on incoming requests and,
// if valid, populates context.clientContext.user. If it's missing, either
// the request had no token or the token was invalid/expired — either way,
// refuse. This is the entire auth check every function needs.
function requireUser(context) {
  const user = context?.clientContext?.user;
  if (!user) {
    const err = new Error("Not signed in.");
    err.statusCode = 401;
    throw err;
  }
  return user;
}

export { json, requireUser };
