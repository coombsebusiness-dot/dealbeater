import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the Deal Beater Terms of Use, including important information about product comparisons, retailer offers, affiliate links and permitted website use.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Use | Deal Beater",
    description:
      "The terms that apply when you access or use the Deal Beater website and product comparison service.",
    url: "/terms",
    type: "website",
  },
};

const lastUpdated = "24 July 2026";

export default function TermsPage() {
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
            Using Deal Beater
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Terms of <span className="text-[#2ee866]">Use</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/68">
            These terms explain the rules that apply when you access or use
            Deal Beater and the information provided through our service.
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
                aria-label="Terms of Use contents"
                className="mt-5 flex flex-col gap-3 text-sm text-white/60"
              >
                <TermsLink href="#about">About these terms</TermsLink>
                <TermsLink href="#service">The service</TermsLink>
                <TermsLink href="#not-retailer">Our role</TermsLink>
                <TermsLink href="#accuracy">
                  Prices and product information
                </TermsLink>
                <TermsLink href="#recommendations">
                  Recommendations and results
                </TermsLink>
                <TermsLink href="#affiliate-links">
                  Affiliate links
                </TermsLink>
                <TermsLink href="#uploads">Your submissions</TermsLink>
                <TermsLink href="#acceptable-use">Acceptable use</TermsLink>
                <TermsLink href="#intellectual-property">
                  Intellectual property
                </TermsLink>
                <TermsLink href="#third-parties">
                  Third-party websites
                </TermsLink>
                <TermsLink href="#availability">Availability</TermsLink>
                <TermsLink href="#liability">Our responsibility</TermsLink>
                <TermsLink href="#consumer-rights">
                  Consumer rights
                </TermsLink>
                <TermsLink href="#termination">Suspension</TermsLink>
                <TermsLink href="#changes">Changes</TermsLink>
                <TermsLink href="#law">Governing law</TermsLink>
                <TermsLink href="#contact">Contact</TermsLink>
              </nav>
            </div>
          </aside>

          <article className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-10 sm:px-10 lg:px-14">
            <TermsSection id="about" title="1. About these terms">
              <p>
                These Terms of Use apply when you visit or use the Deal Beater
                website, Deal Checker and related services.
              </p>

              <p>
                Deal Beater is operated by{" "}
                <strong className="text-white">Frame Tech UK Ltd</strong>.
              </p>

              <p>
                By using Deal Beater, you agree to follow these terms. Please do
                not use the service if you do not agree with them.
              </p>
            </TermsSection>

            <TermsSection id="service" title="2. What Deal Beater provides">
              <p>
                Deal Beater is a product-checking and price-comparison service
                designed to help UK consumers make more informed buying
                decisions.
              </p>

              <p>The service may allow you to:</p>

              <TermsList
                items={[
                  "Enter a product name, description or model number.",
                  "Paste a retailer or product link.",
                  "Upload a quote, image or document for analysis.",
                  "Compare offers from retailers and online marketplaces.",
                  "Review product-matching information and buying guidance.",
                  "Follow links to third-party retailer websites.",
                ]}
              />

              <p>
                Deal Beater is continually being developed. Features may be
                added, changed, tested or removed over time.
              </p>
            </TermsSection>

            <TermsSection
              id="not-retailer"
              title="3. Deal Beater is not the retailer"
            >
              <p>
                Deal Beater does not normally sell, supply, deliver or fulfil
                the products displayed through the service.
              </p>

              <p>
                When you choose to purchase a product, the transaction is
                usually made directly with the relevant retailer, marketplace
                seller or service provider. Their terms, returns policy,
                warranty terms, delivery arrangements and privacy policy will
                apply to that transaction.
              </p>

              <p>
                Questions about payment, delivery, cancellations, returns,
                refunds, warranties or faulty products should normally be
                directed to the retailer responsible for the sale.
              </p>
            </TermsSection>

            <TermsSection
              id="accuracy"
              title="4. Prices, availability and product information"
            >
              <p>
                We work to provide useful and accurate comparisons, but product
                information can change quickly.
              </p>

              <p>
                Prices, stock levels, delivery charges, discount codes,
                specifications, seller details, ratings and promotional offers
                may change after Deal Beater has collected or displayed them.
              </p>

              <p>
                Before making a purchase, you should verify the final price,
                model, specification, condition, seller, delivery cost and
                availability on the retailer&apos;s website.
              </p>

              <Notice>
                The price and information shown by the retailer at checkout
                should be treated as the final information for your purchase.
              </Notice>
            </TermsSection>

            <TermsSection
              id="recommendations"
              title="5. Comparisons, scores and recommendations"
            >
              <p>
                Deal Beater may use automated systems, product data and
                matching rules to identify products, reject unsuitable listings
                and rank retailer offers.
              </p>

              <p>
                Results may consider factors such as:
              </p>

              <TermsList
                items={[
                  "Brand and model match.",
                  "Revision, variant and specification.",
                  "Product condition.",
                  "Whether a listing appears to be an accessory, upgrade or bundle.",
                  "Price, delivery information and availability.",
                  "Retailer identity, reputation or affiliate priority.",
                ]}
              />

              <p>
                Results and recommendations are provided for general shopping
                assistance. They are not a guarantee that a particular product
                is suitable for your personal circumstances.
              </p>

              <p>
                You remain responsible for reviewing the product and deciding
                whether to purchase it.
              </p>
            </TermsSection>

            <TermsSection
              id="affiliate-links"
              title="6. Affiliate links and commissions"
            >
              <p>
                Some links on Deal Beater are affiliate links. This means we
                may receive a commission if you follow a link and complete a
                qualifying purchase.
              </p>

              <p>
                Using an affiliate link will not normally increase the price
                you pay.
              </p>

              <p>
                Commercial relationships may influence which retailers are
                available to display, but we aim not to recommend an unsuitable
                product simply because it may generate a higher commission.
              </p>

              <p>
                More information is available in our{" "}
                <Link
                  href="/affiliate-disclosure"
                  className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  Affiliate Disclosure
                </Link>
                .
              </p>
            </TermsSection>

            <TermsSection
              id="uploads"
              title="7. Information, links and files you submit"
            >
              <p>
                You are responsible for the information, links, images,
                documents and other material you submit to Deal Beater.
              </p>

              <p>You must not submit content that:</p>

              <TermsList
                items={[
                  "You do not own or have permission to use.",
                  "Contains confidential information that you are not authorised to disclose.",
                  "Contains unnecessary payment-card, banking, medical or highly sensitive personal information.",
                  "Is unlawful, fraudulent, harmful, defamatory, threatening or abusive.",
                  "Contains malware, malicious code or material intended to interfere with the service.",
                  "Infringes another person’s copyright, trade mark, privacy or other rights.",
                ]}
              />

              <p>
                You retain ownership of material you submit. You give us
                permission to process it only as reasonably necessary to
                provide, secure, troubleshoot and improve the requested service,
                subject to our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </TermsSection>

            <TermsSection id="acceptable-use" title="8. Acceptable use">
              <p>You must not:</p>

              <TermsList
                items={[
                  "Use Deal Beater for unlawful, fraudulent or misleading activity.",
                  "Attempt to gain unauthorised access to the service, its systems or user data.",
                  "Probe, scan, attack or deliberately overload the website or its infrastructure.",
                  "Introduce viruses, malware, automated attacks or harmful code.",
                  "Use automated scraping, crawling or extraction methods in a way that damages the service or breaches applicable law.",
                  "Copy or republish substantial parts of the service without permission.",
                  "Attempt to reverse engineer, bypass or manipulate product-matching, ranking or affiliate systems.",
                  "Impersonate another person, retailer or organisation.",
                  "Use the service in a way that interferes with another visitor’s use of Deal Beater.",
                ]}
              />
            </TermsSection>

            <TermsSection
              id="intellectual-property"
              title="9. Intellectual property"
            >
              <p>
                Unless stated otherwise, Deal Beater and Frame Tech UK Ltd own
                or license the website design, branding, software, written
                content, databases, matching systems and other original
                material made available through the service.
              </p>

              <p>
                You may use Deal Beater for your own personal, non-commercial
                shopping purposes.
              </p>

              <p>
                You may not reproduce, sell, license, distribute or exploit our
                original content or technology without prior written
                permission, except where permitted by law.
              </p>

              <p>
                Retailer names, product names, logos and trade marks belong to
                their respective owners. Their appearance on Deal Beater does
                not imply ownership or endorsement unless expressly stated.
              </p>
            </TermsSection>

            <TermsSection
              id="third-parties"
              title="10. Retailers and third-party websites"
            >
              <p>
                Deal Beater contains links to websites and services operated by
                third parties.
              </p>

              <p>
                We do not control those websites and are not responsible for
                their content, security, availability, prices, products,
                policies or business practices.
              </p>

              <p>
                A link does not automatically mean that Deal Beater endorses
                every product, statement or service available on the
                destination website.
              </p>
            </TermsSection>

            <TermsSection
              id="availability"
              title="11. Availability and changes to the service"
            >
              <p>
                We aim to keep Deal Beater available and functioning properly,
                but we do not promise that the service will always be
                uninterrupted or error-free.
              </p>

              <p>
                We may temporarily restrict access for maintenance, security,
                updates, capacity limits, provider outages or other operational
                reasons.
              </p>

              <p>
                We may change, replace, suspend or discontinue features where
                reasonably necessary.
              </p>
            </TermsSection>

            <TermsSection
              id="liability"
              title="12. Our responsibility to you"
            >
              <p>
                Nothing in these terms excludes or limits responsibility where
                doing so would be unlawful. This includes responsibility for
                death or personal injury caused by negligence, fraud or
                fraudulent misrepresentation.
              </p>

              <p>
                Subject to that, Deal Beater is responsible for losses that are
                a foreseeable result of our failure to use reasonable care and
                skill or our breach of these terms.
              </p>

              <p>
                We are not responsible for losses caused by:
              </p>

              <TermsList
                items={[
                  "A retailer, marketplace seller, manufacturer, delivery company or other third party.",
                  "A change in price, availability, specification or promotion after information was displayed.",
                  "Incorrect, incomplete or misleading information supplied by a retailer, data provider or user.",
                  "Your failure to verify the final product and transaction details before purchasing.",
                  "Events outside our reasonable control.",
                  "Use of Deal Beater for business or commercial purposes where the service was provided for personal consumer use.",
                ]}
              />

              <p>
                Deal Beater does not provide financial, legal, medical,
                investment or other regulated professional advice.
              </p>
            </TermsSection>

            <TermsSection
              id="consumer-rights"
              title="13. Your statutory consumer rights"
            >
              <p>
                Nothing in these terms affects any rights you have under UK
                consumer law.
              </p>

              <p>
  Consumers have legal protections when purchasing goods, services and
  digital content. Those rights cannot be removed by wording in these terms.
</p>

              <p>
                Your purchase contract with a retailer may give you additional
                rights concerning faulty goods, cancellations, refunds,
                delivery or digital content.
              </p>
            </TermsSection>

            <TermsSection
              id="termination"
              title="14. Restricting or ending access"
            >
              <p>
                We may restrict, suspend or end access to Deal Beater where we
                reasonably believe a user has:
              </p>

              <TermsList
                items={[
                  "Seriously or repeatedly breached these terms.",
                  "Used the service unlawfully or fraudulently.",
                  "Created a security risk or disrupted the service.",
                  "Attempted to misuse our technology, data or infrastructure.",
                ]}
              />

              <p>
                Where appropriate and reasonably possible, we may provide
                notice or an opportunity to correct the issue.
              </p>
            </TermsSection>

            <TermsSection id="changes" title="15. Changes to these terms">
              <p>
                We may update these terms when Deal Beater changes, when our
                legal obligations change or when clarification is needed.
              </p>

              <p>
                The latest version will be published on this page with a new
                last-updated date.
              </p>

              <p>
                Material changes will apply from the date stated in the updated
                terms and will not remove rights that already arose under
                applicable law.
              </p>
            </TermsSection>

            <TermsSection
              id="severability"
              title="16. If part of these terms is invalid"
            >
              <p>
                If a court or relevant authority decides that part of these
                terms is unlawful or unenforceable, the remaining terms will
                continue to apply.
              </p>
            </TermsSection>

            <TermsSection
              id="law"
              title="17. Governing law and disputes"
            >
              <p>
                These terms are governed by the laws of England and Wales.
              </p>

              <p>
                If you live elsewhere in the United Kingdom, you may also have
                the right to bring proceedings in the courts of the country in
                which you live.
              </p>

              <p>
                We encourage you to contact us first so that we can try to
                resolve any concern informally.
              </p>
            </TermsSection>

            <TermsSection id="contact" title="18. Contact us" last>
              <div className="rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] p-6">
                <p className="text-lg font-black text-white">Deal Beater</p>

                <p className="mt-3">
                  Operated by{" "}
                  <strong className="text-white">Frame Tech UK Ltd</strong>
                </p>

                <p className="mt-3">
                  Email:{" "}
                  <a
                    href="mailto:hello@dealbeater.co.uk"
                    className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                  >
                    hello@dealbeater.co.uk
                  </a>
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
            </TermsSection>
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
                  href="/privacy"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Privacy Policy
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

function TermsSection({
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

function TermsList({ items }: { items: string[] }) {
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

function TermsLink({
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

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] p-5 text-white/75">
      <strong className="text-[#68f18e]">Important: </strong>
      {children}
    </div>
  );
}