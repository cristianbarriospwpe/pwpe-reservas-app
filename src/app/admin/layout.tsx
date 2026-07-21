import Link from "next/link";
export const dynamic = "force-dynamic";

const adminLinks = [
  {
    href: "/admin",
    label: "Dashboard",
  },
  {
    href: "/admin/bookings",
    label: "Reservas",
  },
  {
    href: "/admin/resources",
    label: "Recursos",
  },
  {
    href: "/admin/availability",
    label: "Disponibilidade",
  },
  {
    href: "/admin/settings",
    label: "Configurações",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="border-b border-white/10 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              PWPE Reservas
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Painel administrativo
            </p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {children}
    </div>
  );
}