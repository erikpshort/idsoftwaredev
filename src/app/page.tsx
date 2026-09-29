import type { Metadata } from 'next';
import ProjectForm from '@/components/ProjectForm';
import Ridge from '@/components/Ridge';
import { HOME_DESCRIPTION, HOME_TITLE, KEYWORDS, organizationJsonLd } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  keywords: [...KEYWORDS],
};

type WorkLink = { href: string; label: string };

type WorkRow = {
  name: string;
  tag: string;
  body: string;
  links?: WorkLink[];
};

// Replace each PENDING_* href when the listing is live.
const stores = {
  jobWorkflowPro: {
    appStore: 'https://apps.apple.com/us/app/job-workflow-pro/id6783457175',
    playStore: 'https://play.google.com/store/apps/details?id=com.jobworkflowpro.tech',
  },
  umpcrew: {
    appStore: 'https://apps.apple.com/us/app/umpcrew/id6768857574',
    playStore: 'https://play.google.com/store/apps/details?id=com.erikshort.umpday',
  },
  moldDetector: {
    appStore: 'https://apps.apple.com/app/idPENDING_MOLD_DETECTOR',
    playStore: 'https://play.google.com/store/apps/details?id=PENDING_MOLD_DETECTOR',
  },
  fiveMinBible: {
    appStore: 'https://apps.apple.com/app/idPENDING_5MIN_BIBLE',
    playStore: 'https://play.google.com/store/apps/details?id=PENDING_5MIN_BIBLE',
  },
} as const;

function storeLinks(app: keyof typeof stores): WorkLink[] {
  return [
    { href: stores[app].appStore, label: 'App Store' },
    { href: stores[app].playStore, label: 'Play Store' },
  ].filter((link) => !link.href.includes('PENDING_'));
}

const systems: WorkRow[] = [
  {
    name: 'Job Workflow Pro',
    tag: 'Restoration crews',
    links: [
      { href: 'https://www.jobworkflowpro.com', label: 'jobworkflowpro.com' },
      ...storeLinks('jobWorkflowPro'),
    ],
    body: 'Jobs, costing, and scheduling for restoration crews, and a mobile app for people in the field.',
  },
  {
    name: 'UmpCrew',
    tag: 'Umpire crews',
    links: [{ href: 'https://umpcrew.com', label: 'umpcrew.com' }, ...storeLinks('umpcrew')],
    body: 'Scheduling for umpire crews in baseball and softball.',
  },
  {
    name: 'Mold Detector AI',
    tag: 'From a photo',
    links: [
      { href: 'https://www.molddetectorai.com', label: 'molddetectorai.com' },
      ...storeLinks('moldDetector'),
    ],
    body: 'A photo is read for mold, and a qualified lead goes to a restoration company.',
  },
  {
    name: 'Camp HQ',
    tag: 'A week of camp',
    links: [{ href: 'https://hq.camp', label: 'hq.camp' }],
    body: 'Check-in, attendance, and the staff tools for a week of camp.',
  },
  {
    name: 'TenkeyBridge',
    tag: 'QuickBooks Desktop',
    links: [{ href: 'https://tenkeybridge.com', label: 'tenkeybridge.com' }],
    body: 'A Windows program, with a cloud gateway, so QuickBooks Desktop can answer in the shape of QuickBooks Online.',
  },
  {
    name: '5min.bible',
    tag: 'A daily habit',
    links: [{ href: 'https://5min.bible', label: '5min.bible' }, ...storeLinks('fiveMinBible')],
    body: 'A daily Bible habit.',
  },
  {
    name: 'Spiritual Growth Eval',
    tag: 'Ministry assessments',
    links: [{ href: 'https://www.spiritualgrowtheval.com', label: 'spiritualgrowtheval.com' }],
    body: 'Assessments a ministry uses with its people.',
  },
  {
    name: 'DugoutIQ',
    tag: 'Pitch tracking',
    body: 'Pitch tracking and game charting for softball and baseball coaches, on iPad.',
  },
  {
    name: 'GBC Tools',
    tag: 'Church staff',
    links: [{ href: 'https://www.gbctools.com', label: 'gbctools.com' }],
    body: 'AI vision on the cameras, counting, a report center, and scheduling for church staff. The link opens the sign-in.',
  },
];

