export function AnimatedOrigamiGoose({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 210 110"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Origami gans die van vol naar slank verandert"
    >
      <defs>
        <linearGradient id="gooseStroke" x1="10" y1="10" x2="200" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7BCB4A" />
          <stop offset="1" stopColor="#FFD95A" />
        </linearGradient>
      </defs>

      <g className="goose-thick">
        <polygon points="20,78 70,56 120,70 84,92" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="70,56 100,28 130,42 120,70" fill="#EEF7FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="100,28 132,20 124,42" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="130,42 150,34 144,50" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="118,74 178,60 170,82" fill="#EEF7FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <circle cx="140" cy="26" r="4" fill="#133A5A" />
      </g>

      <g className="goose-slim">
        <polygon points="26,78 86,56 126,66 92,90" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="86,56 120,22 146,36 126,66" fill="#EEF7FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="120,22 152,14 142,36" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="146,36 166,30 160,46" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="126,70 194,52 182,76" fill="#EEF7FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <circle cx="158" cy="20" r="4" fill="#133A5A" />
      </g>

      <path d="M168 16C178 12 188 14 198 20" stroke="#F3BF3E" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
