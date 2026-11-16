# ME 332 — Heat Transfer Study Site

A simple static study website for ME 332 (Heat Transfer) at Oregon State. Plain HTML/CSS/JS — no build step.

## View it online (GitHub Pages)

1. Go to **Settings → Pages** in this repo.
2. Under *Build and deployment*, set **Source** to "Deploy from a branch", branch **main**, folder **/ (root)**.
3. Save. After a minute the site will be live at `https://markus-falconer.github.io/ME-332/`.

To view locally, just open `index.html` in a browser.

## Structure

```
index.html            Home page (topic cards are generated automatically)
assets/css/style.css  Shared styles (light/dark theme, cards, callouts, problems)
assets/js/site.js     Page list, sidebar nav, theme toggle, LaTeX rendering
pages/_template.html  Copy this to make a new page
pages/*.html          One page per chapter/topic
```

## Adding a page

1. Copy `pages/_template.html` to `pages/<id>.html` and replace the `{{ID}}`, `{{TITLE}}`, `{{SUBTITLE}}` placeholders.
2. Add an entry to the `PAGES` array at the top of `assets/js/site.js`.

The sidebar and home page pick it up automatically.

## Writing content

- **Math:** write LaTeX inline with `$...$` or as a block with `$$...$$` (rendered by KaTeX).
- **Equation box:** `<div class="eq"><div class="label">Name</div>$$...$$</div>`
- **Callout:** `<div class="callout"><strong>Tip</strong> text…</div>`
- **Practice problem with hidden solution:**
  ```html
  <details class="problem">
    <summary>Problem 1 — Title</summary>
    <p>Statement…</p>
    <div class="solution"><p>Solution…</p></div>
  </details>
  ```