const capabilities: { label: string; body: string; quiet?: boolean }[] = [
  {
    label: 'Custom software',
    body: 'Internal tools, customer portals, and the systems a crew, a lab, or an office runs every day. SMS when the operation needs it, set up to carrier rules. A project starts as a written scope, ends as a system in use, and includes the shop after launch.',
  },
  {
    label: 'Workflows',
    body: 'Jobs, costing, and scheduling, from the office out to the person on site. Who is assigned, what the job costs, and what happens next live in one system.',
  },
  {
    label: 'Apps',
    body: 'iPhone, Android, and iPad apps for people in the field. Public products go on the App Store and Play Store.',
  },
  {
    label: 'AI integration',
    body: 'A camera that counts, a photo read for a decision, a lead sent to the right company. The model is built into the product.',
  },
  {
    label: 'Websites',
    body: 'A marketing site for a business that needs to be found and taken seriously. Services sites, portfolios, and online stores. Designed and built, then handed over ready to use.',
    quiet: true,
  },
];

const websites: WorkRow[] = [
  {
    name: 'Ridgeline Integrated Systems',
    tag: 'Cameras, cabling, AV',
    links: [{ href: 'https://ridgelineintegrated.com', label: 'ridgelineintegrated.com' }],
    body: 'The website for a commercial cameras, cabling, and AV company in the Treasure Valley.',
  },
  {
    name: 'High Desert Dairy Lab',
    tag: 'The lab',
    links: [{ href: 'https://www.hddairylab.com', label: 'hddairylab.com' }],
    body: 'The website for the lab, and the system the lab runs. Customers and staff sign in.',
  },
  {
    name: 'Legacy Feed and Fuel',
    tag: 'Feed and fuel',
    links: [{ href: 'https://www.legacyfeed.com', label: 'legacyfeed.com' }],
    body: 'The website for the feed and fuel business.',
  },
];

