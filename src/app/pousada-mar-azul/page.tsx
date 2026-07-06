import { mockBusiness } from "../../data/mock-business";
import { mockResources } from "../../data/mock-resources";

const activeResources = mockResources.filter((resource) => resource.isActive);

const priceUnitLabels = {
  night: "noite",
  day: "dia",
  service: "serviço",
  person: "pessoa",
};

export default function PousadaMarAzulPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Pousada em {mockBusiness.city}
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            {mockBusiness.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {mockBusiness.description} Consulte disponibilidade e solicite sua
            reserva diretamente pelo WhatsApp.
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
          Estes dados ainda são estáticos, mas agora já vêm de um arquivo mock.
          Mais adiante, as acomodações serão carregadas automaticamente do banco
          de dados.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {activeResources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {resource.capacity ? (
                <p className="text-sm font-semibold text-cyan-600">
                  Até {resource.capacity} pessoas
                </p>
              ) : null}

              <h3 className="mt-3 text-xl font-bold">{resource.name}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {resource.description}
              </p>

              <p className="mt-5 text-lg font-bold">
                R$ {resource.price.toFixed(2)} /{" "}
                {priceUnitLabels[resource.priceUnit]}
              </p>
            </article>
          ))}
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
                  {activeResources.map((resource) => (
                    <option key={resource.id} value={resource.id}>
                      {resource.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="mt-8 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600">
              Enviar solicitação
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{mockBusiness.name}</p>
          <p>{mockBusiness.address}</p>
          <p>WhatsApp: {mockBusiness.whatsapp}</p>
        </div>
      </footer>
    </main>
  );
}