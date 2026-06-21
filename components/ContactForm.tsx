"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30 transition-colors hover:bg-walnut disabled:opacity-60"
    >
      {pending ? "Wird gesendet…" : "Nachricht senden"}
    </button>
  );
}

const fieldCls =
  "w-full rounded-2xl border border-walnut/15 bg-cream px-4 py-3 text-walnut outline-none transition-colors placeholder:text-walnut/40 focus:border-terracotta";

export default function ContactForm() {
  const [state, action] = useFormState(submitContact, initial);

  return (
    <form action={action} className="space-y-4">
      {/* Honeypot – für Menschen unsichtbar */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className={fieldCls} />
        <input name="email" type="email" required placeholder="E-Mail" className={fieldCls} />
      </div>
      <input name="phone" placeholder="Telefon (optional)" className={fieldCls} />
      <textarea name="message" required rows={4} placeholder="Deine Nachricht / dein Terminwunsch" className={fieldCls} />

      <label className="flex items-start gap-3 text-sm text-walnut/70">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-terracotta" />
        <span>
          Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden.{" "}
          <Link href="/datenschutz" className="underline hover:text-terracotta">Datenschutzerklärung</Link>.
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        {state.message && (
          <p className={`text-sm ${state.ok ? "text-emerald-700" : "text-terracotta"}`} role="status">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
