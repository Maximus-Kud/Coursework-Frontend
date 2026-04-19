export default function parseError(e: any): string {
  if (!e) {
    return "Unknown error";
  }

  if (typeof e === "string") {
    return e;
  }

  if (Array.isArray(e)) {
    return e
      .map(err => err?.description || err?.message || JSON.stringify(err))
      .filter(Boolean)
      .join(", ");
  }

  if (e.errors && typeof e.errors === "object") {
    return Object.values(e.errors)
      .flat()
      .join(", ");
  }

  if (e.message) return e.message;
  if (e.Message) return e.Message;

  if (e.detail) return e.detail;
  if (e.title) return e.title;

  try {
    return JSON.stringify(e);
  }
  catch {
    return "Unknown error";
  }
}