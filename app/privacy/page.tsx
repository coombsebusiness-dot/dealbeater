import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Deal Beater Privacy Policy to understand what personal information we collect, why we use it and your UK data protection rights.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Deal Beater",
    description:
      "Learn how Deal Beater collects, uses and protects personal information.",
    url: "/privacy",
    type: "website",
  },
};

const lastUpdated = "24 July 2026";

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#101b26] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" aria-label="Deal Beater homepage">
            <div className="text-3xl font-extrabold tracking-tight">
              Deal<span className="text-[#2ee866]">Beater</span>
            </div>

            <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-white/65">
              DON&apos;T BUY UNTIL WE&apos;VE CHECKED IT.
            </p>
          </Link>

         <nav
  aria-label="Main navigation"
  className="hidden items-center gap-9 text-sm font-semibold md:flex"
>
  <a
    href="#deal-checker"
    className="transition hover:text-[#2ee866]"
  >
    Check a Deal
  </a>

  <a
    href="#how-it-works"
    className="transition hover:text-[#2ee866]"
  >
    How It Works
  </a>

  <Link
    href="/blog"
    className="transition hover:text-[#2ee866]"
  >
    Blog
  </Link>

  <Link
    href="/about"
    className="transition hover:text-[#2ee866]"
  >
    About Us
  </Link>

  <Link
    href="/contact"
    className="transition hover:text-[#2ee866]"
  >
    Contact
  </Link>
