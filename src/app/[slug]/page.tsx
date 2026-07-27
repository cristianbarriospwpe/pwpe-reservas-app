import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HotelGallery } from "@/components/public/HotelGallery";
import { PublicBookingForm } from "@/components/public/PublicBookingForm";
import { getBusinessBySlug } from "@/services/businesses";
import { getActiveResourcesByBusinessId } from "@/services/resources";

export const dynamic = "force-dynamic";

type PublicBusinessPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type InfoItem = {
  label: string;
  value: string;
};

type GalleryImage = {
  src: string;
  alt: string;
};

type LandingConfig = {
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  assetBase: string;
  heroAlt: string;
  badges: string[];
  galleryTitle: string;
  gallerySubtitle: string;
  galleryImages: GalleryImage[];
  infoItems: InfoItem[];
  locationTitle: string;
  locationText: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  instagramUrl?: string;
  instagramHandle?: string;
  whatsappDisplay?: string;
  theme: {
    background: string;
    surface: string;
    dark: string;
    primary: string;
    primaryDark: string;
    accent: string;
    text: string;
    muted: string;
  };
};

const landingConfigs: Record<string, LandingConfig> = {
  "ta-em-casa-park-hotel": {
    title: "Tá em Casa Park Hotel",
    subtitle: "Lagoa do Mato · Itatira · Ceará",
    eyebrow: "Hospedagem com lazer",
    description:
      "Hotel com área verde, piscina, espaço de lazer e atendimento direto pelo WhatsApp para solicitações de reserva.",
    assetBase: "/demo/ta-em-casa-park-hotel",
    heroAlt: "Área de lazer do Tá em Casa Park Hotel",
    badges: ["15 quartos", "Piscina", "Área verde", "Reservas pelo WhatsApp"],
    galleryTitle: "Conheça a área externa do hotel.",
    gallerySubtitle: "Clique nas fotos para ampliar",
    galleryImages: [
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
    ],
    infoItems: [
      {
        label: "Local",
        value: "Lagoa do Mato, Itatira - Ceará",
      },
      {
        label: "WhatsApp",
        value: "(88) 98101-1427",
      },
      {
        label: "Instagram",
        value: "@taemcasaparkhotel",
      },
      {
        label: "Reservas",
        value: "Solicitação direta pelo site e confirmação pelo WhatsApp.",
      },
    ],
    locationTitle: "Estamos em Lagoa do Mato, Itatira - CE.",
    locationText:
      "O Tá em Casa Park Hotel fica em uma área tranquila, com espaço verde, piscina e estrutura para receber hóspedes e famílias.",
    googleMapsUrl: "https://maps.app.goo.gl/VWyXANfr8R98qZqU9",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=-4.65563,-39.673691&z=15&output=embed",
    instagramUrl: "https://www.instagram.com/taemcasaparkhotel/",
    instagramHandle: "@taemcasaparkhotel",
    whatsappDisplay: "(88) 98101-1427",
    theme: {
      background: "#FFF7E8",
      surface: "#FFFFFF",
      dark: "#1F1A17",
      primary: "#C90000",
      primaryDark: "#7A0909",
      accent: "#F6D77A",
      text: "#1F1A17",
      muted: "#4D4038",
    },
  },
  "hotel-nacional-palace": {
    title: "Hotel Nacional Palace",
    subtitle: "Foz do Iguaçu · Paraná",
    eyebrow: "Hospedagem em Foz do Iguaçu",
    description:
      "Hospedagem prática em Foz do Iguaçu, com quartos confortáveis, piscina ao ar livre e atendimento direto pelo WhatsApp para solicitações de reserva.",
    assetBase: "/demo/hotel-nacional-palace",
    heroAlt: "Piscina do Hotel Nacional Palace",
    badges: [
      "Mais de 50 quartos",
      "Piscina ao ar livre",
      "Foz do Iguaçu",
      "Reservas pelo WhatsApp",
    ],
    galleryTitle: "Conheça a estrutura do hotel.",
    gallerySubtitle: "Clique nas fotos para ampliar",
    galleryImages: [
      {
        src: "/demo/hotel-nacional-palace/galeria-1.jpg",
        alt: "Fachada do Hotel Nacional Palace",
      },
      {
        src: "/demo/hotel-nacional-palace/galeria-2.jpg",
        alt: "Quarto do Hotel Nacional Palace",
      },
      {
        src: "/demo/hotel-nacional-palace/galeria-3.jpg",
        alt: "Acomodação do Hotel Nacional Palace",
      },
      {
        src: "/demo/hotel-nacional-palace/galeria-4.jpg",
        alt: "Piscina do Hotel Nacional Palace ao entardecer",
      },
      {
        src: "/demo/hotel-nacional-palace/galeria-5.jpg",
        alt: "Área de refeições do Hotel Nacional Palace",
      },
    ],
    infoItems: [
      {
        label: "Local",
        value: "Foz do Iguaçu - Paraná",
      },
      {
        label: "Estrutura",
        value: "Mais de 50 quartos, piscina e área de convivência.",
      },
      {
        label: "Perfil",
        value: "Hotel prático para turismo, trabalho, casais e famílias.",
      },
      {
        label: "Reservas",
        value: "Solicitação direta pelo site e confirmação pelo WhatsApp.",
      },
    ],
    locationTitle: "Estamos em Foz do Iguaçu - PR.",
    locationText:
      "O Hotel Nacional Palace oferece hospedagem prática em Foz do Iguaçu, com estrutura para receber casais, famílias, grupos e viajantes a trabalho.",
    googleMapsUrl: "https://maps.google.com/?q=Hotel%20Nacional%20Palace%20Foz%20do%20Igua%C3%A7u",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=-25.516325,-54.5903743&z=15&output=embed",
    whatsappDisplay: "+55 45 99922-2221",
    theme: {
      background: "#FFF8EF",
      surface: "#FFFFFF",
      dark: "#201A1A",
      primary: "#8B1E2D",
      primaryDark: "#55121C",
      accent: "#00A7C8",
      text: "#1F1A17",
      muted: "#4D4038",
    },
   },

  "apartamentos-mobiliados-ipatinga": {
    title: "Apartamentos Mobiliados Ipatinga",
    subtitle: "Ipatinga · Minas Gerais",
    eyebrow: "Hospedagem por temporada",
    description:
      "Apartamentos e casas mobiliadas em Ipatinga, com opções para famílias, grupos e viajantes a trabalho. Solicite sua reserva direto pelo WhatsApp.",
    assetBase: "/demo/apartamentos-mobiliados-ipatinga",
    heroAlt: "Apartamento mobiliado em Ipatinga",
    badges: [
      "Apartamentos mobiliados",
      "Opções com garagem",
      "Até 9 pessoas",
      "Reservas pelo WhatsApp",
    ],
    galleryTitle: "Conheça alguns ambientes.",
    gallerySubtitle:
      "Veja fotos dos apartamentos, quartos, salas, cozinha e entrada das unidades.",
    galleryImages: [
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/galeria-1.jpg",
        alt: "Sala mobiliada em Ipatinga",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/galeria-2.jpg",
        alt: "Cozinha equipada do apartamento",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/galeria-3.jpg",
        alt: "Quarto mobiliado com cama de casal",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/galeria-4.jpg",
        alt: "Área de refeições do apartamento",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/galeria-5.jpg",
        alt: "Entrada de uma das unidades",
      },
    ],
    infoItems: [
      {
        label: "Local",
        value: "Ipatinga - Minas Gerais",
      },
      {
        label: "Hospedagem",
        value: "Apartamentos e casas mobiliadas para temporada.",
      },
      {
        label: "Capacidade",
        value: "Opções para 4, 5, 6, 8 e até 9 pessoas.",
      },
      {
        label: "Reservas",
        value: "Solicitação direta pelo site e confirmação pelo WhatsApp.",
      },
    ],
    locationTitle: "Hospedagem mobiliada em Ipatinga - MG.",
    locationText:
      "Opções práticas para quem precisa se hospedar em Ipatinga por trabalho, viagem, família ou temporada.",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Apartamentos%20Mobiliados%20Ipatinga",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Ipatinga%20MG&z=12&output=embed",
    instagramUrl: "https://www.instagram.com/apartamentosmobiliadosipatinga/",
    instagramHandle: "@apartamentosmobiliadosipatinga",
    whatsappDisplay: "+55 31 98834-8868",
    theme: {
      background: "#F4F7FB",
      surface: "#FFFFFF",
      dark: "#0F172A",
      primary: "#2563EB",
      primaryDark: "#1E3A8A",
      accent: "#F59E0B",
      text: "#0F172A",
      muted: "#475569",
    },
  },
};

 

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function buildWhatsAppUrl(phone: string, businessName: string) {
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    return "#";
  }

  const message = encodeURIComponent(
    `Olá, quero fazer uma reserva no ${businessName}.`,
  );

  return `https://wa.me/${normalizedPhone}?text=${message}`;
}

