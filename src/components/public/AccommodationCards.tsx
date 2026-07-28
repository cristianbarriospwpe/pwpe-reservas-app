"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Resource } from "@/types/resource";

type AccommodationCardsProps = {
  businessSlug: string;
  resources: Resource[];
  theme: {
    surface: string;
    primary: string;
    primaryDark: string;
    accent: string;
    muted: string;
  };
};

const apartamentosDetailsLinks: Record<string, string> = {
  "Apartamento 101 para até 6 pessoas":
    "/apartamentos-mobiliados-ipatinga/apartamento-101",
  "Casa para 4 pessoas com garagem":
    "/apartamentos-mobiliados-ipatinga/casa-4-pessoas-com-garagem",
  "Apartamento para 5 pessoas sem garagem":
    "/apartamentos-mobiliados-ipatinga/apartamento-5-pessoas-sem-garagem",
  "Apartamento para 8 pessoas com garagem":
    "/apartamentos-mobiliados-ipatinga/apartamento-8-pessoas-com-garagem",
  "Apartamento para 9 pessoas com garagem":
    "/apartamentos-mobiliados-ipatinga/apartamento-9-pessoas-com-garagem",
  "Casa de 2 dormitórios para até 8 pessoas":
    "/apartamentos-mobiliados-ipatinga/casa-2-dormitorios-8-pessoas",
};

const cardImagesByBusiness: Record<string, Record<string, string>> = {
  "apartamentos-mobiliados-ipatinga": {
    "Apartamento 101 para até 6 pessoas":
      "/demo/apartamentos-mobiliados-ipatinga/apartamento-101/hero.jpg",
    "Casa para 4 pessoas com garagem":
      "/demo/apartamentos-mobiliados-ipatinga/casa-4-pessoas-com-garagem/hero.jpg",
    "Apartamento para 5 pessoas sem garagem":
      "/demo/apartamentos-mobiliados-ipatinga/apartamento-5-pessoas-sem-garagem/hero.jpg",
    "Apartamento para 8 pessoas com garagem":
      "/demo/apartamentos-mobiliados-ipatinga/apartamento-8-pessoas-com-garagem/hero.jpg",
    "Apartamento para 9 pessoas com garagem":
      "/demo/apartamentos-mobiliados-ipatinga/apartamento-9-pessoas-com-garagem/hero.jpg",
    "Casa de 2 dormitórios para até 8 pessoas":
      "/demo/apartamentos-mobiliados-ipatinga/casa-2-dormitorios-8-pessoas/hero.jpg",
  },

  "hotel-nacional-palace": {
    "Quarto standard": "/demo/hotel-nacional-palace/galeria-2.jpg",
    "Quarto duplo": "/demo/hotel-nacional-palace/galeria-3.jpg",
    "Quarto triplo": "/demo/hotel-nacional-palace/galeria-2.jpg",
    "Quarto família": "/demo/hotel-nacional-palace/galeria-3.jpg",
  },
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getPriceUnitLabel(priceUnit: Resource["priceUnit"]) {
  if (priceUnit === "night") {
    return "noite";
  }

  if (priceUnit === "day") {
    return "dia";
  }

  if (priceUnit === "person") {
    return "pessoa";
  }

  return "serviço";
}

function getDetailsHref(businessSlug: string, resourceName: string) {
  if (businessSlug !== "apartamentos-mobiliados-ipatinga") {
    return null;
  }

  return apartamentosDetailsLinks[resourceName] ?? null;
}

function getCardImage(businessSlug: string, resourceName: string) {
  return cardImagesByBusiness[businessSlug]?.[resourceName] ?? null;
}

export function AccommodationCards({
  businessSlug,
  resources,
  theme,
}: AccommodationCardsProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => {
          const detailsHref = getDetailsHref(businessSlug, resource.name);
          const cardImage = getCardImage(businessSlug, resource.name);

          return (
            <div
              key={resource.id}
              className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-xl"
            >
              {cardImage ? (
                <Image
                  src={cardImage}
                  alt={resource.name}
                  fill
                  quality={85}
                  className="object-cover opacity-65"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : null}

              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/55 to-slate-950/20" />

              <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {resource.name}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/85">
                      {resource.description}
                    </p>

                    <p
                      className="mt-4 text-xs font-black uppercase tracking-[0.25em]"
                      style={{ color: theme.accent }}
                    >
                      Até {resource.capacity ?? "-"} pessoas
                    </p>
                  </div>

                  <div
                    className="w-fit rounded-full px-5 py-3 text-sm font-black text-white shadow-xl"
                    style={{ background: theme.primary }}
                  >
                    {formatPrice(resource.price)}
                  </div>
                </div>

                <div className="mt-6">
                  {detailsHref ? (
                    <Link
                      href={detailsHref}
                      className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
                    >
                      Ver detalhes
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedResource(resource)}
                      className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
                    >
                      Ver detalhes
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedResource ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedResource(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-200"
            >
              Fechar
            </button>

            <p
              className="text-sm font-black uppercase tracking-[0.3em]"
              style={{ color: theme.primary }}
            >
              Detalhes da acomodação
            </p>

            <h3 className="mt-4 pr-20 text-3xl font-black">
              {selectedResource.name}
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600">
              {selectedResource.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Capacidade
                </p>
                <p className="mt-2 font-black">
                  Até {selectedResource.capacity ?? "-"} pessoas
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Valor
                </p>
                <p className="mt-2 font-black">
                  {formatPrice(selectedResource.price)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Unidade
                </p>
                <p className="mt-2 font-black">
                  Por {getPriceUnitLabel(selectedResource.priceUnit)}
                </p>
              </div>
            </div>

            <a
              href="#reserva"
              onClick={() => setSelectedResource(null)}
              className="mt-6 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-center text-base font-black text-white transition hover:scale-[1.01]"
              style={{ background: theme.primaryDark }}
            >
              Solicitar esta acomodação
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}