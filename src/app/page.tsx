import ProjectForm from '@/components/ProjectForm';

const labelClass = 'text-[12px] uppercase tracking-[0.16em]';

const linkClass =
  'underline decoration-[#245E6C] underline-offset-4 hover:text-[#245E6C]';

type WorkLink = { href: string; label: string };

type WorkRow = {
  name: string;
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
    name: 'GBC Tools',
    links: [{ href: 'https://www.gbctools.com', label: 'gbctools.com' }],
    body: 'AI vision on the cameras, counting, a report center, and scheduling for church staff. The link opens the sign-in.',
  },
  {
    name: 'Job Workflow Pro',
    links: [
      { href: 'https://www.jobworkflowpro.com', label: 'jobworkflowpro.com' },
      ...storeLinks('jobWorkflowPro'),
    ],
    body: 'Jobs, costing, and scheduling for restoration crews, and a mobile app for people in the field.',
  },
  {
    name: 'UmpCrew',
    links: [{ href: 'https://umpcrew.com', label: 'umpcrew.com' }, ...storeLinks('umpcrew')],
    body: 'Scheduling for umpire crews in baseball and softball.',
  },
  {
    name: 'Mold Detector AI',
    links: [
      { href: 'https://www.molddetectorai.com', label: 'molddetectorai.com' },
      ...storeLinks('moldDetector'),
    ],
    body: 'A photo is read for mold, and a qualified lead goes to a restoration company.',
  },
  {
    name: 'Camp HQ',
    links: [{ href: 'https://hq.camp', label: 'hq.camp' }],
    body: 'Check-in, attendance, and the staff tools for a week of camp.',
  },
  {
    name: '5min.bible',
    links: [{ href: 'https://5min.bible', label: '5min.bible' }, ...storeLinks('fiveMinBible')],
    body: 'A daily Bible habit.',
  },
  {
    name: 'Spiritual Growth Eval',
    links: [{ href: 'https://www.spiritualgrowtheval.com', label: 'spiritualgrowtheval.com' }],
    body: 'Assessments a ministry uses with its people.',
  },
  {
    name: 'DugoutIQ',
    body: 'Pitch tracking and game charting for softball and baseball coaches, on iPad.',
  },
  {
    name: 'TenkeyBridge',
    links: [{ href: 'https://tenkeybridge.com', label: 'tenkeybridge.com' }],
    body: 'A Windows program, with a cloud gateway, so QuickBooks Desktop can answer in the shape of QuickBooks Online.',
  },
];

const websites: WorkRow[] = [
  {
    name: 'Ridgeline Integrated Systems',
    links: [{ href: 'https://ridgelineintegrated.com', label: 'ridgelineintegrated.com' }],
    body: 'The website for a commercial cameras, cabling, and AV company in the Treasure Valley.',
  },
  {
    name: 'High Desert Dairy Lab',
    links: [{ href: 'https://www.hddairylab.com', label: 'hddairylab.com' }],
    body: 'The website for the lab, and the system the lab runs. Customers and staff sign in.',
  },
  {
    name: 'Legacy Feed and Fuel',
    links: [{ href: 'https://www.legacyfeed.com', label: 'legacyfeed.com' }],
    body: 'The website for the feed and fuel business.',
  },
];

function WorkList({ rows }: { rows: WorkRow[] }) {
  return (
    <div>
      {rows.map((row) => (
        <article key={row.name} className="border-t border-[#cfc6b8] py-8">
          <h3 className="font-news text-[32px] leading-none md:text-[40px]">{row.name}</h3>
          <p className="mt-3 max-w-[62ch] text-[17px]">{row.body}</p>
          {row.links && row.links.length > 0 && (
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
              {row.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <p className="font-news px-6 pt-8 text-[26px] leading-snug text-[#141614] md:hidden">
        Custom software for businesses that have outgrown their tools.
      </p>

      <section id="work" className="scroll-mt-16 bg-[#f3efe6] text-[#141614] md:scroll-mt-0">
        <div className="px-6 pt-16 md:px-16 md:pt-20">
          <p className="max-w-[62ch] text-[18px] md:text-[22px] md:leading-relaxed">
            Software the shop has running, sites we have published, and programs people install.
            Where the work is behind a sign-in, the link is the door. Ask us and we will set up a
            trial.
          </p>
          <h2 className={`${labelClass} mt-14`}>Systems</h2>
          <div className="mt-4">
            <WorkList rows={systems} />
          </div>
          <h2 className={`${labelClass} mt-14`}>Websites</h2>
          <div className="mt-4">
            <WorkList rows={websites} />
          </div>
        </div>

        <article className="mt-16 px-6 py-16 md:px-16">
          <p className={labelClass}>Client</p>
          <h2 className="font-news mt-4 text-[40px] leading-[1.05]">Vander Woude Enterprises</h2>
          <blockquote className="font-news mt-8 max-w-[36ch] text-[24px] leading-snug">
            Erik has been an invaluable technology partner. He&apos;s built several custom
            applications for my businesses, and each time he&apos;s delivered a rock-solid product
            that fits our unique needs perfectly. He&apos;s great at understanding the business
            goals behind the software.
          </blockquote>
          <p className="mt-6 text-[15px]">Simon Vander Woude, Vander Woude Enterprises</p>
        </article>

        <article className="bg-[#161816] px-6 py-16 text-[#f3efe6] md:px-16">
          <p className={labelClass}>Client</p>
          <h2 className="font-news mt-4 text-[40px] leading-[1.05] text-[#f3efe6]">
            The GMN Group
          </h2>
          <blockquote className="font-news mt-8 max-w-[36ch] text-[24px] leading-snug text-[#4890A0]">
            We came to Erik with a complex idea for a health and safety application, and he has
            been crushing it. His attention to detail and commitment to getting things right are
            exactly what you need for a project this critical. We&apos;re excited to continue our
            work with him.
          </blockquote>
          <p className="mt-6 text-[15px] text-[#f3efe6]">Mike Gugino, The GMN Group</p>
        </article>
      </section>

      <section
        id="capabilities"
        className="scroll-mt-16 bg-[#f3efe6] px-6 py-20 text-[#141614] md:scroll-mt-0 md:px-16 md:py-28"
      >
        <div className="max-w-3xl border-b border-[#cfc6b8] pb-16 md:pb-24">
          <p className={labelClass}>Custom software</p>
          <p className="mt-6 max-w-[62ch] text-[18px] md:text-[22px] md:leading-relaxed">
            Internal tools, customer portals, and other systems a business runs on. SMS when the
            operation needs it, set up to carrier rules. A project starts as a written scope, ends
            as a system in use, and includes the shop after launch.
          </p>
        </div>
        <div className="max-w-3xl pt-10 md:pt-12">
          <p className={labelClass}>Websites</p>
          <p className="mt-4 max-w-[62ch] text-[17px]">
            A marketing site for a business that needs to be found and taken seriously. Services
            sites, portfolios, and online stores. Designed and built, then handed over ready to
            use.
          </p>
        </div>
      </section>

      <section
        id="start"
        className="scroll-mt-16 bg-[#f3efe6] px-6 py-20 text-[#141614] md:min-h-screen md:scroll-mt-0 md:px-16 md:py-28"
      >
        <h2 className="text-[12px] uppercase tracking-[0.16em]">Start a project</h2>
        <p className="mt-6 max-w-[62ch] text-[18px]">
          Tell us what the business needs. If you want a trial of something already in use, say
          which one. We reply at the email you give us.
        </p>
        <ProjectForm />
      </section>
    </div>
  );
}
