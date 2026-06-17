// Zero-dependency HTML templating: `{{token}}` replacement plus escaping
// helpers. Tokens carry already-finalized strings — the caller decides which
// are trusted HTML (inserted raw) and which are text (escaped before passing in).

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape text for use in HTML body or double-quoted attribute contexts. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

/** Alias for clarity at attribute call sites; same rules as escapeHtml. */
export function escapeAttr(value: string): string {
  return escapeHtml(value);
}

/**
 * Replace `{{ token }}` placeholders in a template string with values from
 * `tokens`. Unknown tokens render as empty strings so a template never leaks a
 * literal `{{foo}}` to the page.
 */
export function renderTemplate(template: string, tokens: Record<string, string>): string {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_match, key: string) =>
    Object.hasOwn(tokens, key) ? (tokens[key] ?? "") : "",
  );
}