function getFallbackConfig(slug: string): LandingConfig {
  return {
    title: "PWPE Reservas",
    subtitle: "Reservas online",
    eyebrow: "Reservas diretas",
    description:
      "Página de reservas com atendimento direto pelo WhatsApp e painel administrativo.",
    assetBase: `/demo/${slug}`,
    heroAlt: "Página de reservas",
    badges: ["Reservas online", "WhatsApp", "Painel administrativo"],
    galleryTitle: "Galeria",
    gallerySubtitle: "Clique nas fotos para ampliar",
    galleryImages: [
      {
        src: `/demo/${slug}/galeria-1.jpg`,
        alt: "Foto da hospedagem",
      },
      {
        src: `/demo/${slug}/galeria-2.jpg`,
        alt: "Foto da acomodação",
      },
      {
        src: `/demo/${slug}/galeria-3.jpg`,
        alt: "Foto da estrutura",
      },
    ],
    infoItems: [
      {
        label: "Atendimento",
        value: "Solicitação de reserva pelo site e WhatsApp.",
      },
      {
        label: "Reservas",
        value: "Confirmação manual pelo responsável.",
      },
      {
        label: "Sistema",
        value: "Página pública e painel administrativo.",
      },
      {
        label: "PWPE",
        value: "Reservas diretas para pequenos negócios.",
      },
    ],
    locationTitle: "Localização",
    locationText:
      "As informações de localização podem ser configuradas conforme o negócio.",
    googleMapsUrl: "#",
    googleMapsEmbedUrl: "",
    theme: {
      background: "#F8FAFC",
      surface: "#FFFFFF",
      dark: "#0F172A",
      primary: "#0978F5",
      primaryDark: "#0A1A36",
      accent: "#E47D1F",
      text: "#0F172A",
      muted: "#475569",
    },
  };
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
  const config = landingConfigs[business.slug] ?? getFallbackConfig(business.slug);

  const heroImage = `${config.assetBase}/hero.jpg`;
  const whatsappUrl = buildWhatsAppUrl(business.whatsapp, config.title);

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: config.theme.background,
        color: config.theme.text,
      }}
    >
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundColor: config.theme.primaryDark,
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={config.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${config.theme.primaryDark}f2, ${config.theme.primaryDark}cc, #00000088)`,
            }}
          />
        </div>

        <div className="relative mx-auto grid min-h-[720px] w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div className="min-w-0">
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              ← PWPE Reservas
            </Link>

            <p
              className="mt-8 text-sm font-black uppercase tracking-[0.35em]"
              style={{ color: config.theme.accent }}
            >
              {config.subtitle}
            </p>

            <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight sm:text-7xl">
              {config.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              {config.description}
            </p>

            <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <a
                href="#reservar"
                className="rounded-2xl px-6 py-3 text-center font-black shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: config.theme.accent,
                  color: config.theme.primaryDark,
                }}
              >
                Solicitar reserva
              </a>

              {business.whatsapp ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Falar no WhatsApp
                </a>
              ) : null}

              {config.instagramUrl ? (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 sm:col-span-2"
                >
                  Ver Instagram
                </a>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {config.badges.map((item) => (
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
            <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-black">
              <Image
                src={heroImage}
                alt={config.heroAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="text-sm font-black uppercase tracking-[0.3em]"
            style={{ color: config.theme.primary }}
          >
            {config.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Uma página direta para receber pedidos de reserva.
          </h2>

          <p
            className="mt-5 text-lg leading-8"
            style={{ color: config.theme.muted }}
          >
            {business.description || config.description}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-sm font-black uppercase tracking-[0.3em]"
              style={{ color: config.theme.primary }}
            >
              Galeria
            </p>

            <h2 className="mt-3 text-3xl font-black">{config.galleryTitle}</h2>
          </div>

          <p
            className="text-sm font-semibold"
            style={{ color: config.theme.muted }}
          >
            {config.gallerySubtitle}
          </p>
        </div>

        <HotelGallery images={config.galleryImages} />
      </section>

      <section
        className="py-14"
        style={{
          backgroundColor: config.theme.background,
          color: config.theme.text,
        }}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-black uppercase tracking-[0.3em]"
            style={{ color: config.theme.primary }}
          >
            Acomodações
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Quartos disponíveis para solicitação de reserva.
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {resources.map((resource) => (
              <article
                key={resource.id}
                className="rounded-[2rem] border p-6 shadow-xl"
                style={{
                  borderColor: "#E8D8BD",
                  backgroundColor: config.theme.surface,
                  boxShadow: "0 18px 50px rgba(107, 58, 0, 0.07)",
                }}
              >
                <h3 className="text-2xl font-black">{resource.name}</h3>

                <p
                  className="mt-3 text-sm leading-6"
                  style={{ color: config.theme.muted }}
                >
                  {resource.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {resource.capacity ? (
                    <span
                      className="rounded-full px-4 py-2 text-sm font-bold"
                      style={{
                        backgroundColor: `${config.theme.primary}18`,
                        color: config.theme.primary,
                      }}
                    >
                      Até {resource.capacity} pessoas
                    </span>
                  ) : null}

                  <span
                    className="rounded-full px-4 py-2 text-sm font-black"
                    style={{
                      backgroundColor: config.theme.accent,
                      color: config.theme.primaryDark,
                    }}
                  >
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
          <p
            className="text-sm font-black uppercase tracking-[0.3em]"
            style={{ color: config.theme.primary }}
          >
            Reserva
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Solicite sua reserva pelo formulário.
          </h2>

          <p
            className="mt-5 text-lg leading-8"
            style={{ color: config.theme.muted }}
          >
            Preencha seus dados, escolha as datas, selecione uma acomodação e
            envie a solicitação direto pelo WhatsApp.
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-3xl min-w-0 overflow-hidden rounded-[2rem] border border-[#E8D8BD] bg-white p-2 shadow-2xl shadow-[#6B3A00]/10 sm:p-4">
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
            <p
              className="text-lg font-black"
              style={{ color: config.theme.primary }}
            >
              1
            </p>
            <p className="mt-2 text-sm font-bold">
              Escolha o quarto e as datas
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8D8BD] bg-white p-5 text-center shadow-lg shadow-[#6B3A00]/5">
            <p
              className="text-lg font-black"
              style={{ color: config.theme.primary }}
            >
              2
            </p>
            <p className="mt-2 text-sm font-bold">Envie a solicitação</p>
          </div>

          <div className="rounded-2xl border border-[#E8D8BD] bg-white p-5 text-center shadow-lg shadow-[#6B3A00]/5">
            <p
              className="text-lg font-black"
              style={{ color: config.theme.primary }}
            >
              3
            </p>
            <p className="mt-2 text-sm font-bold">Aguarde confirmação</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#E8D8BD] bg-white p-6 shadow-xl shadow-[#6B3A00]/5">
          <h3 className="text-2xl font-black">Informações</h3>

          <div
            className="mt-5 grid gap-5 md:grid-cols-4"
            style={{ color: config.theme.muted }}
          >
            {config.infoItems.map((item) => (
              <div key={item.label}>
                <p
                  className="text-sm font-bold"
                  style={{ color: config.theme.primary }}
                >
                  {item.label}
                </p>

                {item.label === "Instagram" && config.instagramUrl ? (
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline underline-offset-4 transition hover:opacity-80"
                    style={{ color: config.theme.primary }}
                  >
                    {config.instagramHandle || item.value}
                  </a>
                ) : (
                  <p>{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-[#E8D8BD] bg-white p-6 shadow-xl shadow-[#6B3A00]/5">
            <p
              className="text-sm font-black uppercase tracking-[0.3em]"
              style={{ color: config.theme.primary }}
            >
              Localização
            </p>

            <h2 className="mt-4 text-3xl font-black">
              {config.locationTitle}
            </h2>

            <p
              className="mt-4 leading-7"
              style={{ color: config.theme.muted }}
            >
              {config.locationText}
            </p>

            {config.googleMapsUrl !== "#" ? (
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-2xl px-5 py-3 text-center font-black text-white transition hover:-translate-y-0.5"
                style={{ backgroundColor: config.theme.primary }}
              >
                Abrir no Google Maps
              </a>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#E8D8BD] bg-white shadow-xl shadow-[#6B3A00]/10">
            {config.googleMapsEmbedUrl ? (
              <iframe
                title={`Localização do ${config.title}`}
                src={config.googleMapsEmbedUrl}
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div
                className="flex h-[360px] items-center justify-center p-6 text-center"
                style={{ color: config.theme.muted }}
              >
                Mapa indisponível no momento.
              </div>
            )}
          </div>
        </div>
      </section>

      <footer
        className="border-t px-4 py-8 text-white sm:px-6 lg:px-8"
        style={{
          backgroundColor: config.theme.dark,
          borderColor: "#E8D8BD",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-sm font-black uppercase tracking-[0.3em]"
              style={{ color: config.theme.accent }}
            >
              PWPE Reservas
            </p>

            <p className="mt-2 text-sm text-white/70">
              Página de reservas desenvolvida para {config.title}.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-white/70 sm:text-right">
            <p>
              Desenvolvido por{" "}
              <span className="font-bold text-white">
                PWPE Desenvolvimentos
              </span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}