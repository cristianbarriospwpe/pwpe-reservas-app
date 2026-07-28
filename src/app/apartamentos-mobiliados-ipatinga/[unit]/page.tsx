import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type UnitPageProps = {
  params: Promise<{
    unit: string;
  }>;
};

type UnitConfig = {
  title: string;
  subtitle: string;
  description: string;
  capacity: string;
  bedrooms: string;
  price: string;
  hasGarage: boolean;
  location: string;
  whatsapp: string;
  assetBase: string;
  images: {
    src: string;
    alt: string;
  }[];
};

const units: Record<string, UnitConfig> = {
  "apartamento-101": {
    title: "Apartamento 101 para até 6 pessoas",
    subtitle: "Iguaçu · Ipatinga",
    description:
      "Apartamento mobiliado para temporada em Ipatinga, ideal para famílias, grupos ou estadias temporárias. Conta com ambientes práticos, quarto confortável e estrutura para uma hospedagem tranquila.",
    capacity: "Até 6 pessoas",
    bedrooms: "2 habitaciones",
    price: "BRL 150 / noite",
    hasGarage: false,
    location: "Iguaçu, Ipatinga",
    whatsapp: "5531988348868",
    assetBase: "/demo/apartamentos-mobiliados-ipatinga/apartamento-101",
    images: [
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-101/galeria-1.jpg",
        alt: "Quarto do Apartamento 101",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-101/galeria-2.jpg",
        alt: "Sala do Apartamento 101",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-101/galeria-3.jpg",
        alt: "Cozinha do Apartamento 101",
      },
    ],
  },

  "casa-4-pessoas-com-garagem": {
    title: "Casa para 4 pessoas com garagem",
    subtitle: "Vila Celeste · Ipatinga",
    description:
      "Casa mobiliada para temporada em Ipatinga, com garagem e estrutura prática para hospedagem de casais, famílias pequenas ou viajantes a trabalho.",
    capacity: "Até 4 pessoas",
    bedrooms: "2 habitaciones",
    price: "BRL 120 / noite",
    hasGarage: true,
    location: "Vila Celeste, Ipatinga",
    whatsapp: "5531988348868",
    assetBase: "/demo/apartamentos-mobiliados-ipatinga/casa-4-pessoas-com-garagem",
    images: [
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/casa-4-pessoas-com-garagem/galeria-1.jpg",
        alt: "Entrada da casa com garagem",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/casa-4-pessoas-com-garagem/galeria-2.jpg",
        alt: "Sala da casa mobiliada",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/casa-4-pessoas-com-garagem/galeria-3.jpg",
        alt: "Quarto da casa mobiliada",
      },
    ],
  },

  "apartamento-5-pessoas-sem-garagem": {
    title: "Apartamento para 5 pessoas sem garagem",
    subtitle: "Canaã · Ipatinga",
    description:
      "Apartamento mobiliado para até 5 pessoas, indicado para estadias curtas, trabalho ou temporada em Ipatinga.",
    capacity: "Até 5 pessoas",
    bedrooms: "1 habitación",
    price: "BRL 130 / noite",
    hasGarage: false,
    location: "Canaã, Ipatinga",
    whatsapp: "5531988348868",
    assetBase:
      "/demo/apartamentos-mobiliados-ipatinga/apartamento-5-pessoas-sem-garagem",
    images: [
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-5-pessoas-sem-garagem/galeria-1.jpg",
        alt: "Sala do apartamento para 5 pessoas",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-5-pessoas-sem-garagem/galeria-2.jpg",
        alt: "Ambiente mobiliado do apartamento",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-5-pessoas-sem-garagem/galeria-3.jpg",
        alt: "Cozinha do apartamento",
      },
    ],
  },

  "apartamento-8-pessoas-com-garagem": {
    title: "Apartamento para 8 pessoas com garagem",
    subtitle: "Canaã · Ipatinga",
    description:
      "Apartamento mobiliado com garagem, ideal para grupos maiores, famílias ou hospedagem temporária em Ipatinga.",
    capacity: "Até 8 pessoas",
    bedrooms: "2 habitaciones",
    price: "BRL 140 / noite",
    hasGarage: true,
    location: "Canaã, Ipatinga",
    whatsapp: "5531988348868",
    assetBase:
      "/demo/apartamentos-mobiliados-ipatinga/apartamento-8-pessoas-com-garagem",
    images: [
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-8-pessoas-com-garagem/galeria-1.jpg",
        alt: "Sala do apartamento para 8 pessoas",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-8-pessoas-com-garagem/galeria-2.jpg",
        alt: "Quarto do apartamento para 8 pessoas",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-8-pessoas-com-garagem/galeria-3.jpg",
        alt: "Cozinha do apartamento para 8 pessoas",
      },
    ],
  },

  "apartamento-9-pessoas-com-garagem": {
    title: "Apartamento para 9 pessoas com garagem",
    subtitle: "Canaã · Ipatinga",
    description:
      "Apartamento amplo para até 9 pessoas, com garagem e estrutura completa para temporada, famílias e grupos.",
    capacity: "Até 9 pessoas",
    bedrooms: "2 habitaciones",
    price: "BRL 180 / noite",
    hasGarage: true,
    location: "Canaã, Ipatinga",
    whatsapp: "5531988348868",
    assetBase:
      "/demo/apartamentos-mobiliados-ipatinga/apartamento-9-pessoas-com-garagem",
    images: [
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-9-pessoas-com-garagem/galeria-1.jpg",
        alt: "Cozinha do apartamento para 9 pessoas",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-9-pessoas-com-garagem/galeria-2.jpg",
        alt: "Sala do apartamento para 9 pessoas",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/apartamento-9-pessoas-com-garagem/galeria-3.jpg",
        alt: "Quarto do apartamento para 9 pessoas",
      },
    ],
  },

  "casa-2-dormitorios-8-pessoas": {
    title: "Casa de 2 dormitórios para até 8 pessoas",
    subtitle: "Canaã · Ipatinga",
    description:
      "Casa mobiliada com 2 dormitórios, opção confortável para famílias e grupos que buscam hospedagem temporária em Ipatinga.",
    capacity: "Até 8 pessoas",
    bedrooms: "2 dormitórios",
    price: "BRL 250 / noite",
    hasGarage: true,
    location: "Canaã, Ipatinga",
    whatsapp: "5531988348868",
    assetBase:
      "/demo/apartamentos-mobiliados-ipatinga/casa-2-dormitorios-8-pessoas",
    images: [
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/casa-2-dormitorios-8-pessoas/galeria-1.jpg",
        alt: "Sala da casa de 2 dormitórios",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/casa-2-dormitorios-8-pessoas/galeria-2.jpg",
        alt: "Quarto da casa de 2 dormitórios",
      },
      {
        src: "/demo/apartamentos-mobiliados-ipatinga/casa-2-dormitorios-8-pessoas/galeria-3.jpg",
        alt: "Cozinha da casa de 2 dormitórios",
      },
    ],
  },
};

