export default function NewResourcePage() {
  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Recursos
        </p>

        <h1 className="text-4xl font-bold">Novo recurso</h1>

        <p className="mt-4 text-slate-300">
          Cadastre uma acomodação, veículo, serviço ou experiência que poderá
          receber reservas.
        </p>

        <form className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-6">
            <div>
              <label className="text-sm font-medium text-slate-200">
                Nome do recurso
              </label>
              <input
                type="text"
                placeholder="Ex: Suíte casal"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Tipo de recurso
              </label>
              <select className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400">
                <option value="accommodation">Acomodação</option>
                <option value="vehicle">Veículo</option>
                <option value="service">Serviço</option>
                <option value="experience">Experiência</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Descrição
              </label>
              <textarea
                rows={4}
                placeholder="Descreva o recurso oferecido..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-200">
                  Capacidade
                </label>
                <input
                  type="number"
                  placeholder="Ex: 2"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200">
                  Preço
                </label>
                <input
                  type="number"
                  placeholder="Ex: 250"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Unidade de preço
              </label>
              <select className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400">
                <option value="night">Por noite</option>
                <option value="day">Por dia</option>
                <option value="service">Por serviço</option>
                <option value="person">Por pessoa</option>
              </select>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
              <input type="checkbox" defaultChecked className="h-4 w-4" />
              <label className="text-sm text-slate-200">
                Recurso ativo para reservas
              </label>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Salvar recurso
            </button>

            <a
              href="/admin/resources"
              className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Cancelar
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}