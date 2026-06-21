"use server";

import { sanitizeText, validateEmail, validatePhone } from "@/lib/security";

export type ContactState = { ok: boolean; message: string };

// Einfaches In-Memory-Rate-Limit (Best-Effort; in Serverless je Instanz).
const hits = new Map<string, number[]>();
function rateLimit(id: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(id) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) return false;
  arr.push(now);
  hits.set(id, arr);
  return true;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1. Honeypot – von Menschen unsichtbares Feld
  if (sanitizeText(formData.get("website"))) {
    return { ok: false, message: "Übermittlung abgelehnt." };
  }

  // 2. Rate-Limit (best effort)
  if (!rateLimit("contact")) {
    return { ok: false, message: "Zu viele Anfragen. Bitte versuche es später erneut." };
  }

  // 3. Sanitize + validieren
  const name = sanitizeText(formData.get("name"));
  const email = sanitizeText(formData.get("email")).toLowerCase();
  const phone = sanitizeText(formData.get("phone"));
  const message = sanitizeText(formData.get("message"));
  const consent = formData.get("consent");

  if (name.length < 2) return { ok: false, message: "Bitte gib deinen Namen an." };
  if (!validateEmail(email)) return { ok: false, message: "Bitte gib eine gültige E-Mail-Adresse an." };
  if (!validatePhone(phone)) return { ok: false, message: "Die Telefonnummer sieht nicht gültig aus." };
  if (message.length < 5) return { ok: false, message: "Bitte schreib uns kurz dein Anliegen." };
  if (!consent) return { ok: false, message: "Bitte stimme der Datenschutzerklärung zu." };

  // TODO: Versand anbinden (z. B. Resend/SMTP) oder StudioBookr. Aktuell nur
  // serverseitige Verarbeitung + Log – keine Speicherung personenbezogener Daten.
  console.log("Neue Kontaktanfrage:", { name, emailDomain: email.split("@")[1] });

  return { ok: true, message: "Danke! Wir haben deine Nachricht erhalten und melden uns schnellstmöglich." };
}
