interface OrnamentalDividerProps {
  className?: string;
  light?: boolean;
}

export default function OrnamentalDivider({ className = '', light = false }: OrnamentalDividerProps) {
  const lineColor = light ? 'bg-white/20' : 'bg-[hsl(var(--camel))]/30';
  const starColor = light ? 'text-white/30' : 'text-[hsl(var(--camel))]/50';

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-px w-12 ${lineColor}`} />
      <span className={`text-sm ${starColor}`}>&#10022;</span>
      <div className={`h-px w-12 ${lineColor}`} />
    </div>
  );
}
