interface WaveDividerProps {
  flip?: boolean;
  color?: string;
  className?: string;
}

export default function WaveDivider({ flip = false, color = 'hsl(var(--cream))', className = '' }: WaveDividerProps) {
  return (
    <div
      className={`absolute left-0 w-full overflow-hidden leading-none ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}
      style={{ zIndex: 5 }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full h-[40px] sm:h-[60px] lg:h-[80px]"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
