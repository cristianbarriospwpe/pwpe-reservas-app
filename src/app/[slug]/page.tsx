import Image from "next/image";
import { notFound } from "next/navigation";
import { AccommodationCards } from "@/components/public/AccommodationCards";
import { HotelGallery } from "@/components/public/HotelGallery";
import { PublicBookingForm } from "@/components/public/PublicBookingForm";
import { getBusinessBySlug } from "@/services/businesses";
import { getActiveResourcesByBusinessId } from "@/services/resources";

export const dynamic = "force-dynamic";

type PublicBusinessPageProps = {
  params: Promise<{ slug: string }>;
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
  aboutTitle?: string;
  aboutDescription?: string;
  title: string;
  logoSrc?: string;
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
    eyebrow: "Hospedagem com contato direto",
    description:
      "Uma página simples, bonita e prática para receber solicitações de reserva direto pelo WhatsApp.",
    assetBase: "/demo/ta-em-casa-park-hotel",
    heroAlt: "Tá em Casa Park Hotel",
    badges: [
      "Reservas pelo WhatsApp",
      "Localização no mapa",
      "Fotos do hotel",
      "Página personalizada",
    ],
    galleryTitle: "Conheça o Tá em Casa Park Hotel.",
    gallerySubtitle:
      "Veja fotos da estrutura, ambientes e acomodações disponíveis.",
    galleryImages: [
      {
        src: "/demo/ta-em-casa-park-hotel/galeria-1.jpg",
        alt: "Área do Tá em Casa Park Hotel",
      },
      {
        src: "/demo/ta-em-casa-park-hotel/galeria-2.jpg",
        alt: "Ambiente do Tá em Casa Park Hotel",
      },
      {
        src: "/demo/ta-em-casa-park-hotel/galeria-3.jpg",
        alt: "Estrutura do Tá em Casa Park Hotel",
      },
    ],
    infoItems: [
      {
        label: "Local",
        value: "Lagoa do Mato, Itatira - Ceará",
      },
      {
        label: "WhatsApp",
        value: "+55 88 98101-1427",
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
    locationTitle: "Estamos em Lagoa do Mato - CE.",
    locationText:
      "O Tá em Casa Park Hotel recebe solicitações de reserva pelo site e confirma os detalhes diretamente pelo WhatsApp.",
    googleMapsUrl: "https://maps.app.goo.gl/VWyXANfr8R98qZqU9",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=-4.65563,-39.673691&z=15&output=embed",
    instagramUrl: "https://www.instagram.com/taemcasaparkhotel/",
    instagramHandle: "@taemcasaparkhotel",
    whatsappDisplay: "+55 88 98101-1427",
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
    heroAlt: "Hotel Nacional Palace em Foz do Iguaçu",
    badges: [
      "Mais de 50 quartos",
      "Piscina ao ar livre",
      "Foz do Iguaçu",
      "Reservas pelo WhatsApp",
    ],
    galleryTitle: "Conheça a estrutura do hotel.",
    gallerySubtitle:
      "Veja fotos da fachada, quartos, piscina e ambientes do Hotel Nacional Palace.",
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
    googleMapsUrl:
      "https://maps.google.com/?q=Hotel%20Nacional%20Palace%20Foz%20do%20Igua%C3%A7u",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=-25.516325,-54.5903743&z=15&output=embed",
    whatsappDisplay: "+55 45 99922-2221",
    theme: {
      background: "#FFF8EF",
      surface: "#FFFFFF",
      dark: "#201A17",
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
    googleMapsUrl: "https://maps.app.goo.gl/dWngcydPfwpAXPZVA",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=-19.4557188,-42.5437781&z=17&output=embed",
    instagramUrl: "https://www.instagram.com/apartamentosmobiliadosipatinga/",
    instagramHandle: "@apartamentosmobiliadosipatinga",
    whatsappDisplay: "+55 31 98834-8868",
    theme: {
      background: "#F6F8FC",
      surface: "#FFFFFF",
      dark: "#0B1220",
      primary: "#1D4ED8",
      primaryDark: "#0F2A5F",
      accent: "#38BDF8",
      text: "#0F172A",
      muted: "#475569",
    },
  },

  "residencial-icarus": {
    title: "Residencial Icarus",
    subtitle: "Montes Claros · Minas Gerais",
    eyebrow: "Apartamento inteiro para temporada",
    description:
      "Apartamento mobiliado em Montes Claros, ideal para famílias, viagens a trabalho ou uma estadia prática durante a viagem.",
    assetBase: "/demo/residencial-icarus",
    heroAlt: "Apartamento mobiliado Residencial Icarus em Montes Claros",
    logoSrc: "/demo/residencial-icarus/logo.png",
    aboutTitle: "Conforto, privacidade e praticidade em Montes Claros.",
    aboutDescription:
      "O Residencial Icarus oferece um apartamento inteiro, mobiliado e preparado para quem busca uma estadia tranquila, seja para viagem em família, trabalho ou descanso.",
    badges: [
      "Apartamento inteiro",
      "Até 4 pessoas",
      "Wi-Fi e cozinha",
      "Reservas pelo WhatsApp",
    ],
    galleryTitle: "Conheça o apartamento.",
    gallerySubtitle:
      "Veja fotos da sala, cozinha, quarto e ambientes do Residencial Icarus.",
    galleryImages: [
      {
        src: "/demo/residencial-icarus/galeria-1.jpg",
        alt: "Quarto do Residencial Icarus",
      },
      {
        src: "/demo/residencial-icarus/galeria-2.jpg",
        alt: "Sala integrada com cozinha",
      },
      {
        src: "/demo/residencial-icarus/galeria-3.jpg",
        alt: "Cozinha equipada",
      },
      {
        src: "/demo/residencial-icarus/galeria-4.jpg",
        alt: "Quarto com ar-condicionado",
      },
      {
        src: "/demo/residencial-icarus/galeria-6.jpg",
        alt: "Sala com TV",
      },
      {
        src: "/demo/residencial-icarus/galeria-7.jpg",
        alt: "Sala do Residencial Icarus vista de outro ângulo",
      },
    ],
    infoItems: [
      {
        label: "Local",
        value: "Montes Claros - Minas Gerais",
      },
      {
        label: "Tipo",
        value: "Espaço inteiro: apartamento mobiliado.",
      },
      {
        label: "Capacidade",
        value: "Até 4 hóspedes, com quarto, banheiro, cozinha e sala.",
      },
      {
        label: "Reservas",
        value: "Solicitação direta pelo site e confirmação pelo WhatsApp.",
      },
    ],
    locationTitle: "Apartamento mobiliado em Montes Claros - MG.",
    locationText:
      "O Residencial Icarus oferece uma hospedagem prática para quem busca conforto, privacidade e contato direto para reservar.",
    googleMapsUrl: "https://maps.app.goo.gl/BVyPEDwGGEfXW6sh9",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Residencial%20Icarus%20Montes%20Claros%20MG&z=16&output=embed",
    whatsappDisplay: "+55 38 91969-408",
    theme: {
      background: "#F8FAFC",
      surface: "#FFFFFF",
      dark: "#111827",
      primary: "#B8872B",
      primaryDark: "#1F2937",
      accent: "#D4AF37",
      text: "#111827",
      muted: "#475569",
    },
  },
};

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function buildWhatsAppUrl(phone: string, businessName: string) {
  const normalizedPhone = normalizePhone(phone);
  const message = `Olá, gostaria de saber mais sobre reservas em ${businessName}.`;

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

function getFallbackConfig(slug: string): LandingConfig {
  const readableName = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    title: readableName,
    subtitle: "Reservas diretas pelo WhatsApp",
    eyebrow: "Página de reservas",
    description:
      "Uma página simples para apresentar o negócio, mostrar opções disponíveis e receber solicitações de reserva pelo WhatsApp.",
    assetBase: "/demo/default",
    heroAlt: readableName,
    badges: ["Reservas diretas", "WhatsApp", "Página personalizada"],
    galleryTitle: "Conheça nosso espaço.",
    gallerySubtitle: "Veja fotos e informações do negócio.",
    galleryImages: [],
    infoItems: [
      {
        label: "Reservas",
        value: "Solicitação direta pelo site e confirmação pelo WhatsApp.",
      },
    ],
    locationTitle: "Localização",
    locationText:
      "Confira a localização e entre em contato para consultar disponibilidade.",
    googleMapsUrl: "https://www.google.com/maps",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Brasil&output=embed",
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
      className="min-h-screen overflow-hidden"
      style={{
        background: config.theme.background,
        color: config.theme.text,
      }}
    >
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${config.theme.primaryDark}, ${config.theme.primary})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative mx-auto grid min-h-[620px] w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <p
              className="text-sm font-black uppercase tracking-[0.45em]"
              style={{ color: config.theme.accent }}
            >
              {config.subtitle}
            </p>

            {config.logoSrc ? (
              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-3xl bg-black/25 p-3 shadow-xl ring-1 ring-white/20 sm:h-36 sm:w-36">
                  <Image
                    src={config.logoSrc}
                    alt={`Logo ${config.title}`}
                    fill
                    quality={90}
                    className="object-contain p-2"
                    sizes="144px"
                  />
                </div>

                <h1 className="max-w-4xl text-5xl font-black leading-tight text-white sm:text-7xl">
                  {config.title}
                </h1>
              </div>
            ) : (
              <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight text-white sm:text-7xl">
                {config.title}
              </h1>
            )}

            <p className="mt-8 max-w-2xl text-lg font-semibold leading-9 text-white/90">
              {config.description}
            </p>

            <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
              <a
                href="#reserva"
                className="flex min-h-16 w-full items-center justify-center rounded-2xl px-6 py-4 text-center text-base font-black text-white shadow-xl transition hover:scale-[1.02]"
                style={{ background: config.theme.accent }}
              >
                Solicitar reserva
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-16 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center text-base font-black text-white transition hover:bg-white/20"
              >
                Falar no WhatsApp
              </a>

              {config.instagramUrl ? (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-16 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center text-base font-black text-white transition hover:bg-white/20"
                >
                  Ver Instagram
                </a>
              ) : null}
            </div>

            <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
              {config.badges.map((badge) => (
                <span
                  key={badge}
                  className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-center text-sm font-black text-white sm:w-auto"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl shadow-black/30">
            <Image
              src={heroImage}
              alt={config.heroAlt}
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p
              className="text-sm font-black uppercase tracking-[0.35em]"
              style={{ color: config.theme.primary }}
            >
              {config.eyebrow}
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              {config.aboutTitle ?? "Hospedagem prática para sua estadia."}
            </h2>

            <p
              className="mt-5 max-w-2xl text-base leading-8"
              style={{ color: config.theme.muted }}
            >
              {config.aboutDescription ??
                "Encontre uma opção de hospedagem prática, com solicitação de reserva direta pelo WhatsApp."}
            </p>
          </div>

          <div
            className="rounded-[2rem] border p-6 shadow-xl"
            style={{
              background: config.theme.surface,
              borderColor: `${config.theme.primary}20`,
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {config.infoItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border p-5"
                  style={{
                    borderColor: `${config.theme.primary}20`,
                    background: `${config.theme.primary}08`,
                  }}
                >
                  <p
                    className="text-xs font-black uppercase tracking-[0.25em]"
                    style={{ color: config.theme.primary }}
                  >
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm font-bold leading-7">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {config.galleryImages.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p
              className="text-sm font-black uppercase tracking-[0.35em]"
              style={{ color: config.theme.primary }}
            >
              Galeria
            </p>

            <h2 className="mt-4 text-4xl font-black">{config.galleryTitle}</h2>

            <p
              className="mt-4 max-w-3xl text-base leading-8"
              style={{ color: config.theme.muted }}
            >
              {config.gallerySubtitle}
            </p>
          </div>

          <HotelGallery images={config.galleryImages} />
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p
            className="text-sm font-black uppercase tracking-[0.35em]"
            style={{ color: config.theme.primary }}
          >
            Acomodações
          </p>

          <h2 className="mt-4 text-4xl font-black">Escolha uma opção.</h2>

          <p
            className="mt-4 max-w-3xl text-base leading-8"
            style={{ color: config.theme.muted }}
          >
            Veja as opções disponíveis, capacidade e valores de referência.
          </p>
        </div>

        <AccommodationCards
          businessSlug={business.slug}
          resources={resources}
          theme={{
            surface: config.theme.surface,
            primary: config.theme.primary,
            primaryDark: config.theme.primaryDark,
            accent: config.theme.accent,
            muted: config.theme.muted,
          }}
        />
      </section>

      <section
        id="reserva"
        className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div
          className={
            business.slug === "residencial-icarus"
              ? "[&_section]:border-[#B8872B]/40 [&_section]:bg-[#151515] [&_input]:border-[#B8872B]/40 [&_input]:bg-[#0F0F0F] [&_textarea]:border-[#B8872B]/40 [&_textarea]:bg-[#0F0F0F] [&_.text-sky-300]:!text-[#D4AF37] [&_.text-sky-400]:!text-[#D4AF37] [&_.bg-sky-400]:!bg-[#B8872B] [&_.border-sky-400]:!border-[#B8872B]"
              : ""
          }
        >
          <PublicBookingForm
            businessId={business.id}
            businessName={business.name}
            businessWhatsapp={business.whatsapp}
            bookingMode={business.bookingMode}
            resources={resources}
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div
            className="rounded-[2rem] border p-8 shadow-xl"
            style={{
              background: config.theme.surface,
              borderColor: `${config.theme.primary}20`,
            }}
          >
            <p
              className="text-sm font-black uppercase tracking-[0.35em]"
              style={{ color: config.theme.primary }}
            >
              Localização
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight">
              {config.locationTitle}
            </h2>

            <p
              className="mt-5 text-base leading-8"
              style={{ color: config.theme.muted }}
            >
              {config.locationText}
            </p>

            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-2xl px-6 py-4 text-base font-black text-white transition hover:scale-[1.02]"
              style={{ background: config.theme.primary }}
            >
              Abrir no Google Maps
            </a>
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-[2rem] border bg-slate-200 shadow-xl">
            <iframe
              src={config.googleMapsEmbedUrl}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer
        className="px-4 py-10 sm:px-6 lg:px-8"
        style={{ background: config.theme.dark }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-sm font-black uppercase tracking-[0.35em]"
              style={{ color: config.theme.accent }}
            >
              PWPE Reservas
            </p>

            <p className="mt-3 text-sm text-white/70">
              Página de reservas desenvolvida para {config.title}.
            </p>
          </div>

          <p className="text-sm text-white/70">
            Desenvolvido por{" "}
            <span className="font-black text-white">PWPE Desenvolvimentos</span>
          </p>
        </div>
      </footer>
    </main>
  );
}