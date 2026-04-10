export default function parseError(e: any): string {
  if (e?.errors) {
    return Object.values(e.errors).flat().join(", ");
  }

  if (Array.isArray(e)) {
    return e.map(err => err.description).join(", ");
  }

  if (e?.title) {
    return e.title;
  }

  return "Unknown error";
}