function Ledger({ rows }: { rows: WorkRow[] }) {
  return (
    <div>
      <div className="ledger-head" aria-hidden="true">
        <span>Name</span>
        <span>What it is</span>
        <span>Open</span>
      </div>
      {rows.map((row) => (
        <article key={row.name} className="ledger-row">
          <div>
            <h3 className="font-display text-[1.4rem] leading-none tracking-wide">{row.name}</h3>
            <p className="font-mono mt-2 text-[0.72rem] tracking-[0.14em] text-[var(--faint)] uppercase">
              {row.tag}
            </p>
          </div>
          <p className="max-w-[56ch] text-[var(--muted)]">{row.body}</p>
          {row.links && row.links.length > 0 ? (
            <p className="font-mono flex flex-col gap-1 text-[0.78rem] leading-relaxed tracking-wide">
              {row.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[var(--ink)] underline decoration-[var(--teal)] underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </p>
          ) : (
            <span />
          )}
        </article>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <section className="relative overflow-hidden border-b border-[var(--line)]" aria-label="Introduction">
        <Ridge />
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 pt-[12vh] pb-[16vh]">
          <p className="font-mono flex flex-wrap items-center gap-x-3 text-[0.72rem] tracking-[0.18em] text-[var(--muted)] uppercase sm:text-[0.75rem] sm:tracking-[0.28em]">
            <span>Custom software</span>
            <b className="grad-text font-normal">·</b>
            <span>Workflows</span>
            <b className="grad-text font-normal">·</b>
            <span>Apps</span>
            <b className="grad-text font-normal">·</b>
            <span>AI</span>
            <b className="grad-text font-normal">·</b>
            <span>Websites</span>
          </p>
          <h1 className="font-display mt-7 max-w-[14ch] text-[clamp(2.5rem,6.2vw,4.5rem)] leading-[1.04] tracking-tight text-balance">
            Custom software for businesses that have{' '}
            <span className="grad-text">outgrown their tools</span>.
          </h1>
          <p className="mt-8 max-w-[52ch] text-[1.125rem] text-[var(--muted)]">
            Software the shop has running, sites we have published, and programs people install.
            Where the work is behind a sign-in, the link is the door.
          </p>
          <div className="mt-11 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#work"
              className="font-mono border border-[var(--teal)] px-6 py-3.5 text-[0.78rem] tracking-[0.16em] uppercase no-underline shadow-[0_0_28px_rgba(72,144,160,0.22)]"
            >
              See the work
            </a>
            <a
              href="#start"
              className="font-mono border border-[var(--line)] px-6 py-3.5 text-[0.78rem] tracking-[0.16em] text-[var(--ink)] uppercase no-underline hover:border-[var(--teal)]"
            >
              Start a project
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="shop-section scroll-mt-24">
        <div className="mx-auto max-w-[1080px] px-6">
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-none">Running.</h2>
            <span className="section-index">Systems</span>
          </div>
          <p className="mb-12 max-w-[62ch] text-[1.125rem] text-[var(--muted)]">
            Ask us and we will set up a trial.
          </p>
          <Ledger rows={systems} />
        </div>
      </section>

      <section className="shop-section" aria-labelledby="sites-heading">
        <div className="mx-auto max-w-[1080px] px-6">
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 id="sites-heading" className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-none">
              Published.
            </h2>
            <span className="section-index">Sites</span>
          </div>
          <Ledger rows={websites} />
        </div>
      </section>

      <section className="shop-section" aria-label="Clients">
        <div className="mx-auto max-w-[1080px] px-6">
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-none">Clients.</h2>
            <span className="section-index">In their words</span>
          </div>
          <article className="border-t border-[var(--line)] py-10">
            <h3 className="font-display text-[1.6rem]">Vander Woude Enterprises</h3>
            <blockquote className="font-display mt-6 max-w-[34ch] text-[clamp(1.45rem,2.4vw,1.85rem)] leading-snug font-medium">
              Erik has been an invaluable technology partner. He&apos;s built several custom
              applications for my businesses, and each time he&apos;s delivered a rock-solid product
              that fits our unique needs perfectly. He&apos;s great at understanding the business
              goals behind the software.
            </blockquote>
            <p className="font-mono mt-6 text-[0.8rem] tracking-wide text-[var(--muted)]">
              Simon Vander Woude, Vander Woude Enterprises
            </p>
          </article>
          <article className="border-t border-b border-[var(--line)] bg-[var(--panel)] px-6 py-10 md:-mx-6 md:px-6">
            <h3 className="font-display text-[1.6rem]">The GMN Group</h3>
            <blockquote className="font-display mt-6 max-w-[34ch] text-[clamp(1.45rem,2.4vw,1.85rem)] leading-snug font-medium text-[var(--mist)]">
              We came to Erik with a complex idea for a health and safety application, and he has
              been crushing it. His attention to detail and commitment to getting things right are
              exactly what you need for a project this critical. We&apos;re excited to continue our
              work with him.
            </blockquote>
            <p className="font-mono mt-6 text-[0.8rem] tracking-wide text-[var(--ink)]">
              Mike Gugino, The GMN Group
            </p>
          </article>
        </div>
      </section>

      <section id="capabilities" className="shop-section scroll-mt-24">
        <div className="mx-auto max-w-[1080px] px-6">
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-display max-w-[14ch] text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.05]">
              What the shop builds.
            </h2>
            <span className="section-index">Capabilities</span>
          </div>
          {capabilities.map((row) => (
            <div key={row.label} className="spec-row">
              <h3 className="font-mono pt-1 text-[0.72rem] tracking-[0.24em] text-[var(--muted)] uppercase">
                {row.label}
              </h3>
              <p
                className={`max-w-[62ch] text-[1.0625rem] ${row.quiet ? 'text-[var(--muted)]' : ''}`}
              >
                {row.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="start" className="shop-section scroll-mt-24">
        <div className="mx-auto max-w-[1080px] px-6">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-display max-w-[12ch] text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.05]">
              Start a project.
            </h2>
            <span className="section-index">Contact</span>
          </div>
          <p className="max-w-[52ch] text-[1.125rem] text-[var(--muted)]">
            Tell us what the business needs. If you want a trial of something already in use, say
            which one. We reply at the email you give us.
          </p>
          <ProjectForm />
        </div>
      </section>
    </div>
  );
}
