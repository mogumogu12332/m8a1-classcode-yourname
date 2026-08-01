# Module 8 - Activity 1 - Make the Page Talk

[![Made with Claude](https://img.shields.io/badge/Made_with-Claude-D97757?logo=anthropic&logoColor=white)](https://tjakoen.github.io/notes/ten-times-zero)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Your first JavaScript. The Curbside Thai page is **already built and styled** for
you, but the "Today's Special" line is deliberately **empty**. Your job is to fill
it in from code, so the sentence the visitor reads is built by your script when
the page loads.

You edit [`src/index.html`](src/index.html) (one line) and
[`src/script.js`](src/script.js). You do **not** need to touch the CSS.

## What to do

1. **Link your script.** In `src/index.html` there is a TODO comment in the
   `<head>`. Replace it with a `<script>` element that points at `script.js`.
   Remember `defer`, and remember there is no self-closing form.

2. **Store the special in variables.** In `src/script.js`, make a variable for the
   dish name and one for its price. Use `const` or `let`, never `var`.

3. **Build one sentence** out of those variables using a **template literal**:
   backticks and `${ }`. It must name the dish and include the price.

4. **Put it on the page.** Find the element with `id="special"` and set its
   `textContent` to your sentence.

5. **Log something** with `console.log(...)` so you can see in DevTools that your
   script ran.

6. **Fill in `student.json`** with your details (keep it identical to your other
   activities; the `classCode` must match your repo name).

```json
{
  "classCode": "1234",
  "fullName": "Juan Dela Cruz",
  "studentNumber": "2026-12345",
  "studentEmail": "juan.delacruz@hau.edu.ph",
  "personalEmail": "juan@example.com",
  "githubAccount": "juandelacruz"
}
```

> **Leave `#special` empty in the HTML.** If you type the sentence into the HTML
> as well, the autograder cannot tell whether your JavaScript did anything, and
> that check will fail. The empty element is the point.

## Reference

The module reference is in the course content: **Module 8 - JavaScript Basics**
(`JavaScript-Basics-Reference.md`) - the `<script>` element and where to put it,
`const` and `let`, template literals, `document.querySelector`, `textContent`,
and `console.log`.

## Running the tests

```bash
npm install
npm test
```

The autograder is **10 checks** (1 point each):

- the page is valid HTML5
- an external `script.js` is linked with `<script src="...">`
- the JavaScript lives in `script.js`, not inside the HTML
- values are stored with `const` or `let` (and not `var`)
- the sentence is built with a template literal
- `#special` is left empty in the HTML
- `#special` is filled in when the page loads
- the announcement names the dish
- the announcement includes the price
- `student.json` is completely filled in

## Set up your repo

1. **Create from the template** - *Use this template -> Create a new repository*.
2. **Owner = the `HAU-6INTROWEB` course org.**
3. **Name it** `m8a1-<classcode>-yourname`. The `<classcode>` must match
   `student.json`.
4. **Make it Private.**

```bash
git clone https://github.com/HAU-6INTROWEB/m8a1-<classcode>-yourname.git
cd m8a1-<classcode>-yourname
```

## Confirm your submission

When your tests pass locally, **commit and push**:

```bash
git add -A
git commit -m "Today's special announced from JavaScript"
git push
```

Pushing triggers the **Autograde** workflow. Open the **Actions** tab, then the
latest **Autograde** run, and confirm the green check and the "10 / 10 tests
passed" summary.

## Work in a Codespace (recommended)

A **Codespace** is a complete dev environment that runs in the cloud, so you do
not have to install anything on your own laptop. This repo is already configured:
open a Codespace and everything you need is ready.

**Open one:** click the green **Code** button -> **Codespaces** tab -> **Create
codespace on main**. The first launch takes a minute; after that it is instant.

**Use it in VS Code (recommended).** Install the **GitHub Codespaces** extension
in VS Code, or from the running Codespace click the menu -> **Open in VS Code
Desktop**. Same environment, your own editor.

### Make your free hours last (please read)
Your GitHub Education account includes a generous but limited monthly Codespaces
allowance. Three habits keep you from wasting it:

1. **Set your idle timeout to 10 minutes.** Go to
   **github.com/settings/codespaces -> Default idle timeout -> 10 minutes ->
   Save.** This makes a Codespace auto-stop after 10 idle minutes.
2. **Stop it when you finish - do not just close the tab.** Stop it at
   **github.com/codespaces -> ... -> Stop codespace**, or run *Codespaces: Stop
   Current Codespace* from the Command Palette.
3. **Delete the Codespace once you have submitted.** After your final push:
   **github.com/codespaces -> ... -> Delete.** You can recreate it later from the
   green **Code** button.

---
📚 **These materials were authored by [tjakoen](https://github.com/tjakoen), built with Claude.** I use AI in the open, and I expect you to use it to learn the material, not to skip the learning. [How I actually work with AI ->](https://tjakoen.github.io/notes/ten-times-zero)
