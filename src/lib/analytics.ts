export type EventMetadata = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, metadata: EventMetadata = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = { ...metadata };
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;

  if (gtag) {
    gtag("event", eventName, payload);
  }
}
