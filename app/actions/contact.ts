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

export async function sendContactEmail(data: {
  name: string
  email: string
  message: string
  honeypot: string
}) {
  // Honeypot: bots fill hidden fields — silently pretend success
  if (data.honeypot) {
    return { success: true }
  }

  // Basic validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return { success: false, error: "Please fill in all fields." }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  if (data.message.trim().length < 10) {
    return { success: false, error: "Your message is a little short — please tell us more." }
  }

  // Rate limiting by IP
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"

  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error: "Too many messages sent. Please wait a while before trying again.",
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
      error: "Something went wrong. Please email us directly at hello@herwebimpact.org.uk",
    }
  }
}
