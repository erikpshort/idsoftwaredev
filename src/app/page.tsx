import ProjectForm from '@/components/ProjectForm';

const labelClass =
  'text-[12px] uppercase tracking-[0.16em]';

export default function HomePage() {
  return (
    <div>
      <p className="font-news px-6 pt-8 text-[26px] leading-snug text-[#141614] md:hidden">
        Custom software for businesses that have outgrown their tools.
      </p>

      <section id="work">
        <article className="scroll-mt-16 bg-[#f3efe6] px-6 py-16 text-[#141614] md:flex md:min-h-screen md:scroll-mt-0 md:flex-col md:justify-center md:px-16 md:py-20">
          <p className={labelClass}>Client</p>
          <h2 className="font-news mt-4 max-w-[12ch] text-[40px] leading-[1.05] md:text-[72px]">
            Vander Woude Enterprises
          </h2>
          <p className="mt-6 text-[18px]">Custom applications for the operation</p>
          <p className="mt-4 max-w-[62ch] text-[18px]">
            Several custom applications, each built for the way that business operates.
          </p>
          <blockquote className="font-news mt-10 max-w-[36ch] text-[24px] leading-snug md:text-[28px]">
            Erik has been an invaluable technology partner. He&apos;s built several custom
            applications for my businesses, and each time he&apos;s delivered a rock-solid product
            that fits our unique needs perfectly. He&apos;s great at understanding the business
            goals behind the software.
          </blockquote>
          <p className="mt-6 text-[15px]">Simon Vander Woude, Vander Woude Enterprises</p>
        </article>

        <article className="bg-[#161816] px-6 py-16 text-[#f3efe6] md:flex md:min-h-screen md:flex-col md:justify-center md:px-16 md:py-20">
          <p className={labelClass}>Client</p>
          <h2 className="font-news mt-4 max-w-[12ch] text-[40px] leading-[1.05] text-[#f3efe6] md:text-[72px]">
            The GMN Group
          </h2>
          <p className="mt-6 text-[18px] text-[#f3efe6]">A health and safety application</p>
          <p className="mt-4 max-w-[62ch] text-[18px] text-[#f3efe6]">
            A health and safety application for a complex operational need.
          </p>
          <blockquote className="font-news mt-10 max-w-[36ch] text-[24px] leading-snug text-[#4890A0] md:text-[28px]">
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
          Tell us what the business needs. We reply at the email you give us.
        </p>
        <ProjectForm />
      </section>
    </div>
  );
}
