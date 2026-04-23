export function TechHeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -top-32 left-1/2 h-[32rem] w-[min(120vw,120rem)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(0,102,178,0.14),transparent_72%)]"
        style={{ willChange: "transform" }}
      />
      <div
        className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 bg-[radial-gradient(circle_at_center,rgba(40,180,0,0.1),transparent_60%)]"
        style={{ willChange: "transform" }}
      />
      <svg
        className="absolute inset-0 h-full w-full text-bb-primary/[0.07]"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="bb-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bb-grid)" />
      </svg>
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
