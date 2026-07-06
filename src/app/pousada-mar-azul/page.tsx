export default function PousadaMarAzulPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Pousada em Arraial do Cabo
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Pousada Mar Azul
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Hospedagem simples, confortável e próxima das principais praias.
            Consulte disponibilidade e solicite sua reserva diretamente pelo
            WhatsApp.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#reserva"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Solicitar reserva
            </a>

            <a
              href="#acomodacoes"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver acomodações
            </a>
          </div>
        </div>
      </section>

      <section id="acomodacoes" className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
          Acomodações
        </p>

        <h2 className="text-3xl font-bold">Escolha sua acomodação</h2>

        <p className="mt-4 max-w-2xl text-slate-600">
          Estes dados ainda são estáticos. Mais adiante, as acomodações serão
          carregadas automaticamente do banco de dados.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-cyan-600">
              Até 2 pessoas
            </p>
            <h3 className="mt-3 text-xl font-bold">Suíte casal</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Acomodação para casal com cama de casal e banheiro privativo.
            </p>
            <p className="mt-5 text-lg font-bold">R$ 250,00 / noite</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-cyan-600">
              Até 4 pessoas
            </p>
            <h3 className="mt-3 text-xl font-bold">Quarto família</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Quarto espaçoso para famílias, com capacidade para até 4 pessoas.
            </p>
            <p className="mt-5 text-lg font-bold">R$ 400,00 / noite</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-cyan-600">
              Até 2 pessoas
            </p>
            <h3 className="mt-3 text-xl font-bold">Chalé vista mar</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Chalé confortável com vista para o mar, ideal para casais.
            </p>
            <p className="mt-5 text-lg font-bold">R$ 450,00 / noite</p>
          </article>
        </div>
      </section>

      <section id="reserva" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
            Reserva
          </p>

          <h2 className="text-3xl font-bold">Solicitar reserva</h2>

          <p className="mt-4 max-w-2xl text-slate-600">
            Em breve este formulário vai verificar disponibilidade, salvar a
            solicitação no sistema e abrir o WhatsApp com a mensagem pronta.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Mariana Souza"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="Ex: (22) 99999-1111"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Data de entrada
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Data de saída
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Pessoas
                </label>
                <input
                  type="number"
                  placeholder="Ex: 2"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Acomodação
                </label>
                <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500">
                  <option>Suíte casal</option>
                  <option>Quarto família</option>
                  <option>Chalé vista mar</option>
                </select>
              </div>
            </div>

            <button className="mt-8 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600">
              Enviar solicitação
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}