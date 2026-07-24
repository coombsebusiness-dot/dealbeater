import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Read the Deal Beater Cookie Policy to understand how cookies, analytics and affiliate tracking technologies are used on our website.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Cookie Policy | Deal Beater",
    description:
      "Learn how Deal Beater uses cookies, Google Analytics and affiliate tracking technologies.",
    url: "/cookies",
    type: "website",
  },
};

const lastUpdated = "24 July 2026";

const cookieRows = [
  {
    name: "dealbeater_cookie_consent",
    provider: "Deal Beater",
    purpose:
      "Stores your cookie and analytics preference so we can remember your choice.",
    duration: "Up to 12 months",
    category: "Strictly necessary",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose:
      "Used to distinguish visitors and help measure website usage.",
    duration: "Up to 2 years",
    category: "Analytics",
  },
  {
    name: "_ga_<container-id>",
    provider: "Google Analytics",
    purpose:
      "Used to maintain session information for a Google Analytics property.",
    duration: "Up to 2 years",
    category: "Analytics",
  },
];

export default function CookiePage() {
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
            Your choices
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Cookie <span className="text-[#2ee866]">Policy</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/68">
            This policy explains how Deal Beater uses cookies and similar
            technologies, what they do and how you can control them.
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
                aria-label="Cookie Policy contents"
                className="mt-5 flex flex-col gap-3 text-sm text-white/60"
              >
                <CookieLink href="#what-are-cookies">
                  What cookies are
                </CookieLink>

                <CookieLink href="#how-we-use">
                  How we use cookies
                </CookieLink>

                <CookieLink href="#categories">
                  Cookie categories
                </CookieLink>

                <CookieLink href="#cookies-used">
                  Cookies we use
                </CookieLink>

                <CookieLink href="#analytics">
                  Google Analytics
                </CookieLink>

                <CookieLink href="#affiliate">
                  Affiliate tracking
                </CookieLink>

                <CookieLink href="#consent">
                  Consent and preferences
                </CookieLink>

                <CookieLink href="#browser-controls">
                  Browser controls
                </CookieLink>

                <CookieLink href="#third-parties">
                  Third-party websites
                </CookieLink>

                <CookieLink href="#changes">
                  Changes to this policy
                </CookieLink>

                <CookieLink href="#contact">Contact us</CookieLink>
              </nav>
            </div>
          </aside>

          <article className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-10 sm:px-10 lg:px-14">
            <CookieSection
              id="what-are-cookies"
              title="1. What are cookies?"
            >
              <p>
                Cookies are small text files that a website may store on your
                browser or device. They allow websites to remember information,
                maintain functionality and understand how visitors use a
                service.
              </p>

              <p>
                Similar technologies may include local storage, tags, pixels,
                scripts and identifiers that store or access information on
                your device.
              </p>
            </CookieSection>

            <CookieSection
              id="how-we-use"
              title="2. How Deal Beater uses cookies"
            >
              <p>Deal Beater may use cookies and similar technologies to:</p>

              <CookieList
                items={[
                  "Provide essential website functionality.",
                  "Remember your cookie and privacy choices.",
                  "Protect the website against fraud, abuse and security threats.",
                  "Understand how visitors use Deal Beater.",
                  "Measure website traffic, performance and engagement.",
                  "Diagnose technical problems and improve the user experience.",
                  "Record when a visitor follows an affiliate link to a retailer.",
                ]}
              />

              <p>
                We do not use cookies to obtain your retailer account password,
                payment-card details or complete purchase history.
              </p>
            </CookieSection>

            <CookieSection
              id="categories"
              title="3. Categories of cookies"
            >
              <h3 className="text-xl font-black text-white">
                Strictly necessary cookies
              </h3>

              <p>
                These are required for essential website functions, security or
                remembering privacy choices. The website cannot operate
                correctly without some of these technologies.
              </p>

              <h3 className="pt-3 text-xl font-black text-white">
                Analytics cookies
              </h3>

              <p>
                These help us understand how people use Deal Beater, including
                which pages are visited, how visitors arrived and whether
                technical problems occur.
              </p>

              <p>
                Analytics cookies are optional and should only be enabled after
                you have given the required permission.
              </p>

              <h3 className="pt-3 text-xl font-black text-white">
                Affiliate and referral technologies
              </h3>

              <p>
                Retailers or affiliate networks may use referral identifiers,
                cookies or similar technologies after you follow a product
                link. These allow them to identify that Deal Beater referred
                the visit and determine whether a qualifying purchase occurred.
              </p>
            </CookieSection>

            <CookieSection
              id="cookies-used"
              title="4. Cookies currently used"
            >
              <p>
                The table below describes the main cookies expected to be used
                through Deal Beater&apos;s current website setup.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="min-w-[780px] w-full text-left text-sm">
                  <thead className="bg-white/[0.05] text-white">
                    <tr>
                      <th className="px-5 py-4 font-black">Cookie</th>
                      <th className="px-5 py-4 font-black">Provider</th>
                      <th className="px-5 py-4 font-black">Purpose</th>
                      <th className="px-5 py-4 font-black">Duration</th>
                      <th className="px-5 py-4 font-black">Category</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cookieRows.map((cookie) => (
                      <tr
                        key={cookie.name}
                        className="border-t border-white/10 align-top"
                      >
                        <td className="px-5 py-4">
                          <code className="rounded bg-black/20 px-2 py-1 text-[#68f18e]">
                            {cookie.name}
                          </code>
                        </td>

                        <td className="px-5 py-4 text-white/65">
                          {cookie.provider}
                        </td>

                        <td className="max-w-sm px-5 py-4 leading-6 text-white/65">
                          {cookie.purpose}
                        </td>

                        <td className="px-5 py-4 text-white/65">
                          {cookie.duration}
                        </td>

                        <td className="px-5 py-4 text-white/65">
                          {cookie.category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Notice>
                The exact cookie name may include your Google Analytics
                measurement or container identifier. Browser restrictions,
                configuration changes or provider updates may also shorten or
                alter cookie durations.
              </Notice>
            </CookieSection>

            <CookieSection id="analytics" title="5. Google Analytics">
              <p>
                Deal Beater uses Google Analytics to understand how visitors
                interact with the website and to improve its performance.
              </p>

              <p>Google Analytics may collect information including:</p>

              <CookieList
                items={[
                  "The number of visitors and sessions.",
                  "Pages viewed and time spent using the website.",
                  "Approximate geographic information.",
                  "Browser, operating system and device information.",
                  "Referral source and navigation activity.",
                  "Website interactions and technical performance information.",
                ]}
              />

              <p>
                Google Analytics commonly uses the first-party cookie{" "}
                <code>_ga</code> to distinguish users and sessions, along with
                a property-specific cookie beginning with{" "}
                <code>_ga_</code> to retain session state.
              </p>

              <p>
                We do not intentionally send names, email addresses or other
                directly identifying information to Google Analytics.
              </p>
            </CookieSection>

            <CookieSection
              id="affiliate"
              title="6. Affiliate and retailer tracking"
            >
              <p>
                Some links on Deal Beater are affiliate links. When you click
                one, the destination retailer or affiliate network may use a
                referral identifier, cookie or similar technology to record
                that the visit came from Deal Beater.
              </p>

              <p>
                This information may be used to attribute a qualifying purchase
                and calculate commission. The exact technologies, purposes and
                retention periods are controlled by the retailer or affiliate
                network.
              </p>

              <p>
                Once you leave Deal Beater, the destination website&apos;s own
                cookie policy and privacy terms apply.
              </p>

              <p>
                Read our{" "}
                <Link
                  href="/affiliate-disclosure"
                  className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  Affiliate Disclosure
                </Link>{" "}
                for further information.
              </p>
            </CookieSection>

            <CookieSection
              id="consent"
              title="7. Consent and changing your preferences"
            >
              <p>
                When required, Deal Beater will ask for your permission before
                enabling optional analytics or other non-essential
                technologies.
              </p>

              <p>
                You should be able to accept or reject optional cookies and
                later change your decision through the website&apos;s cookie
                controls.
              </p>

              <p>
                Rejecting optional cookies should not prevent you from using
                the main Deal Beater product-checking service, although some
                non-essential measurement features may no longer operate.
              </p>

              <div className="rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] p-6">
                <p className="font-black text-white">Cookie preferences</p>

                <p className="mt-3 text-white/68">
                  A cookie preferences button will be added when the consent
                  banner is implemented. It will allow visitors to review or
                  change their analytics choice.
                </p>
              </div>
            </CookieSection>

            <CookieSection
              id="browser-controls"
              title="8. Browser and device controls"
            >
              <p>
                Most browsers allow you to inspect, block or delete cookies
                through their privacy or security settings.
              </p>

              <p>
                Blocking all cookies may affect websites that rely on
                essential storage for functionality, authentication or saved
                preferences.
              </p>

              <p>
                Browser controls are separate from Deal Beater&apos;s own
                consent controls. Deleting cookies may also remove your saved
                cookie preference, meaning the website may ask you to choose
                again.
              </p>
            </CookieSection>

            <CookieSection
              id="third-parties"
              title="9. Third-party websites"
            >
              <p>
                Deal Beater links to retailers, marketplaces and other
                third-party websites. We do not control the cookies or similar
                technologies used on those websites.
              </p>

              <p>
                You should review the privacy and cookie information provided
                by the destination website before making a purchase or
                providing personal information.
              </p>
            </CookieSection>

            <CookieSection
              id="changes"
              title="10. Changes to this policy"
            >
              <p>
                We may update this Cookie Policy when our website, analytics
                setup, affiliate relationships, providers or legal obligations
                change.
              </p>

              <p>
                The most recent version will be published on this page with an
                updated revision date.
              </p>
            </CookieSection>

            <CookieSection id="contact" title="11. Contact us" last>
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
                  You can also read our{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </CookieSection>
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
                  href="/terms"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Terms of Use
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

function CookieSection({
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

function CookieList({ items }: { items: string[] }) {
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

function CookieLink({
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
      <strong className="text-[#68f18e]">Please note: </strong>
      {children}
    </div>
  );
}