function buildWhatsAppUrl(unit: UnitConfig) {
  const message = [
    "Olá, gostaria de consultar disponibilidade.",
    "",
    `Unidade: ${unit.title}`,
    `Local: ${unit.location}`,
    `Valor: ${unit.price}`,
  ].join("\n");

  return `https://wa.me/${unit.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { unit } = await params;
  const config = units[unit];

  if (!config) {
    notFound();
  }

  const heroImage = `${config.assetBase}/hero.jpg`;
  const whatsappUrl = buildWhatsAppUrl(config);

  return (
    <main className="min-h-screen bg-[#F6F8FC] text-slate-950">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/apartamentos-mobiliados-ipatinga"
              className="text-sm font-bold text-sky-300 transition hover:text-white"
            >
              ← Voltar para a página principal
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-fit rounded-full bg-sky-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-300"
            >
              Consultar no WhatsApp
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-sky-300">
                Apartamentos Mobiliados Ipatinga
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                {config.title}
              </h1>

              <p className="mt-4 text-lg font-bold text-slate-300">
                {config.subtitle}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                {config.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold">
                  {config.capacity}
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold">
                  {config.bedrooms}
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold">
                  {config.hasGarage ? "Com garagem" : "Sem garagem"}
                </span>

                <span className="rounded-full bg-sky-400 px-4 py-2 text-sm font-black text-slate-950">
                  {config.price}
                </span>
              </div>
            </div>

            <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
              <Image
                src={heroImage}
                alt={config.title}
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {config.images.map((image) => (
            <div
              key={image.src}
              className="relative h-80 overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl shadow-slate-300/40"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black">Solicite sua reserva</h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Envie uma mensagem direta pelo WhatsApp para consultar datas,
                disponibilidade e confirmar os detalhes da hospedagem.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-sky-500 px-6 py-4 text-center text-base font-black text-white transition hover:bg-sky-600"
            >
              Consultar disponibilidade
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}