// Minimal inline SVG icons — no external icon library needed.
// Every icon takes the currentColor so it inherits text color from its parent.

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.24 4.32 15.35 4.25 14.3 4.25c-2.2 0-3.7 1.34-3.7 3.8v2.45H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.3 9.6v4.8L14.7 12z" />
    </svg>
  );
}

export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.2A8.4 8.4 0 1 0 12 3.5Zm0 1.7a6.7 6.7 0 0 1 5.6 10.3l-.2.3.6 2.2-2.3-.6-.3.2A6.7 6.7 0 1 1 12 5.2Zm-2.9 3.1c-.2 0-.4.1-.6.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.1 1.4 2.3 3.5 3.1 1.7.7 2.1.6 2.4.5.4-.1 1.2-.5 1.4-1s.2-.9.1-1c-.1-.1-.2-.2-.4-.3l-1.5-.7c-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.6-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3.1-.4l-.7-1.6c-.1-.3-.3-.3-.4-.3Z" />
    </svg>
  );
}

export function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M4 4l7 8.5L4.4 20H6l5.9-6.6L16.5 20H20l-7.3-8.9L19.9 4h-1.6l-5.4 6-4.5-6H4Zm2.4 1.3h2l9.2 12.4h-2L6.4 5.3Z" />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19.5 19.5 15.3 15.3" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
    </svg>
  );
}
