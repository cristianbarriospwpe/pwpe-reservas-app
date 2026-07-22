import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export const dynamic = "force-dynamic";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Reservas",
    href: "/admin/bookings",
  },
  {
    label: "Recursos",
    href: "/admin/resources",
  },
  {
    label: "Bloqueios",
    href: "/admin/availability",
  },
  {
    label: "Configurações",
    href: "/admin/settings",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-slate-950/95 px-6 py-8 lg:block">
        <Link href="/admin" className="block">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            PWPE
          </p>

          <h1 className="mt-2 text-2xl font-bold">Reservas</h1>
        </Link>

        <nav className="mt-10 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link href="/admin">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                PWPE
              </p>
              <p className="font-bold">Reservas</p>
            </Link>

            <AdminLogoutButton />
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}