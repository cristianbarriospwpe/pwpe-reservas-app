import { mockBusiness } from "@/data/mock-business";

export default function AdminSettingsPage() {
  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Configurações
        </p>

        <h1 className="text-4xl font-bold">Dados do negócio</h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Configure as informações principais do negócio, WhatsApp, Pix e regras
          gerais de reserva.
        </p>

        <form className="mt-10 space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Informações principais</h2>

            <div className="mt-6 grid gap-6">
              <div>
                <label className="text-sm font-medium text-slate-200">
                  Nome do negócio
                </label>
                <input
                  type="text"
                  defaultValue={mockBusiness.name}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-200">
                    Tipo de negócio
                  </label>
                  <select
                    defaultValue={mockBusiness.businessType}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  >
                    <option value="pousada">Pousada</option>
                    <option value="vehicle_rental">
                      Aluguel de veículos
                    </option>
                    <option value="barbershop">Barbearia</option>
                    <option value="tourism">Turismo / experiências</option>
                    <option value="service">Serviços com agenda</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200">
                    Tipo de reserva
                  </label>
                  <select
                    defaultValue={mockBusiness.bookingMode}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  >
                    <option value="period">Por período</option>
                    <option value="time_slot">Por horário</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200">
                  Descrição curta
                </label>
                <textarea
                  rows={4}
                  defaultValue={mockBusiness.description}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Contato e localização</h2>

            <div className="mt-6 grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-200">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    defaultValue={mockBusiness.whatsapp}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200">
                    E-mail
                  </label>
                  <input
                    type="email"
                    defaultValue={mockBusiness.email}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200">
                  Endereço
                </label>
                <input
                  type="text"
                  defaultValue={mockBusiness.address}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Pagamentos e reservas</h2>

            <div className="mt-6 grid gap-6">
              <div>
                <label className="text-sm font-medium text-slate-200">
                  Chave Pix
                </label>
                <input
                  type="text"
                  defaultValue={mockBusiness.pixKey}
                  placeholder="Ex: CPF, telefone, e-mail ou chave aleatória"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
                <input
                  type="checkbox"
                  defaultChecked={mockBusiness.requiresManualConfirmation}
                  className="h-4 w-4"
                />
                <label className="text-sm text-slate-200">
                  Exigir confirmação manual antes de confirmar a reserva
                </label>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
                <input
                  type="checkbox"
                  defaultChecked={mockBusiness.openWhatsappAfterRequest}
                  className="h-4 w-4"
                />
                <label className="text-sm text-slate-200">
                  Abrir WhatsApp com mensagem pronta após solicitação
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Aparência</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-200">
                  Cor principal
                </label>
                <input
                  type="text"
                  defaultValue={mockBusiness.primaryColor}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200">
                  Idioma
                </label>
                <select
                  defaultValue={mockBusiness.language}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                >
                  <option value="pt-BR">Português do Brasil</option>
                  <option value="es">Espanhol</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Salvar configurações
            </button>

            <a
              href="/admin"
              className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Voltar ao dashboard
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}