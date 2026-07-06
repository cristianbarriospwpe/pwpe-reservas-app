import { supabase } from "@/lib/supabase";

export default function SupabaseTestPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Supabase
        </p>

        <h1 className="text-4xl font-bold">Teste de conexão</h1>

        <p className="mt-4 text-slate-300">
          Esta página verifica se as variáveis de ambiente foram carregadas.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Project URL</p>
          <p className="mt-2 break-all text-white">{supabaseUrl}</p>

          <p className="mt-6 text-sm text-slate-400">Cliente Supabase</p>
          <p className="mt-2 text-white">
            {supabase ? "Cliente criado com sucesso" : "Erro ao criar cliente"}
          </p>
        </div>
      </section>
    </main>
  );
}