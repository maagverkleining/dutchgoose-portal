export function AnimatedOrigamiGoose({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 140"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Origami gans die van vol naar slank verandert"
    >
      <defs>
        <linearGradient id="gooseStroke" x1="20" y1="20" x2="280" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7BCB4A" />
          <stop offset="1" stopColor="#FFD95A" />
        </linearGradient>
        <linearGradient id="gooseFill" x1="30" y1="20" x2="260" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#F4FAFF" />
        </linearGradient>
      </defs>

      <g className="goose-thick">
        <polygon points="52,88 114,62 164,78 110,104" fill="url(#gooseFill)" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="164,78 216,64 246,80 204,98" fill="#ECF8FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="78,78 134,48 176,66 126,88" fill="#EAF6FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="156,66 170,34 196,22 204,52 180,68" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="190,24 214,18 206,36" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="214,22 234,20 222,30" fill="#FFD95A" stroke="#E4AE2E" strokeWidth="3" />
        <circle cx="200" cy="30" r="3.5" fill="#133A5A" />
        <polygon points="46,88 62,74 68,92" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
      </g>

      <g className="goose-slim">
        <polygon points="70,90 132,64 176,76 126,100" fill="url(#gooseFill)" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="176,76 228,60 258,74 214,92" fill="#ECF8FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="98,78 154,50 188,62 140,86" fill="#EAF6FF" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="170,62 188,28 212,16 220,44 196,64" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="206,18 230,14 222,30" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
        <polygon points="230,16 252,14 238,26" fill="#FFD95A" stroke="#E4AE2E" strokeWidth="3" />
        <circle cx="216" cy="24" r="3.5" fill="#133A5A" />
        <polygon points="64,90 80,76 84,92" fill="#ffffff" stroke="url(#gooseStroke)" strokeWidth="4" />
      </g>

      <path d="M24 112C62 128 112 126 168 120C214 116 252 104 284 84" stroke="#B7D96C" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