</nav>

          <div className="rounded-lg border border-[#2ee866]/30 bg-[#2ee866]/10 px-5 py-3 text-sm font-bold text-[#68f18e]">
            Beta
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
            Your information
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Privacy <span className="text-[#2ee866]">Policy</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/68">
            This policy explains how Deal Beater collects, uses, stores and
            protects personal information when you use our website or contact
            us.
          </p>

          <p className="mt-5 text-sm text-white/45">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <p className="font-black">Contents</p>

              <nav
                aria-label="Privacy Policy contents"
                className="mt-5 flex flex-col gap-3 text-sm text-white/60"
              >
                <PolicyLink href="#who-we-are">Who we are</PolicyLink>
                <PolicyLink href="#information">
                  Information we collect
                </PolicyLink>
                <PolicyLink href="#how-we-use">
                  How we use information
                </PolicyLink>
                <PolicyLink href="#lawful-bases">Lawful bases</PolicyLink>
                <PolicyLink href="#sharing">Who we share data with</PolicyLink>
                <PolicyLink href="#analytics">Analytics</PolicyLink>
                <PolicyLink href="#affiliate-links">
                  Affiliate links
                </PolicyLink>
                <PolicyLink href="#cookies">Cookies</PolicyLink>
                <PolicyLink href="#retention">Data retention</PolicyLink>
                <PolicyLink href="#transfers">
                  International transfers
                </PolicyLink>
                <PolicyLink href="#security">Security</PolicyLink>
                <PolicyLink href="#rights">Your rights</PolicyLink>
                <PolicyLink href="#complaints">Complaints</PolicyLink>
                <PolicyLink href="#contact">Contact us</PolicyLink>
              </nav>
            </div>
          </aside>

          <article className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-10 sm:px-10 lg:px-14">
            <PolicySection id="who-we-are" title="1. Who we are">
              <p>
                Deal Beater is a UK product and price-comparison service
                operated by{" "}
                <strong className="text-white">Frame Tech UK Ltd</strong>.
              </p>

              <p>
                For the purposes of UK data protection law, Frame Tech UK Ltd
                is the controller of personal information processed through
                Deal Beater unless stated otherwise.
              </p>

              <p>
                You can contact us at{" "}
                <EmailLink>hello@dealbeater.co.uk</EmailLink>.
              </p>
            </PolicySection>

            <PolicySection
              id="information"
              title="2. Information we may collect"
            >
              <p>
                The information we collect depends on how you interact with
                Deal Beater. It may include:
              </p>

              <PolicyList
                items={[
                  "Contact information, such as your name and email address, when you contact us.",
                  "The contents of messages, feedback, support requests and other correspondence you send to us.",
                  "Product names, descriptions, links, search terms and other information entered into the Deal Checker.",
                  "Information contained in a quote, document or image you choose to upload for analysis.",
                  "Technical information such as browser type, device type, operating system, approximate location derived from an IP address, referring page and access times.",
                  "Usage information about how visitors navigate and interact with the website.",
                  "Affiliate and referral information, such as whether a visitor followed a retailer link.",
                  "Cookie preferences and consent choices.",
                ]}
              />

              <Notice>
                Please remove unnecessary personal or sensitive information
                before uploading a quote or document. Do not submit information
                about another person unless you have the right to do so.
              </Notice>
            </PolicySection>

            <PolicySection
              id="how-we-use"
              title="3. How we use your information"
            >
              <p>We may use personal information to:</p>

              <PolicyList
                items={[
                  "Provide, operate and improve Deal Beater.",
                  "Analyse a product, link, description or quote submitted through the Deal Checker.",
                  "Identify relevant products and compare matching retailer offers.",
                  "Respond to enquiries, support requests and feedback.",
                  "Investigate incorrect results, misuse, security incidents and technical problems.",
                  "Measure website performance and understand how visitors use Deal Beater.",
                  "Maintain records required for legal, accounting or business purposes.",
                  "Protect our rights, users, systems and services.",
                  "Comply with legal and regulatory obligations.",
                ]}
              />

              <p>
                We do not sell your personal information to third parties.
              </p>
            </PolicySection>

            <PolicySection
              id="lawful-bases"
              title="4. Our lawful bases for processing"
            >
              <p>
                Under UK data protection law, we must have a lawful basis for
                using personal information. Depending on the circumstances, we
                may rely on:
              </p>

              <PolicyList
                items={[
                  "Contract: where processing is necessary to provide a service you request.",
                  "Legitimate interests: where processing is necessary to operate, secure, understand and improve Deal Beater, provided those interests are not overridden by your rights.",
                  "Consent: where you have made a clear choice, including for optional analytics or marketing cookies where consent is required.",
                  "Legal obligation: where processing is necessary to comply with a law or regulatory requirement.",
                ]}
              />

              <p>
                Where we rely on consent, you may withdraw it at any time. This
                will not affect processing that took place before consent was
                withdrawn.
              </p>
            </PolicySection>

            <PolicySection
              id="sharing"
              title="5. Who we may share information with"
            >
              <p>
                We may share limited information with organisations that help
                us operate Deal Beater, including:
              </p>

              <PolicyList
                items={[
                  "Website hosting, cloud infrastructure and database providers.",
                  "Analytics and website-performance providers.",
                  "Email, communication and customer-support providers.",
                  "Technology providers used to process product searches, links, documents or quotes.",
                  "Affiliate networks and retailers when a visitor follows an affiliate link.",
                  "Professional advisers such as accountants, insurers, solicitors and auditors.",
                  "Regulators, courts, law-enforcement agencies or other authorities where disclosure is required or permitted by law.",
                  "A buyer, investor or successor organisation if our business or assets are reorganised, sold or transferred.",
                ]}
              />

              <p>
                Service providers acting on our behalf may only use personal
                information for the services they provide to us and under
                appropriate contractual safeguards.
              </p>
            </PolicySection>

            <PolicySection id="analytics" title="6. Google Analytics">
              <p>
                We use Google Analytics to understand how visitors use Deal
                Beater and to improve the website. Depending on your consent
                choices and our configuration, Google Analytics may collect
                information such as pages visited, session duration, device and
                browser information, referral source and approximate
                geographic information.
              </p>

              <p>
                Google Analytics may use identifiers and first-party cookies,
                including the <code>_ga</code> cookie, to distinguish users and
                sessions. We do not intentionally send names, email addresses
                or other directly identifying information to Google Analytics.
              </p>

              <p>
                Where consent is legally required, optional analytics storage
                should not be enabled until you have given that consent. You
                can later change or withdraw your choice through the website’s
                cookie controls.
              </p>
            </PolicySection>

            <PolicySection
              id="affiliate-links"
              title="7. Affiliate links and retailer websites"
            >
              <p>
                Some retailer links on Deal Beater are affiliate links. If you
                follow one of these links and make a purchase, Deal Beater may
                receive a commission from the retailer or affiliate network.
                This does not normally increase the price you pay.
              </p>

              <p>
                Affiliate networks and retailers may process information about
                your click, referral and resulting transaction so that a
                commission can be attributed correctly. Once you leave Deal
                Beater, the privacy policy and cookie practices of the
                destination website apply.
              </p>

              <p>
                We do not receive your retailer account password or complete
                payment-card details merely because you follow an affiliate
                link.
              </p>
            </PolicySection>

            <PolicySection id="cookies" title="8. Cookies">
              <p>
                Cookies and similar technologies are small pieces of
                information stored on or accessed from your device. Deal Beater
                may use:
              </p>

              <PolicyList
                items={[
                  "Strictly necessary technologies required for security, core website functions and remembering privacy choices.",
                  "Analytics technologies used to measure traffic and understand website performance.",
                  "Affiliate technologies used to record that a visitor reached a retailer through Deal Beater.",
                ]}
              />

              <p>
                Non-essential storage or access technologies will be used only
                where permitted by law and, where required, after you provide
                consent. More information will be available in our{" "}
                <Link
                  href="/cookies"
                  className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection id="retention" title="9. How long we keep data">
              <p>
                We retain personal information only for as long as reasonably
                necessary for the purpose for which it was collected,
                including legal, accounting, security and dispute-resolution
                requirements.
              </p>

              <p>Retention periods may vary. For example:</p>

              <PolicyList
                items={[
                  "Contact correspondence may be retained while an enquiry is active and for a reasonable period afterwards.",
                  "Technical and security logs may be retained for a limited period needed to investigate incidents and maintain the service.",
                  "Analytics information is retained according to the settings applied to our analytics account.",
                  "Records required for tax, legal or contractual purposes may be retained for the applicable statutory period.",
                ]}
              />

              <p>
                Information may be deleted, anonymised or aggregated when it is
                no longer needed.
              </p>
            </PolicySection>

            <PolicySection
              id="transfers"
              title="10. International data transfers"
            >
              <p>
                Some providers we use may process information outside the
                United Kingdom. Where personal information is transferred
                internationally, we take reasonable steps to ensure an
                appropriate legal safeguard is in place, such as an adequacy
                regulation, approved contractual clauses or another mechanism
                permitted by UK data protection law.
              </p>
            </PolicySection>

            <PolicySection id="security" title="11. Data security">
              <p>
                We use appropriate technical and organisational measures
                intended to protect personal information against accidental
                loss, unauthorised access, misuse, alteration or disclosure.
              </p>

              <p>
                No internet service can guarantee absolute security. You should
                avoid sending confidential, financial, medical or otherwise
                sensitive information unless it is genuinely required for the
                service you are requesting.
              </p>
            </PolicySection>

            <PolicySection id="rights" title="12. Your data protection rights">
              <p>
                Depending on the circumstances, UK data protection law may give
                you rights including:
              </p>

              <PolicyList
                items={[
                  "The right to be informed about how your personal information is used.",
                  "The right to request access to personal information we hold about you.",
                  "The right to request correction of inaccurate or incomplete information.",
                  "The right to request deletion of your information in certain circumstances.",
                  "The right to request restriction of processing in certain circumstances.",
                  "The right to object to certain processing, including direct marketing.",
                  "The right to data portability where the legal requirements apply.",
                  "Rights relating to certain automated decisions and profiling.",
                  "The right to withdraw consent where processing is based on consent.",
                ]}
              />

              <p>
                These rights are not absolute and may be subject to legal
                exemptions. We may need to verify your identity before acting
                on a request.
              </p>

              <p>
                To exercise a right, email{" "}
                <EmailLink>hello@dealbeater.co.uk</EmailLink>.
              </p>
            </PolicySection>

            <PolicySection
              id="children"
              title="13. Children’s information"
            >
              <p>
                Deal Beater is not intended to collect personal information
                from children. If you believe a child has submitted personal
                information to us, contact us so we can investigate and take
                appropriate action.
              </p>
            </PolicySection>

            <PolicySection
              id="external-links"
              title="14. Links to other websites"
            >
              <p>
                Deal Beater contains links to retailers and other third-party
                websites. We are not responsible for how those organisations
                collect or use personal information. You should read the
                destination website’s privacy information before providing it
                with personal data.
              </p>
            </PolicySection>

            <PolicySection
              id="complaints"
              title="15. Questions and complaints"
            >
              <p>
                Please contact us first if you have a concern about how we use
                your personal information. We will try to resolve it.
              </p>

              <p>
                You also have the right to raise a concern with the UK
                Information Commissioner’s Office. Information about making a
                complaint is available at{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </PolicySection>

            <PolicySection
              id="changes"
              title="16. Changes to this policy"
            >
              <p>
                We may update this Privacy Policy when our services, providers
                or legal obligations change. The latest version will appear on
                this page with an updated revision date.
              </p>
            </PolicySection>

            <PolicySection id="contact" title="17. Contact us" last>
              <div className="rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] p-6">
                <p className="text-lg font-black text-white">Deal Beater</p>

                <p className="mt-3">
                  Operated by{" "}
                  <strong className="text-white">Frame Tech UK Ltd</strong>
                </p>

                <p className="mt-3">
                  Email: <EmailLink>hello@dealbeater.co.uk</EmailLink>
                </p>

                <p className="mt-3">
                  Website:{" "}
                  <a
                    href="https://dealbeater.co.uk"
                    className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                  >
                    dealbeater.co.uk
                  </a>
                </p>
              </div>
            </PolicySection>
          </article>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0d1822]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Link href="/" aria-label="Deal Beater homepage">
                <h2 className="text-2xl font-black">
                  Deal<span className="text-[#2ee866]">Beater</span>
                </h2>
              </Link>

              <p className="mt-4 max-w-md leading-7 text-white/65">
                Helping UK consumers compare products, check prices and make
                smarter buying decisions.
              </p>
            </div>

            <div className="md:text-right">
              <h2 className="text-lg font-bold">Company</h2>

              <nav
                aria-label="Footer navigation"
                className="mt-4 flex flex-col gap-3 md:items-end"
              >
                <Link
                  href="/about"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Contact
                </Link>

                <Link
                  href="/terms"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Terms of Use
                </Link>

                <Link
                  href="/cookies"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Cookie Policy
                </Link>

                <Link
                  href="/affiliate-disclosure"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Affiliate Disclosure
                </Link>
              </nav>
            </div>
          </div>

          <div className="my-10 h-px bg-white/10" />

          <div className="flex flex-col gap-3 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} Deal Beater. All rights reserved.</p>

            <p>
              Operated by{" "}
              <span className="font-semibold text-white/65">
                Frame Tech UK Ltd
              </span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function PolicySection({
  id,
  title,
  children,
  last = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-8 ${
        last ? "" : "mb-12 border-b border-white/10 pb-12"
      }`}
    >
      <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
        {title}
      </h2>

      <div className="mt-5 space-y-5 leading-8 text-white/68">{children}</div>
    </section>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#2ee866]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PolicyLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="transition hover:text-[#2ee866]">
      {children}
    </a>
  );
}

function EmailLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="mailto:hello@dealbeater.co.uk"
      className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
    >
      {children}
    </a>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] p-5 text-white/75">
      <strong className="text-[#68f18e]">Please note: </strong>
      {children}
    </div>
  );
}