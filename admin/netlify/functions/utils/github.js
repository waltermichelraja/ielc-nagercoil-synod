// Small helper around the GitHub Contents API.
// Every function in this folder uses this instead of talking to GitHub
// directly, so there's exactly one place that knows the request shape.

const API_ROOT = "https://api.github.com";

function env(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function repoInfo() {
  return {
    owner: env("GITHUB_OWNER"),
    repo: env("GITHUB_REPO"),
    branch: env("GITHUB_BRANCH"),
    token: env("GITHUB_TOKEN"),
  };
}

async function githubRequest(path, options = {}) {
  const { token } = repoInfo();
  const res = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || `GitHub API error (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// Fetch a file's current content + sha. Returns null if it doesn't exist yet
// (useful for "create or update" flows like image uploads).
async function getFile(path) {
  const { owner, repo, branch } = repoInfo();
  try {
    const data = await githubRequest(
      `/repos/${owner}/${repo}/contents/${encodeURIComponentPath(path)}?ref=${branch}`
    );
    return {
      sha: data.sha,
      // GitHub returns base64 content, possibly with newlines
      contentBase64: data.content.replace(/\n/g, ""),
    };
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

// Create or update a file. Pass the current `sha` when updating an existing
// file (omit/undefined for a brand-new file) — GitHub uses this to prevent
// silently clobbering someone else's concurrent edit.
async function putFile({ path, contentBase64, message, sha }) {
  const { owner, repo, branch } = repoInfo();
  const body = {
    message,
    content: contentBase64,
    branch,
    ...(sha ? { sha } : {}),
  };

  const data = await githubRequest(
    `/repos/${owner}/${repo}/contents/${encodeURIComponentPath(path)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  return { sha: data.content.sha };
}

// Path segments need encoding individually — encodeURIComponent would also
// escape the "/" separators, which GitHub's API needs intact.
function encodeURIComponentPath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export { getFile, putFile, repoInfo };
