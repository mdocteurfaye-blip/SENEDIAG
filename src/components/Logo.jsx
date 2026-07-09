export default function Logo({ className = 'w-9 h-9', markClassName = '' }) {
  return (
    <div className={`${className} ${markClassName} rounded-xl bg-gradient-to-br from-brand-dark via-primary to-teal shadow-md flex items-center justify-center overflow-hidden`}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="w-[82%] h-[82%]"
        fill="none"
      >
        <path
          d="M56 31.5C49.8 18.9 40.8 12.2 30.5 12.2 18.2 12.2 8.6 22.2 6.8 34.3c4.7 8.4 13 13.5 24.1 13.5 13.4 0 22.5-7.7 25.1-16.3Z"
          fill="rgba(255,255,255,.26)"
        />
        <path
          d="M53.7 27.5C45.2 9.9 22.4 7.4 10.3 22.8c-3.6 4.6-4.9 9.6-3.5 13.8 3.7-9.7 11.9-16.1 22.7-16.1 8.1 0 15.5 2.5 24.2 7Z"
          fill="white"
          opacity=".92"
        />
        <path
          d="M12.1 41.5c8 11 25.2 11.6 35.1 1.8 6-6 6.8-13.6 1.5-19.2.5 9.7-6.3 18.6-17.6 20.4-6.2 1-12.9-.2-19-3Z"
          fill="white"
          opacity=".92"
        />
        <path
          d="M42.1 31.9c0 6-4.8 10.8-10.8 10.8s-10.8-4.8-10.8-10.8 4.8-10.8 10.8-10.8 10.8 4.8 10.8 10.8Z"
          fill="rgba(255,255,255,.84)"
        />
        <path
          d="M47.8 33.5c-2.1 8-10.1 13.2-18.7 12.2 7-1.8 11.9-7.5 11.9-14.2 0-7.4-6-13.4-13.4-13.4 9.4-2 19.3 4.6 20.2 15.4Z"
          fill="rgba(255,255,255,.34)"
        />
      </svg>
    </div>
  )
}
