import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
  style?: "primary" | "secondary";
};

type VisualHeroProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  chip?: string;
  actions?: HeroAction[];
};

export function VisualHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  chip,
  actions = []
}: VisualHeroProps) {
  return (
    <section className="community-card overflow-hidden p-0">
      <img src={imageSrc} alt={imageAlt} className="h-44 w-full object-cover sm:h-56" />
      <div className="p-6">
        {chip ? <p className="section-chip mb-3">{chip}</p> : null}
        <h1 className="text-3xl font-bold text-gooseNavy sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-slate-700">{subtitle}</p>
        {actions.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={action.style === "secondary" ? "btn-secondary text-xs" : "btn-primary text-xs"}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
