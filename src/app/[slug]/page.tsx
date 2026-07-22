import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicBookingForm } from "@/components/public/PublicBookingForm";
import { HotelGallery } from "@/components/public/HotelGallery";
import { getBusinessBySlug } from "@/services/businesses";
import { getActiveResourcesByBusinessId } from "@/services/resources";

export const dynamic = "force-dynamic";

type PublicBusinessPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const hotelGalleryImages = [
  {
    src: "/demo/ta-em-casa-park-hotel/galeria-1.jpg",
    alt: "Área externa do Tá em Casa Park Hotel",
  },
  {
    src: "/demo/ta-em-casa-park-hotel/galeria-2.jpg",
    alt: "Piscina e área de lazer do Tá em Casa Park Hotel",
  },
  {
    src: "/demo/ta-em-casa-park-hotel/galeria-3.jpg",
    alt: "Área verde com piscina do Tá em Casa Park Hotel",
  },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default async function PublicBusinessPage({
  params,
}: PublicBusinessPageProps) {
  const { slug } = await params;

  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const resources = await getActiveResourcesByBusinessId(business.id);

  if (business.slug === "ta-em-casa-park-hotel") {
    return (
      <main className="min-h-screen bg-[#FFF7E8] text-[#1F1A17]">
        <section className="relative overflow-hidden bg-[#7A0909] text-white">
          <div className="absolute inset-0">
            <Image
              src="/demo/ta-em-casa-park-hotel/hero.jpg"
              alt="Área de lazer do Tá em Casa Park Hotel"
              fill
              priority
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#7A0909]/95 via-[#7A0909]/75 to-[#0B5D2A]/80" />
          </div>

          <div className="relative mx-auto grid min-h-[720px] w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
            <div>
              <Link
                href="/"
                className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                ← PWPE Reservas
              </Link>

              <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-[#F6D77A]">
                Lagoa do Mato · Itatira · Ceará
              </p>

              <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight sm:text-7xl">
                Tá em Casa Park Hotel
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                Hotel com área verde, piscina, espaço de lazer e atendimento
                direto pelo WhatsApp para solicitações de reserva.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#reservar"
                  className="rounded-2xl bg-[#F6D77A] px-6 py-3 text-center font-black text-[#4A0606] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#FFE89A]"
                >
                  Solicitar reserva
                </a>

                <a
                  href="https://wa.me/5588981011427?text=Ol%C3%A1%2C%20quero%20fazer%20uma%20reserva%20no%20T%C3%A1%20em%20Casa%20Park%20Hotel."
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "15 quartos",
                  "Piscina",
                  "Área verde",
                  "Reservas pelo WhatsApp",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/20 bg-white/15 p-4 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="overflow-hidden rounded-[1.5rem] bg-white">
                <Image
                  src="/demo/ta-em-casa-park-hotel/logo.jpg"
                  alt="Logo Tá em Casa Park Hotel"
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C90000]">
                Sobre o hotel
              </p>

              <h2 className="mt-4 text-4xl font-black">
                Um espaço para descansar, aproveitar a piscina e curtir com a
                família.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#4D4038]">
                O Tá em Casa Park Hotel fica em Lagoa do Mato, Itatira - CE, e
                conta com estrutura de lazer, área externa e quartos para
                hospedagem com solicitação de reserva direta.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#E8D8BD] bg-white p-6 shadow-xl shadow-[#6B3A00]/5">
              <h3 className="text-2xl font-black">Informações</h3>

              <div className="mt-5 space-y-4 text-[#4D4038]">
                <div>
                  <p className="text-sm font-bold text-[#C90000]">Local</p>
                  <p>Lagoa do Mato, Itatira - Ceará</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#C90000]">WhatsApp</p>
                  <p>(88) 98101-1427</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#C90000]">Instagram</p>
                  <p>@taemcasaparkhotel</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#C90000]">Reservas</p>
                  <p>Solicitação direta pelo site e confirmação pelo WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C90000]">
                Galeria
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Conheça a área externa do hotel.
              </h2>
            </div>

            <p className="text-sm font-semibold text-[#4D4038]">
              Clique nas fotos para ampliar
            </p>
          </div>

          <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-stretch">
              <div className="rounded-[2rem] border border-[#E8D8BD] bg-white p-6 shadow-xl shadow-[#6B3A00]/5">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C90000]">
                  Localização
                </p>

                <h2 className="mt-4 text-3xl font-black">
                  Estamos em Lagoa do Mato, Itatira - CE.
                </h2>

                <p className="mt-4 leading-7 text-[#4D4038]">
                  O Tá em Casa Park Hotel fica em uma área tranquila, com espaço verde,
                  piscina e estrutura para receber hóspedes e famílias.
                </p>

                <a
                  href="https://maps.app.goo.gl/VWyXANfr8R98qZqU9"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-2xl bg-[#0B5D2A] px-5 py-3 text-center font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0A4D24]"
                >
                  Abrir no Google Maps
                </a>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-[#E8D8BD] bg-white shadow-xl shadow-[#6B3A00]/10">
                <iframe
                  title="Localização do Tá em Casa Park Hotel"
                  src="https://www.google.com/maps?q=-4.65563,-39.673691&z=15&output=embed"
                  className="h-[360px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>

          <HotelGallery images={hotelGalleryImages} />
        </section>

        <section className="bg-[#FFF7E8] py-14 text-[#1F1A17]">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C90000]">
              Acomodações
            </p>

            <h2 className="mt-4 text-4xl font-black">
              Quartos disponíveis para solicitação de reserva.
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {resources.map((resource) => (
                <article
                  key={resource.id}
                  className="rounded-[2rem] border border-[#E8D8BD] bg-white p-6 shadow-xl shadow-[#6B3A00]/5"
                >
                  <h3 className="text-2xl font-black">{resource.name}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#4D4038]">
                    {resource.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {resource.capacity ? (
                      <span className="rounded-full bg-[#0B5D2A]/10 px-4 py-2 text-sm font-bold text-[#0B5D2A]">
                        Até {resource.capacity} pessoas
                      </span>
                    ) : null}

                    <span className="rounded-full bg-[#F6D77A] px-4 py-2 text-sm font-black text-[#4A0606]">
                      {formatPrice(resource.price)} / diária
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="reservar"
          className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C90000]">
              Reserva
            </p>

            <h2 className="mt-4 text-4xl font-black">
              Solicite sua reserva pelo formulário.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#4D4038]">
              Preencha seus dados, escolha as datas, selecione uma acomodação e envie a
              solicitação direto pelo WhatsApp.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-[#E8D8BD] bg-white p-4 shadow-2xl shadow-[#6B3A00]/10">
            <PublicBookingForm
              businessId={business.id}
              businessName={business.name}
              businessWhatsapp={business.whatsapp}
              bookingMode={business.bookingMode}
              resources={resources}
            />
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E8D8BD] bg-white p-5 text-center shadow-lg shadow-[#6B3A00]/5">
              <p className="text-lg font-black text-[#C90000]">1</p>
              <p className="mt-2 text-sm font-bold text-[#1F1A17]">
                Escolha o quarto e as datas
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8D8BD] bg-white p-5 text-center shadow-lg shadow-[#6B3A00]/5">
              <p className="text-lg font-black text-[#C90000]">2</p>
              <p className="mt-2 text-sm font-bold text-[#1F1A17]">
                Envie a solicitação
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8D8BD] bg-white p-5 text-center shadow-lg shadow-[#6B3A00]/5">
              <p className="text-lg font-black text-[#C90000]">3</p>
              <p className="mt-2 text-sm font-bold text-[#1F1A17]">
                Aguarde confirmação
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10"
        >
          ← PWPE Reservas
        </Link>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Reservas online
          </p>

          <h1 className="mt-4 text-5xl font-black">{business.name}</h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {business.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300">
              {business.city} - {business.state}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300">
              Atendimento pelo WhatsApp
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {resources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-2xl font-bold">{resource.name}</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {resource.description}
              </p>

              <p className="mt-5 text-xl font-black text-cyan-300">
                {formatPrice(resource.price)}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white p-4 text-slate-950">
          <PublicBookingForm
            businessId={business.id}
            businessName={business.name}
            businessWhatsapp={business.whatsapp}
            bookingMode={business.bookingMode}
            resources={resources}
          />
        </section>
      </section>
    </main>
  );
}