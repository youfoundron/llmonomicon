import assert from "node:assert/strict";
import { test } from "node:test";
import { escapeHtml, renderTemplate } from "../scripts/template.ts";

test("escapeHtml escapes the five special characters", () => {
  assert.equal(
    escapeHtml(`<a href="x">'&'</a>`),
    "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;",
  );
});

test("renderTemplate replaces tokens (with and without inner whitespace)", () => {
  assert.equal(renderTemplate("Hi {{name}}!", { name: "Ada" }), "Hi Ada!");
  assert.equal(renderTemplate("{{ a }}-{{b}}", { a: "1", b: "2" }), "1-2");
});

test("an unknown token renders as empty (never leaks {{...}})", () => {
  assert.equal(renderTemplate("x{{missing}}y", {}), "xy");
});

test("an injection payload in a text token is neutralized once escaped", () => {
  const evil = "</title><script>alert(1)</script>";
  const out = renderTemplate("<title>{{title}}</title>", { title: escapeHtml(evil) });
  assert.ok(!out.includes("<script>"));
  assert.ok(out.includes("&lt;script&gt;"));
});
