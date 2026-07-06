type ResourceStatusBadgeProps = {
  isActive: boolean;
};

export function ResourceStatusBadge({ isActive }: ResourceStatusBadgeProps) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        isActive
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
          : "border-red-400/20 bg-red-400/10 text-red-300"
      }`}
    >
      {isActive ? "Ativo" : "Inativo"}
    </span>
  );
}