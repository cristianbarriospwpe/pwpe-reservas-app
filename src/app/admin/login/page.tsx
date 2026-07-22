type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  const errorMessage =
    params.error === "password"
      ? "Senha incorreta. Tente novamente."
      : params.error === "config"
        ? "Configuração do login incompleta."
        : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          PWPE Reservas
        </p>

        <h1 className="mt-4 text-3xl font-bold">Acesso administrativo</h1>

        <p className="mt-3 text-sm text-slate-400">
          Digite a senha para acessar o painel de administração.
        </p>

        {errorMessage ? (
          <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
            {errorMessage}
          </div>
        ) : null}

        <form action="/api/admin-login" method="POST" className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Senha
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Digite a senha"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}