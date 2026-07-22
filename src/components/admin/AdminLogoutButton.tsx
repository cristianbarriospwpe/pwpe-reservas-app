export function AdminLogoutButton() {
  return (
    <form action="/api/admin-logout" method="POST">
      <button
        type="submit"
        className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-200"
      >
        Sair
      </button>
    </form>
  );
}