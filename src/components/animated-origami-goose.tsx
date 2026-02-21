export function AnimatedOrigamiGoose({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Geanimeerde origami gans"
    >
      <defs>
        <linearGradient id="gooseLine" x1="0" y1="0" x2="140" y2="80">
          <stop offset="0" stopColor="#7BCB4A" />
          <stop offset="1" stopColor="#FFD95A" />
        </linearGradient>
      </defs>

      <g className="goose-thick">
        <polygon points="16,58 44,40 72,52 52,66" fill="#ffffff" stroke="url(#gooseLine)" strokeWidth="3" />
        <polygon points="44,40 64,22 78,40 72,52" fill="#eef8ff" stroke="url(#gooseLine)" strokeWidth="3" />
        <polygon points="64,22 84,15 79,30" fill="#ffffff" stroke="url(#gooseLine)" strokeWidth="3" />
        <polygon points="75,56 106,48 102,62" fill="#eef8ff" stroke="url(#gooseLine)" strokeWidth="3" />
      </g>

      <g className="goose-slim">
        <polygon points="22,58 52,44 74,50 58,64" fill="#ffffff" stroke="url(#gooseLine)" strokeWidth="3" />
        <polygon points="52,44 72,18 84,34 74,50" fill="#eef8ff" stroke="url(#gooseLine)" strokeWidth="3" />
        <polygon points="72,18 92,10 86,26" fill="#ffffff" stroke="url(#gooseLine)" strokeWidth="3" />
        <polygon points="78,56 116,44 110,60" fill="#eef8ff" stroke="url(#gooseLine)" strokeWidth="3" />
      </g>

      <circle cx="97" cy="12" r="6" fill="#7BCB4A" fillOpacity="0.4" />
      <path d="M101 19C109 15 116 16 122 22" stroke="#FFD95A" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
