export function Logo({ light = true, size = 30 }: { light?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/logo/logo.png"
        alt="Novara Project"
        width={size}
        height={size}
        className="object-contain"
      />
      <span className={`text-[15px] font-bold tracking-[0.14em] ${light ? "text-white" : "text-navy-900"}`}>
        NOVARA
      </span>
    </span>
  );
}