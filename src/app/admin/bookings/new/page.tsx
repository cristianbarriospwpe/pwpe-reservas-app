export default function NewBookingPage() {
  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Reservas
        </p>

        <h1 className="text-4xl font-bold">Nova reserva</h1>

        <p className="mt-4 text-slate-300">
          Cadastre manualmente uma solicitação de reserva para o negócio.
        </p>

        <form className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-6">
            <div>
              <label className="text-sm font-medium text-slate-200">
                Nome do cliente
              </label>
              <input
                type="text"
                placeholder="Ex: Mariana Souza"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                WhatsApp do cliente
              </label>
              <input
                type="text"
                placeholder="Ex: (22) 99999-1111"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Recurso
              </label>
              <select className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400">
                <option value="suite-casal">Suíte casal</option>
                <option value="quarto-familia">Quarto família</option>
                <option value="chale-vista-mar">Chalé vista mar</option>
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-200">
                  Data de entrada
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200">
                  Data de saída
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-200">
                  Quantidade de pessoas
                </label>
                <input
                  type="number"
                  placeholder="Ex: 2"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200">
                  Valor total
                </label>
                <input
                  type="number"
                  placeholder="Ex: 750"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Status
              </label>
              <select className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400">
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
                <option value="completed">Finalizada</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Observações
              </label>
              <textarea
                rows={4}
                placeholder="Ex: Cliente pediu check-in antecipado..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Salvar reserva
            </button>

            <a
              href="/admin/bookings"
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