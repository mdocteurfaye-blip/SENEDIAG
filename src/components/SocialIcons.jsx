export function XIcon({ size = 20, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M4 4L20 20M20 4L4 20"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TikTokIcon({ size = 20, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M14 3v10.15A4.85 4.85 0 1 1 9.15 8.3c.38 0 .75.04 1.1.13v3.05a1.95 1.95 0 1 0 .82 1.59V3h2.93Z"
        fill="currentColor"
      />
      <path
        d="M14 3c.52 2.55 2.1 4.45 4.85 4.82v3.03c-1.86-.08-3.5-.72-4.85-1.8V3Z"
        fill="currentColor"
      />
    </svg>
  )
}
