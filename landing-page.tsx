"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  Monitor,
  Users,
  Sparkles,
  HeartHandshake,
  Accessibility,
  Network,
  GitBranch,
  Globe,
  Mail,
  MapPin,
  Handshake,
  Menu,
  X,
} from "lucide-react"

function Circle({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full bg-[#B86BFF]/20 blur-[0.2px] ${className}`}
    />
  )
}

export default function Page() {
  const [menu, setMenu] = useState(false)
  const [pressedItem, setPressedItem] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const navItems = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "what-we-do", label: "What We Do" },
      { id: "focus", label: "Focus Areas" },
      { id: "contact", label: "Contact Us" },
    ],
    []
  )

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const headerOffset = 96
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top: y, behavior: "smooth" })
    setMenu(false)
  }

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* soft floating circles */}
      <Circle className="w-20 h-20 top-14 left-10" />
      <Circle className="w-10 h-10 top-40 right-20" />
      <Circle className="w-14 h-14 top-[520px] left-[55%]" />
      <Circle className="w-24 h-24 top-[760px] right-16" />
      <Circle className="w-16 h-16 top-[1180px] left-16" />
      <Circle className="w-28 h-28 top-[1650px] right-[12%]" />
      <Circle className="w-20 h-20 top-[2200px] left-[70%]" />
      <Circle className="w-24 h-24 top-[2780px] right-[18%]" />

      {/* DESKTOP PILL MENU (moved up) */}
      <div className="hidden md:flex fixed top-3 left-1/2 -translate-x-1/2 z-50">
        <div className="rounded-full border border-[#B86BFF]/50 bg-white/90 backdrop-blur-md shadow-lg px-4 py-2">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-semibold text-gray-900 hover:text-[#8B5CF6] focus:text-[#8B5CF6] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* MOBILE: Floating burger (sticky circle) */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          className="h-12 w-12 rounded-full bg-white border border-[#B86BFF]/40 shadow-lg flex items-center justify-center hover:bg-[#F3E9FF] transition-colors"
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          {menu ? (
            <X className="h-5 w-5 text-gray-900" />
          ) : (
            <Menu className="h-5 w-5 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile fullscreen menu overlay */}
      {menu && (
        <div className="fixed inset-0 z-40 bg-white/85 backdrop-blur-md md:hidden">
          <div className="relative h-full w-full flex items-center justify-center px-6">
            {/* blurred logo background */}
            <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-16">
              <Image
                src="/images/her-web-impact-logo.png"
                alt=""
                width={520}
                height={260}
                className="opacity-10 blur-sm"
                priority
              />
            </div>

            {/* menu items */}
            <div className="relative z-10 w-full max-w-sm text-center">
              <nav className="space-y-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    onPointerDown={() => setPressedItem(item.id)}
                    onPointerUp={() => setPressedItem(null)}
                    onPointerCancel={() => setPressedItem(null)}
                    onBlur={() => setPressedItem(null)}
                    className={[
                      "w-full text-2xl font-semibold tracking-tight transition-colors",
                      pressedItem === item.id ? "text-[#8B5CF6]" : "text-gray-900",
                      "hover:text-[#8B5CF6] focus:text-[#8B5CF6]",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <main className="relative">
        {/* HERO (tightened so banner fits) */}
        <section className="pt-16 md:pt-18 pb-8">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <div className="flex justify-center">
              <Image
                src="/images/her-web-impact-logo.png"
                alt="Her Web Impact"
                width={720}
                height={360}
                priority
                className="w-[300px] md:w-[460px] h-auto"
              />
            </div>

            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              Digital tools made with communities, not just for them
            </h1>

            <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Her Web Impact is a Community Interest Company supporting digital inclusion and women-led tech.
              We are rooted in lived experience and powered by purpose.
            </p>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => scrollTo("contact")}
                className="rounded-full bg-[#8B5CF6] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#7C3AED] transition-colors"
              >
                Get in Touch
              </button>
            </div>

            {/* NATIONAL LOTTERY BANNER */}
            <div className="mt-4">
              <div className="rounded-2xl border border-[#B86BFF]/25 bg-[#F5EDFF] px-4 py-4 md:px-6 md:py-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
                <Image
                  src="/images/tnlcf-full-colour-cy.png"
                  alt="The National Lottery Community Fund (Cymru)"
                  width={150}
                  height={150}
                  className="flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-gray-900">
                    We’ve been awarded £19,500 in National Lottery funding for Her Digital Empowerment.
                  </p>
                  <p className="text-gray-700 mt-1 leading-relaxed">
                    Our 16-week digital skills programme for refugee women in Cardiff is supported by National Lottery players
                    through The National Lottery Community Fund (Awards for All Wales).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT (purple band) */}
        <section id="about" className="relative">
          <div className="bg-[#8F6CF3]">
            <div className="mx-auto max-w-5xl px-4 py-16 md:py-20 text-center text-white relative">
              <div className="text-xs font-semibold tracking-widest opacity-90">ABOUT US</div>

              <h2 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
                Building digital confidence through community workshops and collaboration.
              </h2>

              <p className="mt-6 max-w-3xl mx-auto text-white/90 text-base md:text-lg leading-relaxed">
                We deliver hands-on workshops, training sessions and community-led design projects that empower women
                and local organisations to thrive in digital spaces.
              </p>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-sm md:text-base">
                <div className="opacity-95">Digital skills made simple</div>
                <div className="opacity-95">Community workshops</div>
                <div className="opacity-95">Creative collaboration</div>
                <div className="opacity-95">Inclusive engagement</div>
              </div>
            </div>
          </div>

          <div className="bg-[#EEE7FF] h-16" />
        </section>

        {/* WHAT WE DO */}
        <section id="what-we-do" className="bg-[#EEE7FF]">
          <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
            <div className="text-center">
              <div className="text-sm font-semibold text-[#8A4DFF]">What We Do</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
                Newly launched, proudly purpose-driven.
              </h2>
              <p className="mt-6 text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We build easy-to-use, multilingual tools that help people access housing, healthcare and support,
                shaped with the communities they are designed for.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card
                title="Digital Confidence"
                icon={<Users className="w-5 h-5 text-[#8A4DFF]" />}
                text="Hands-on learning, one-to-one support and workshops to help women thrive in digital spaces."
              />
              <Card
                title="Inclusive Design"
                icon={<Accessibility className="w-5 h-5 text-[#8A4DFF]" />}
                text="Building accessible, community-first websites and platforms that reflect the people they serve."
              />
              <Card
                title="Creative Collaboration"
                icon={<Sparkles className="w-5 h-5 text-[#8A4DFF]" />}
                text="Connecting creators, mentors and organisations to co-design tools that matter."
              />
              <Card
                title="Real-World Impact"
                icon={<HeartHandshake className="w-5 h-5 text-[#8A4DFF]" />}
                text="Amplifying unheard voices and supporting communities that need digital access the most."
              />
            </div>
          </div>
        </section>

        {/* FOCUS */}
        <section id="focus" className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-gray-900">Our Focus Areas</h2>
            <p className="mt-6 text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We concentrate our efforts on key areas that drive meaningful change in digital accessibility and inclusion.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-4">
              <FocusItem
                icon={<Accessibility className="w-6 h-6 text-[#8A4DFF]" />}
                title="Accessibility"
                text="Creating digital experiences that work for everyone."
              />
              <FocusItem
                icon={<Network className="w-6 h-6 text-[#8A4DFF]" />}
                title="Community-led Design"
                text="Involving communities in the design process."
              />
              <FocusItem
                icon={<GitBranch className="w-6 h-6 text-[#8A4DFF]" />}
                title="Open Source"
                text="Building transparent, collaborative solutions."
              />
              <FocusItem
                icon={<Globe className="w-6 h-6 text-[#8A4DFF]" />}
                title="Digital Inclusion"
                text="Bridging the digital divide."
              />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-[#F5F2FF]">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-gray-900">Get in Touch</h2>
            <p className="mt-6 text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Want to support the mission, propose a collaboration, or simply say hi?
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <InfoCard icon={<Mail className="w-5 h-5 text-[#8A4DFF]" />} title="Contact Information">
                <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                  <p>
                    Email:{" "}
                    <a className="text-[#6D28D9] font-semibold hover:underline" href="mailto:hello@herwebimpact.org.uk">
                      hello@herwebimpact.org.uk
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Based in Cardiff, Wales, UK
                  </p>
                </div>
              </InfoCard>

              <InfoCard icon={<Handshake className="w-5 h-5 text-[#8A4DFF]" />} title="Ways to Connect">
                <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-2">
                  <li>Collaborate on a digital inclusion project in your community</li>
                  <li>Share your lived experience to help shape our work</li>
                  <li>Help us test and improve new tools before they launch</li>
                </ul>
              </InfoCard>

              <InfoCard icon={<Monitor className="w-5 h-5 text-[#8A4DFF]" />} title="Send us an Email">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Prefer to reach out directly? We’d love to hear from you.
                </p>
                <div className="mt-5">
                  <Link
                    href="mailto:hello@herwebimpact.org.uk"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#7C3AED] transition-colors"
                  >
                    Email Us
                  </Link>
                </div>
              </InfoCard>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-10 text-center text-sm text-gray-600">
            <p className="font-semibold text-gray-800">© {new Date().getFullYear()} Her Web Impact CIC. All rights reserved.</p>
            <p className="mt-2">Digital tools made with communities, not just for them.</p>
            <div className="mt-6 text-xs text-gray-500 leading-relaxed">
              <p>Registered in England & Wales as a Community Interest Company. Company No. 16524652.</p>
              <p>Registered Office: 37 Ninian Park Road, Riverside, Cardiff, South Glamorgan, Wales, UK.</p>
              <p className="mt-3 italic">
                Her Web Impact CIC exists to support digital inclusion and accessibility through community-designed technology.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function Card({ title, text, icon }: { title: string; text: string; icon: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-[#B86BFF]/20 shadow-sm p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F3E9FF] flex items-center justify-center">{icon}</div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <p className="mt-4 text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  )
}

function FocusItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-[#F3E9FF] flex items-center justify-center">{icon}</div>
      <div className="mt-4 font-bold text-gray-900">{title}</div>
      <div className="mt-2 text-sm text-gray-700 leading-relaxed">{text}</div>
    </div>
  )
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-[#B86BFF]/20 shadow-sm p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F3E9FF] flex items-center justify-center">{icon}</div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}






