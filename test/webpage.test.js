import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'

const path = (rel) => fileURLToPath(new URL(rel, import.meta.url))
const read = (rel) => readFileSync(path(rel), 'utf8')

const html = read('../src/index.html')
const scriptSource = (() => {
  try { return read('../src/script.js') } catch { return '' }
})()

// The page WITHOUT any JavaScript run: this is what the browser draws before the
// script gets a turn. Comparing against it is how we prove the text was written
// by the student's code and not typed into the HTML.
const staticDoc = new JSDOM(html).window.document

// The page WITH the student's script executed, exactly as a browser would.
// resources:'usable' lets jsdom fetch the linked src/script.js off disk.
const logged = []
const liveDom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: pathToFileURL(path('../src/index.html')).href,
  beforeParse (window) {
    window.console.log = (...args) => logged.push(args.join(' '))
  },
})
await new Promise((resolve) => {
  if (liveDom.window.document.readyState === 'complete') return resolve()
  liveDom.window.addEventListener('load', resolve)
  setTimeout(resolve, 3000)
})
const doc = liveDom.window.document

const textOf = (d, sel) => (d.querySelector(sel)?.textContent ?? '').trim()

// ---- Foundation ----
describe('Foundation - a valid HTML5 page', () => {
  it('has a doctype, <html lang>, a <head> with <title> + charset, and a <body>', () => {
    expect(staticDoc.doctype?.name?.toLowerCase(), 'Start the file with <!DOCTYPE html>').toBe('html')
    expect(staticDoc.documentElement.getAttribute('lang'), 'Set a language, e.g. <html lang="en">').toBeTruthy()
    expect(staticDoc.querySelector('head title'), 'Add a <title> inside <head>').not.toBeNull()
    expect(staticDoc.title.trim(), 'Put some text inside <title>').toBeTruthy()
    expect(staticDoc.querySelector('meta[charset]'), 'Add <meta charset="utf-8"> inside <head>').not.toBeNull()
    expect(staticDoc.body, 'Wrap your page content in a <body>').not.toBeNull()
  })
})

// ---- Linking the script ----
describe('Linking your JavaScript', () => {
  it('links an external script file with <script src="...">', () => {
    const linked = [...staticDoc.querySelectorAll('script[src]')]
    expect(linked.length, 'Link your JavaScript with <script src="script.js" defer></script>').toBeGreaterThan(0)
    const pointsAtScriptJs = linked.some((s) => /script\.js$/i.test(s.getAttribute('src').trim()))
    expect(pointsAtScriptJs, 'The <script> src should point at your script.js file').toBe(true)
  })

  it('keeps the JavaScript in script.js, not written inside the HTML', () => {
    const inline = [...staticDoc.querySelectorAll('script:not([src])')]
      .map((s) => s.textContent.trim())
      .filter(Boolean)
    expect(inline.length, 'Move your code out of the HTML and into src/script.js').toBe(0)
    expect(scriptSource.trim(), 'src/script.js is empty - your code goes in here').toBeTruthy()
  })
})

// ---- Variables ----
describe('Variables and text', () => {
  it('declares values with const or let (never var)', () => {
    const declares = /\b(const|let)\s+[A-Za-z_$][\w$]*\s*=/.test(scriptSource)
    expect(declares, 'Store the dish and the price in variables, e.g. const dish = "Pad Thai"').toBe(true)
    expect(/\bvar\s+[A-Za-z_$]/.test(scriptSource), 'Use const or let instead of the old var').toBe(false)
  })

  it('builds the sentence with a template literal', () => {
    const hasTemplateLiteral = /`[^`]*\$\{[^}]+\}[^`]*`/.test(scriptSource)
    expect(hasTemplateLiteral, 'Build the message with backticks and ${ }, e.g. `Today: ${dish}`').toBe(true)
  })
})

// ---- Writing to the page ----
describe('Writing into the page', () => {
  it('leaves the announcement empty in the HTML, so the text really comes from JavaScript', () => {
    const target = staticDoc.querySelector('#special')
    expect(target, 'Add an element with id="special" for the announcement').not.toBeNull()
    expect(target.textContent.trim(), 'Leave #special empty in the HTML - your script fills it in').toBe('')
  })

  it('fills #special in when the page loads', () => {
    const filled = textOf(doc, '#special')
    expect(filled, 'Set special.textContent from your script so the announcement appears').toBeTruthy()
    expect(filled.length, 'The announcement should be a sentence, not one or two characters').toBeGreaterThan(14)
  })

  it('announces both the dish and the price', () => {
    const filled = textOf(doc, '#special')
    expect(/[A-Za-z]{3,}/.test(filled), 'The announcement should name the dish').toBe(true)
    expect(/\d/.test(filled), 'The announcement should include the price').toBe(true)
  })
})

// ---- The console ----
describe('The console', () => {
  it('logs something with console.log when the page loads', () => {
    expect(logged.length, 'Add a console.log(...) so you can see your script running').toBeGreaterThan(0)
  })
})

// ---- Identity ----
describe('Student info (student.json)', () => {
  const info = JSON.parse(read('../student.json'))
  it('student.json is completely filled in', () => {
    for (const field of ['classCode', 'fullName', 'studentNumber', 'studentEmail', 'personalEmail', 'githubAccount']) {
      expect(info[field], `Set ${field} in student.json`).toBeTruthy()
    }
  })
})
