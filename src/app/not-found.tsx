import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-bold text-gooseNavy">Pagina niet gevonden</h1>
      <p className="mt-2 text-slate-700">Deze route bestaat niet of is verplaatst.</p>
      <Link href="/start" className="btn-primary mt-4 text-xs">
        Ga naar Begin hier
      </Link>
    </div>
  );
}
