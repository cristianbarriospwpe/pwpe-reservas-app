"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateBusiness } from "@/services/businesses";
import type { BookingMode, Business, BusinessType } from "@/types/business";

type AdminBusinessSettingsFormProps = {
  business: Business;
};

export function AdminBusinessSettingsForm({
  business,
}: AdminBusinessSettingsFormProps) {
  const router = useRouter();

  const [name, setName] = useState(business.name);
  const [slug, setSlug] = useState(business.slug);
  const [businessType, setBusinessType] = useState<BusinessType>(
    business.businessType,
  );
  const [bookingMode, setBookingMode] = useState<BookingMode>(
    business.bookingMode,
  );
  const [description, setDescription] = useState(business.description);
  const [whatsapp, setWhatsapp] = useState(business.whatsapp);
  const [email, setEmail] = useState(business.email);
  const [address, setAddress] = useState(business.address);
  const [city, setCity] = useState(business.city);
  const [state, setState] = useState(business.state);
  const [country, setCountry] = useState(business.country);
  const [pixKey, setPixKey] = useState(business.pixKey ?? "");
  const [primaryColor, setPrimaryColor] = useState(business.primaryColor);
  const [language, setLanguage] = useState<"pt-BR" | "es">(business.language);
  const [requiresManualConfirmation, setRequiresManualConfirmation] = useState(
    business.requiresManualConfirmation,
  );
  const [openWhatsappAfterRequest, setOpenWhatsappAfterRequest] = useState(
    business.openWhatsappAfterRequest,
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !slug || !businessType || !bookingMode || !whatsapp) {
      setErrorMessage("Preencha os campos obrigatórios antes de salvar.");
      return;
    }

    setIsSubmitting(true);

    const updated = await updateBusiness({
      businessId: business.id,
      name,
      slug,
      businessType,
      bookingMode,
      description,
      whatsapp,
      email,
      address,
      city,
      state,
      country,
      pixKey,
      primaryColor,
      language,
      requiresManualConfirmation,
      openWhatsappAfterRequest,
    });

    setIsSubmitting(false);

    if (!updated) {
      setErrorMessage(
        "Não foi possível salvar as configurações. Tente novamente.",
      );
      return;
    }

    setSuccessMessage("Configurações salvas com sucesso.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Informações principais</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Nome do negócio
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Ex: Pousada Mar Azul"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              Slug da página
            </label>

            <input
              type="text"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Ex: pousada-mar-azul"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Tipo de negócio
            </label>

            <select
              value={businessType}
              onChange={(event) =>
                setBusinessType(event.target.value as BusinessType)
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="pousada">Pousada</option>
              <option value="vehicle_rental">Aluguel de veículos</option>
              <option value="barbershop">Barbearia</option>
              <option value="tourism">Turismo</option>
              <option value="service">Serviço</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              Modo de reserva
            </label>

            <select
              value={bookingMode}
              onChange={(event) =>
                setBookingMode(event.target.value as BookingMode)
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="period">Período</option>
              <option value="time_slot">Horário</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-semibold text-slate-300">
            Descrição
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="Descreva o negócio."
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Contato e localização</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              WhatsApp
            </label>

            <input
              type="text"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="+55 22 99999-9999"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="contato@negocio.com.br"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-semibold text-slate-300">
            Endereço
          </label>

          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="Rua, bairro, referência..."
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Cidade
            </label>

            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Arraial do Cabo"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              Estado
            </label>

            <input
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="RJ"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              País
            </label>

            <input
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Brasil"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Reservas e confirmação</h2>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Chave Pix (opcional)
          </label>

          <input
            type="text"
            value={pixKey}
            onChange={(event) => setPixKey(event.target.value)}
            placeholder="CPF, CNPJ, email, telefone ou chave aleatória"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Em breve esta chave poderá ser usada para instruções de pagamento nas
            reservas. Nesta versão, a reserva é confirmada manualmente pelo painel.
          </p>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={requiresManualConfirmation}
              onChange={(event) =>
                setRequiresManualConfirmation(event.target.checked)
              }
              className="h-4 w-4"
            />

            Exigir confirmação manual das reservas
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={openWhatsappAfterRequest}
              onChange={(event) =>
                setOpenWhatsappAfterRequest(event.target.checked)
              }
              className="h-4 w-4"
            />

            Abrir WhatsApp depois da solicitação
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Aparência</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Cor principal
            </label>

            <input
              type="text"
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="#22d3ee"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              Idioma
            </label>

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as "pt-BR" | "es")
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="pt-BR">Português Brasil</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </section>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-300">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Salvando..." : "Salvar configurações"}
      </button>
    </form>
  );
}