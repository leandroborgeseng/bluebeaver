type AbstractLinesProps = { className?: string }

/**
 * Padrão técnico abstrato (linhas / gradiente) — sem imagem de banco.
 */
export function AbstractLines({ className }: AbstractLinesProps) {
  return (
    <div
      className={className}
      aria-hidden
    >
      <svg
        className="h-full w-full text-bb-primary/[0.1]"
        viewBox="0 0 400 200"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="200" className="fill-bb-primary/[0.04]" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={40 + i * 60}
            y1="0"
            x2={-20 + i * 70}
            y2="200"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity={0.35 + i * 0.1}
          />
        ))}
        <line
          x1="0"
          y1="140"
          x2="400"
          y2="60"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.25"
        />
      </svg>
    </div>
  )
}
