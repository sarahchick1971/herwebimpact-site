"use server"

import { Resend } from "resend"
import { headers } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)

// In-memory rate limit: max 3 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return true
  }

  if (entry.count >= 3) return false
  entry.count++
  return true
}

const messages = {
  en: {
    missing: "Please fill in all fields.",
    email: "Please enter a valid email address.",
    short: "Your message is a little short — please tell us more.",
    rate: "Too many messages sent. Please wait a while before trying again.",
    failed: "Something went wrong. Please email us directly at hello@herwebimpact.org.uk",
  },
  // Welsh to be checked by a Welsh speaker
  cy: {
    missing: "Llenwch bob maes, os gwelwch yn dda.",
    email: "Rhowch gyfeiriad e-bost dilys, os gwelwch yn dda.",
    short: "Mae eich neges braidd yn fyr. Dywedwch ragor wrthym, os gwelwch yn dda.",
    rate: "Mae gormod o negeseuon wedi'u hanfon. Arhoswch ychydig cyn rhoi cynnig arall arni.",
    failed: "Aeth rhywbeth o'i le. Anfonwch e-bost atom yn uniongyrchol: hello@herwebimpact.org.uk",
  },
}

export async function sendContactEmail(data: {
  name: string
  email: string
  message: string
  honeypot: string
  lang?: "en" | "cy"
}) {
  const m = messages[data.lang === "cy" ? "cy" : "en"]
  // Honeypot: bots fill hidden fields — silently pretend success
  if (data.honeypot) {
    return { success: true }
  }

  // Basic validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return { success: false, error: m.missing }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: m.email }
  }

  if (data.message.trim().length < 10) {
    return { success: false, error: m.short }
  }

  // Rate limiting by IP
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"

  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error: m.rate,
    }
  }

  try {
    await resend.emails.send({
      from: "Her Web Impact Website <noreply@herwebimpact.org.uk>",
      to: "hello@herwebimpact.org.uk",
      replyTo: data.email,
      subject: `New enquiry from ${data.name}`,
      text: [
        "You have a new enquiry from the Her Web Impact website.",
        "",
        `Name:    ${data.name}`,
        `Email:   ${data.email}`,
        "",
        "Message:",
        data.message,
        "",
        "---",
        `Reply directly to this email to respond to ${data.name}.`,
      ].join("\n"),
    })

    return { success: true }
  } catch (err) {
    console.error("Resend error:", err)
    return {
      success: false,
      error: m.failed,
    }
  }
}
