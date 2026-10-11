export function Logo({ light = true, size = 30, inheritColor = false }: { light?: boolean; size?: number; inheritColor?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/logo/logo.png"
        alt="Novara Project"
        width={size}
        height={size}
        className="object-contain"
      />
      <span className={`text-[15px] font-bold tracking-[0.14em] ${inheritColor ? "text-current" : light ? "text-white" : "text-navy-900"}`}>
        NOVARA
      </span>
    </span>
  );
}
