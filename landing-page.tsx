"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import type { FormEvent, ReactNode } from "react"
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
  Phone,
  Handshake,
  Menu,
  X,
  Quote,
  Send,
  Heart,
  ArrowUp,
} from "lucide-react"
import { translations, type Lang } from "@/lib/translations"
import { sendContactEmail } from "@/app/actions/contact"

function Circle({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[#B86BFF]/20 blur-[0.2px] ${className}`}
    />
  )
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("en")
  const [menu, setMenu] = useState(false)
  const [pressedItem, setPressedItem] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", email: "", message: "", honeypot: "" })
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [langAnnouncement, setLangAnnouncement] = useState("")
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLButtonElement>(null)
  const successHeadingRef = useRef<HTMLParagraphElement>(null)
  const topHeadingRef = useRef<HTMLHeadingElement>(null)
  const pendingFocusId = useRef<string | null>(null)
  const desktopNavRef = useRef<HTMLDivElement>(null)

  const t = translations[lang]

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === "cy" ? "cy" : "en"
  }, [lang])

  useEffect(() => {
    if (!menu && pendingFocusId.current) {
      const el = document.getElementById(pendingFocusId.current)
      pendingFocusId.current = null
      if (el) {
        el.setAttribute("tabindex", "-1")
        el.focus({ preventScroll: true })
      }
      return
    }
    if (!menu) return
    firstMenuItemRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [menu])

  // Keep focused and scrolled-to content clear of the fixed desktop nav,
  // even when the nav wraps onto more lines because text has been enlarged
  useEffect(() => {
    const nav = desktopNavRef.current
    if (!nav) return
    const update = () => {
      const r = nav.getBoundingClientRect()
      const offset = r.height > 0 ? Math.ceil(r.bottom + 16) : 16
      document.documentElement.style.scrollPaddingTop = `${offset}px`
      document.documentElement.style.scrollPaddingBottom = "16px"
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(nav)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  // Close the mobile menu if the window grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const onChange = () => mq.matches && setMenu(false)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (sent) successHeadingRef.current?.focus()
  }, [sent])

  const navItems = useMemo(
    () => [
      { id: "about",     label: t.nav.about },
      { id: "workshop",  label: t.nav.workshop },
      { id: "what-we-do", label: t.nav.whatWeDo },
      { id: "focus",     label: t.nav.ourPrinciples },
      { id: "voices",    label: t.nav.voices },
      { id: "contact",   label: t.nav.contact },
    ],
    [t]
  )

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setMenu(false)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const offset = parseFloat(document.documentElement.style.scrollPaddingTop) || 96
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" })
    // Move keyboard and screen-reader focus to the section that was chosen.
    // If the mobile menu is open, wait until it has closed (the page is inert until then).
    if (menu) {
      pendingFocusId.current = id
    } else {
      el.setAttribute("tabindex", "-1")
      el.focus({ preventScroll: true })
    }
  }

  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
    topHeadingRef.current?.focus({ preventScroll: true })
  }

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "cy" : "en"
    setLang(next)
    setLangAnnouncement(translations[next].a11y.langChanged)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    startTransition(async () => {
      const result = await sendContactEmail({
        name: form.name,
        email: form.email,
        message: form.message,
        honeypot: form.honeypot,
        lang,
      })
      if (result.success) {
        setSent(true)
      } else {
        setFormError(result.error ?? t.a11y.formError)
      }
    })
  }

  const renderLangToggle = (mobile?: boolean) => (
    <button
      type="button"
      onClick={toggleLang}
      className={
        mobile
          ? "rounded-full border-2 border-[#B86BFF] bg-white px-5 py-2 text-sm font-bold text-gray-900 hover:bg-[#F3E9FF] transition-colors"
          : "rounded-full border-2 border-[#B86BFF] px-3 py-1 text-xs font-bold text-[#6D28D9] hover:bg-[#F3E9FF] transition-colors"
      }
    >
      <span lang={lang === "en" ? "cy" : "en"}>{t.langButton}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Skip to main content (not offered while the mobile menu dialog is open) */}
      {!menu && (
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-full focus:bg-[#7C3AED] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t.a11y.skip}
      </a>
      )}

      {/* live region announcing language changes */}
      <p className="sr-only" aria-live="polite">{langAnnouncement}</p>

      {/* decorative circles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Circle className="w-20 h-20 top-14 left-10" />
      <Circle className="w-10 h-10 top-40 right-20" />
      <Circle className="w-14 h-14 top-[520px] left-[55%]" />
      <Circle className="w-24 h-24 top-[760px] right-16" />
      <Circle className="w-16 h-16 top-[1180px] left-16" />
      <Circle className="w-28 h-28 top-[1650px] right-[12%]" />
      <Circle className="w-20 h-20 top-[2200px] left-[70%]" />
      <Circle className="w-24 h-24 top-[2780px] right-[18%]" />
      </div>

      <header>
      {/* DESKTOP PILL NAV */}
      <div ref={desktopNavRef} className="hidden lg:flex fixed top-3 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100vw-2rem)]" inert={menu}>
        <div className="rounded-3xl border-2 border-[#B86BFF] bg-white/90 backdrop-blur-md shadow-lg px-6 py-3">
          <nav aria-label={t.a11y.menuLabel} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-semibold text-gray-900 hover:text-[#6D28D9] focus:text-[#6D28D9] transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
            {renderLangToggle()}
          </nav>
        </div>
      </div>

      {/* MOBILE BURGER */}
      <div className="lg:hidden fixed top-6 right-6 z-50">
        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => setMenu((v) => !v)}
          className="h-12 w-12 rounded-full bg-white border-2 border-[#B86BFF] shadow-lg flex items-center justify-center hover:bg-[#F3E9FF] transition-colors"
          aria-label={menu ? t.a11y.closeMenu : t.a11y.openMenu}
        >
          {menu ? (
            <X className="h-5 w-5 text-gray-900" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5 text-gray-900" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      {menu && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.a11y.menuLabel}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md lg:hidden overflow-y-auto"
        >
          <div className="relative h-full w-full flex items-center justify-center px-6">
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
            <div className="relative z-10 w-full max-w-sm text-center">
              <nav aria-label={t.a11y.menuLabel} className="space-y-8">
                {navItems.map((item, i) => (
                  <button
                    key={item.id}
                    ref={i === 0 ? firstMenuItemRef : undefined}
                    onClick={() => scrollTo(item.id)}
                    onPointerDown={() => setPressedItem(item.id)}
                    onPointerUp={() => setPressedItem(null)}
                    onPointerCancel={() => setPressedItem(null)}
                    onBlur={() => setPressedItem(null)}
                    className={[
                      "w-full text-2xl font-semibold tracking-tight transition-colors",
                      pressedItem === item.id ? "text-[#6D28D9]" : "text-gray-900",
                      "hover:text-[#6D28D9] focus:text-[#6D28D9]",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="mt-10">
                {renderLangToggle(true)}
              </div>
            </div>
          </div>
        </div>
      )}
      </header>

      <main id="main-content" className="relative" inert={menu}>
        {/* HERO */}
        <section className="pt-16 md:pt-18 pb-8">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col items-center text-center">
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

              <h1 ref={topHeadingRef} tabIndex={-1} className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                {t.hero.tagline}
              </h1>

              <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-full bg-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6D28D9] transition-colors"
                >
                  {t.hero.getInTouch}
                </button>
                <button
                  onClick={() => scrollTo("workshop")}
                  className="rounded-full border border-[#B86BFF]/50 bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-[#F3E9FF] transition-colors"
                >
                  {t.hero.ourWork}
                </button>
              </div>
            </div>

            {/* NATIONAL LOTTERY BANNER */}
            <div className="mt-8">
              <div className="rounded-2xl border border-[#B86BFF]/25 bg-[#F5EDFF] px-4 py-4 md:px-6 md:py-4 flex flex-col lg:flex-row items-center gap-4 shadow-sm">
                <Image
                  src="/images/tnlcf-full-colour-cy.png"
                  alt="The National Lottery Community Fund (Cymru)"
                  width={150}
                  height={150}
                  className="flex-shrink-0 max-w-full h-auto"
                />
                <div className="flex-1 min-w-0 text-center lg:text-left">
                  <p className="font-semibold text-gray-900">{t.lottery.heading}</p>
                  <p className="text-gray-700 mt-1 leading-relaxed">{t.lottery.description}</p>
                </div>
                <button
                  onClick={() => scrollTo("workshop")}
                  className="rounded-full bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6D28D9] transition-colors text-center"
                >
                  {t.lottery.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT — purple band */}
        <section id="about" className="relative">
          <div className="bg-[#6D4ED9]">
            <div className="mx-auto max-w-5xl px-4 py-16 md:py-20 text-center text-white relative">
              <div className="text-sm font-semibold tracking-widest uppercase">{t.about.label}</div>

              <h2 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
                {t.about.heading}
              </h2>

              <p className="mt-6 max-w-3xl mx-auto text-white text-base md:text-lg leading-relaxed">
                {t.about.description}
              </p>

              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto text-sm md:text-base">
                {t.about.pillars.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white h-16" />
        </section>

        {/* OUR STORY */}
        <section id="our-story" className="bg-white">
          <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="text-sm font-semibold text-[#6D28D9] tracking-widest uppercase mb-2">{t.story.label}</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {t.story.heading}
                </h2>
                <p className="mt-5 text-gray-700 leading-relaxed">{t.story.p1}</p>
                <p className="mt-4 text-gray-700 leading-relaxed">{t.story.p2}</p>
                <p className="mt-4 text-gray-700 leading-relaxed">{t.story.p3}</p>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="/images/IMG_1256.jpg"
                  alt="Participants working on laptops during a Her Web Impact digital skills workshop"
                  width={600}
                  height={450}
                  className="rounded-2xl object-cover w-full h-72 md:h-96 shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WORKSHOP */}
        <section id="workshop" className="bg-[#EEE7FF]">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">

            <div className="text-center mb-10">
              <div className="text-sm font-semibold text-[#6D28D9] tracking-widest uppercase">{t.workshop.label}</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">{t.workshop.sectionHeading}</h2>
            </div>

            {/* Coming soon */}
            <div className="rounded-2xl bg-white border-2 border-[#B86BFF]/40 shadow-md overflow-hidden">
              <div className="bg-[#6D4ED9] px-6 py-5">
                <span className="inline-block rounded-full bg-white text-[#6D28D9] text-xs font-extrabold px-3 py-1 mb-3 tracking-wide">
                  {t.workshop.comingSoonBadge}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {t.workshop.comingSoonHeading}
                </h3>
              </div>
              <div className="px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-700 text-sm leading-relaxed max-w-lg">{t.workshop.comingSoonBody}</p>
                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-full bg-[#7C3AED] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#6D28D9] transition-colors text-center"
                >
                  {t.workshop.comingSoonCta}
                </button>
              </div>
            </div>

            {/* Previous workshops */}
            <div className="mt-6 rounded-2xl bg-gray-50 border-2 border-gray-200 overflow-hidden">
              <div className="bg-gray-300 px-6 py-5">
                <span className="inline-block rounded-full bg-white text-gray-600 text-xs font-extrabold px-3 py-1 mb-2 tracking-wide">
                  {t.workshop.previousBadge}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-700 leading-tight">
                  {t.workshop.previousHeading}
                </h3>
              </div>
              <div className="px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{t.workshop.previousVenues}</p>
                  <p>{t.workshop.previousDates}</p>
                  <p className="italic">{t.workshop.previousFunded}</p>
                </div>
                <a
                  href="/gallery"
                  className="rounded-full bg-[#7C3AED] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#6D28D9] transition-colors text-center"
                >
                  {t.workshop.previousCta}
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what-we-do" className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
            <div className="text-center">
              <div className="text-sm font-semibold text-[#6D28D9] tracking-widest uppercase">{t.whatWeDo.label}</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
                {t.whatWeDo.heading}
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card title={t.whatWeDo.cards[0].title} icon={<Users className="w-5 h-5 text-[#8A4DFF]" />} text={t.whatWeDo.cards[0].text} />
              <Card title={t.whatWeDo.cards[1].title} icon={<Accessibility className="w-5 h-5 text-[#8A4DFF]" />} text={t.whatWeDo.cards[1].text} />
              <Card title={t.whatWeDo.cards[2].title} icon={<Sparkles className="w-5 h-5 text-[#8A4DFF]" />} text={t.whatWeDo.cards[2].text} />
              <Card title={t.whatWeDo.cards[3].title} icon={<HeartHandshake className="w-5 h-5 text-[#8A4DFF]" />} text={t.whatWeDo.cards[3].text} />
            </div>
          </div>
        </section>

        {/* OUR PRINCIPLES */}
        <section id="focus" className="bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">{t.principles.heading}</h2>
              <p className="mt-4 text-lg text-gray-700">{t.principles.description}</p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FocusItem icon={<Accessibility className="w-6 h-6 text-[#8A4DFF]" />} title={t.principles.items[0].title} text={t.principles.items[0].text} />
              <FocusItem icon={<Network className="w-6 h-6 text-[#8A4DFF]" />} title={t.principles.items[1].title} text={t.principles.items[1].text} />
              <FocusItem icon={<GitBranch className="w-6 h-6 text-[#8A4DFF]" />} title={t.principles.items[2].title} text={t.principles.items[2].text} />
              <FocusItem icon={<Globe className="w-6 h-6 text-[#8A4DFF]" />} title={t.principles.items[3].title} text={t.principles.items[3].text} />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="voices" className="bg-[#F5EDFF]">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
            <div className="text-center">
              <div className="text-sm font-semibold text-[#6D28D9] tracking-widest uppercase">{t.voices.label}</div>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
                {t.voices.heading}
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {t.voices.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl lg:text-5xl font-extrabold text-[#7C3AED]">{stat.number}</p>
                  <p className="mt-2 text-xs md:text-sm text-gray-600 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {t.voices.testimonials.map((item, i) => (
                <Testimonial key={i} quote={item.quote} name={item.name} detail={item.detail} />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
            <div className="text-center mb-2">
              <div className="text-sm font-semibold text-[#6D28D9] tracking-widest uppercase">{t.contact.label}</div>
            </div>
            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-gray-900">
              {t.contact.heading}
            </h2>
            <p className="mt-6 text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t.contact.description}
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {/* Contact info */}
              <div className="space-y-6">
                <InfoCard icon={<Mail className="w-5 h-5 text-[#8A4DFF]" />} title={t.contact.infoTitle}>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                    <p>
                      {t.contact.emailLabel}{" "}
                      <a className="text-[#6D28D9] font-semibold hover:underline [overflow-wrap:anywhere]" href="mailto:hello@herwebimpact.org.uk">
                        hello@herwebimpact.org.uk
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <a className="text-[#6D28D9] font-semibold hover:underline" href="tel:07482501775">
                        07482 501 775
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      {t.contact.location}
                    </p>
                  </div>
                </InfoCard>

                <InfoCard icon={<Handshake className="w-5 h-5 text-[#8A4DFF]" />} title={t.contact.waysTitle}>
                  <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-2">
                    {t.contact.ways.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </InfoCard>
              </div>

              {/* Contact form */}
              <div className="rounded-2xl bg-white border border-[#B86BFF]/20 shadow-sm p-6">
                <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#F3E9FF] flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-[#8A4DFF]" />
                  </div>
                  <h3 className="min-w-0 text-lg font-bold text-gray-900">{t.contact.formTitle}</h3>
                </div>

                {sent ? (
                  <div className="text-center py-8" role="status">
                    <div className="w-12 h-12 rounded-full bg-[#F3E9FF] flex items-center justify-center mx-auto">
                      <Heart className="w-6 h-6 text-[#8A4DFF]" aria-hidden="true" />
                    </div>
                    <p ref={successHeadingRef} tabIndex={-1} className="mt-4 font-semibold text-gray-900">{t.contact.successHeading}</p>
                    <p className="mt-2 text-sm text-gray-600">{t.contact.successBody}</p>
                    <button
                      onClick={() => {
                        setForm({ name: "", email: "", message: "", honeypot: "" })
                        setSent(false)
                        setFormError(null)
                        setTimeout(() => document.getElementById("name")?.focus(), 0)
                      }}
                      type="button"
                      className="mt-4 text-sm text-[#6D28D9] font-semibold underline-offset-4 hover:underline"
                    >
                      {t.contact.successAgain}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot — hidden from real users, catches bots */}
                    <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] overflow-hidden">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.honeypot}
                        onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.contact.nameLabel} <span aria-hidden="true" className="text-red-700">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-required="true"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full rounded-xl border border-gray-500 px-4 py-2.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9]"
                        placeholder={t.contact.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.contact.emailFieldLabel} <span aria-hidden="true" className="text-red-700">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-required="true"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-xl border border-gray-500 px-4 py-2.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9]"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.contact.messageLabel} <span aria-hidden="true" className="text-red-700">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        aria-required="true"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full rounded-xl border border-gray-500 px-4 py-2.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] resize-none"
                        placeholder={t.contact.messagePlaceholder}
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-2.5">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#6D28D9] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isPending ? t.contact.sending : t.contact.send}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

        {/* FOOTER */}
        <footer className="bg-[#6D4ED9]" inert={menu}>
          <div className="mx-auto max-w-5xl px-4 pt-12 pb-10">

            {/* Main footer grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

              {/* Col 1 — logo + tagline + socials */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <button
                  type="button"
                  onClick={backToTop}
                  aria-label={t.a11y.backToTop}
                  className="rounded-md"
                >
                  <Image
                    src="/images/her-web-impact-logo.png"
                    alt="Her Web Impact"
                    width={240}
                    height={120}
                    className="h-auto w-[180px] hover:opacity-80 transition-opacity"
                  />
                </button>
                <p className="text-sm text-white leading-relaxed text-center md:text-left">
                  {t.footer.tagline}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61571986775664"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.a11y.facebook}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/herwebimpactcic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.a11y.instagram}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/her-web-impact-cic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.a11y.linkedin}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Col 2 — navigate */}
              <div className="text-center md:text-left">
                <h4 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
                  {t.footer.navigateLabel}
                </h4>
                <ul className="space-y-3 text-sm text-white">
                  {t.footer.navItems.map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={() => scrollTo(item.id)} className="underline-offset-4 hover:underline transition-colors">
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 — contact */}
              <div className="text-center md:text-left">
                <h4 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
                  {t.footer.contactLabel}
                </h4>
                <ul className="space-y-3 text-sm text-white">
                  <li>
                    <a href="mailto:hello@herwebimpact.org.uk" className="[overflow-wrap:anywhere] underline-offset-4 hover:underline transition-colors">
                      hello@herwebimpact.org.uk
                    </a>
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-4 h-4 flex-shrink-0 text-white" aria-hidden="true" />
                    <a href="tel:07482501775" className="underline-offset-4 hover:underline transition-colors">
                      07482 501 775
                    </a>
                  </li>
                  <li className="flex items-start gap-2 justify-center md:justify-start">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" aria-hidden="true" />
                    <span>{t.footer.location}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Legal row */}
            <div className="border-t border-white/40 mt-10 pt-6 text-xs text-white leading-loose">
              <p>{t.footer.legal1}</p>
              <p className="mt-1">{t.footer.legal2}</p>
            </div>

          </div>
        </footer>
        {/* Floating scroll-to-top button */}
        <button
          type="button"
          onClick={backToTop}
          aria-label={t.a11y.backToTop}
          aria-hidden={!showScrollTop}
          tabIndex={showScrollTop ? 0 : -1}
          inert={menu || !showScrollTop}
          className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#7C3AED] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#6D28D9] focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 ${
            showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 translate-y-4 pointer-events-none invisible"
          }`}
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
    </div>
  )
}

function Card({ title, text, icon }: { title: string; text: string; icon: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-[#B86BFF]/20 shadow-sm p-6">
      <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#F3E9FF] flex items-center justify-center">{icon}</div>
        <h3 className="min-w-0 text-lg font-bold text-gray-900 [overflow-wrap:anywhere] sm:[overflow-wrap:break-word]">{title}</h3>
      </div>
      <p className="mt-4 text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  )
}

function FocusItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-[#F3E9FF] flex items-center justify-center">{icon}</div>
      <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  )
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-[#B86BFF]/20 shadow-sm p-6">
      <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#F3E9FF] flex items-center justify-center">{icon}</div>
        <h3 className="min-w-0 text-lg font-bold text-gray-900 [overflow-wrap:anywhere] sm:[overflow-wrap:break-word]">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Testimonial({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#B86BFF]/20 shadow-sm p-6 flex flex-col">
      <Quote className="w-5 h-5 text-[#B86BFF] mb-3 flex-shrink-0" />
      <p className="text-sm text-gray-700 leading-relaxed italic flex-1">{quote}</p>
      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
    </div>
  )
}
