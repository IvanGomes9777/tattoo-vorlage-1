"use client";

import type { ComponentPropsWithoutRef } from "react";
import { openConsentSettings } from "@/components/consent/consent";

/**
 * Öffnet das Consent-Banner erneut – DSGVO verlangt, dass die Einwilligung
 * jederzeit widerrufbar/änderbar ist. Optisch wie die übrigen Footer-Links;
 * reicht zusätzliche Props (z. B. data-reveal-item, style) durch.
 */
export function CookieSettingsButton(
  props: Omit<ComponentPropsWithoutRef<"button">, "onClick" | "type">
) {
  return (
    <button type="button" onClick={openConsentSettings} {...props}>
      Cookie-Einstellungen
    </button>
  );
}
