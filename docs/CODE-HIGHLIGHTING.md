# Code highlighting

Native Notes includes code highlighting, editable headers, Copy controls, and per-block display options. Language definitions are bundled for offline use, and code colors follow your selected preset.

## Write a code block

Add a language after the opening fence. A filename is optional:

````markdown
```js title="greeting.js"
const greeting = "Hello, notes!";
console.log(greeting);
```
````

Rendered blocks in Live Preview and Reading view have syntax colors and a Copy button. The editor keeps the Markdown source editable. Colors follow your Native Notes preset and Obsidian's light/dark mode. Unrecognized languages remain readable without syntax colors. Diagram, math, and query blocks retain their specialized rendering.

## Choose defaults

Open **Settings → Native Notes → Code blocks**.

| Setting | Default | Effect |
| --- | --- | --- |
| Built-in code highlighting | On | Enables the bundled renderer and editor highlighting. |
| Highlight inline code | On | Enables the language-prefixed inline syntax below. |
| Show code line numbers | Off | Shows numbers beside rendered code lines. |
| Wrap code lines | Off | Wraps long rendered lines instead of scrolling horizontally. |
| Default code frame | Auto | Choose Auto, Code, Terminal, or None. Auto selects the frame from the language and title. None hides the header. |

The four dependent controls retain their values while built-in highlighting is off. These preferences are included in settings profiles. A code block's explicit metadata overrides the corresponding default.

**Optional features → Editable code headers** and **Show language beside filename** are separate controls. The first controls header editing; the second controls the extra language label on blocks that have a filename. Blocks without a filename still display their language when a header is present.

## Add options to one block

Put options after the language on the opening fence. These affect presentation and do not execute the code.

| Fence option | Effect |
| --- | --- |
| `title="example.ts"` | Sets the filename or title in the header. |
| `frame="code"` | Uses a code frame. Other values are `"auto"`, `"terminal"`, and `"none"`. |
| `showLineNumbers` | Shows line numbers. Use `showLineNumbers=false` to hide them. |
| `startLineNumber=20` | Starts the displayed numbering at 20. |
| `wrap` | Wraps long lines. Use `wrap=false` for horizontal scrolling. |
| `{2,4-6}` | Marks lines 2 and 4 through 6. |
| `ins={2}` / `del={3}` | Marks a line as inserted or deleted. |
| `"important"` | Marks occurrences of this text in the code. |
| `collapse={4-8}` | Initially collapses that line range; select its summary to expand it. |

Line markers and collapsed ranges count source lines within the code block, starting at 1. `startLineNumber` changes the displayed numbers.

````markdown
```ts title="total.ts" showLineNumbers startLineNumber=10 {2} wrap
const values = [2, 3, 5];
const total = values.reduce((sum, value) => sum + value, 0);
console.log(total);
```

```sh frame="terminal" title="Terminal"
npm test
```
````

## Highlight inline code

Start an inline code span with a language in braces followed by one space:

```markdown
Use `{js} const count = 1` to initialize the counter.
```

The language prefix remains in the Markdown source and is hidden in the rendered result. Ordinary inline code without this prefix is unchanged. Turning inline highlighting off restores the visible prefix.

## Edit a header or copy code

In Live Preview, click a filename or language in a rendered header. Keyboard users can focus the label and press **Enter**, **Space**, or **F2**. **Enter** or leaving the field saves; **Escape** cancels. Filename and language edits are independent, preserve other fence options, and support normal undo. Reading view is read-only, and a `frame="none"` block has no header to edit.

Select **Copy** to write the code to the clipboard. This is an explicit clipboard write, like **Profiles → Export → Copy**; the plugin never reads the clipboard. If copying fails, select the code and use your device's copy command. Line numbers and frame labels are display elements, not copied code.

## Bundled languages and limits

This version includes 197 language definitions plus plain text and ANSI output. Common aliases such as `js`, `ts`, `py`, `sh`, `c++`, `rb`, and `yml` resolve to their language. The complete canonical list is:

```text
actionscript-3 angular-html angular-ts ara asm astro awk ballerina bat beancount berry bibtex
bicep blade bsl c c3 cadence cairo clarity clojure cmake cobol codeowners codeql coffee
common-lisp coq cpp crystal csharp css csv cypher d dart desktop diff docker dotenv edge
emacs-lisp erlang fennel fish fluent fortran-fixed-form fortran-free-form fsharp gdresource
gdscript gdshader genie gherkin git-commit git-rebase gleam glimmer-js glimmer-ts gn go graphql
groovy hack haml handlebars haskell haxe hjson hlsl html html-derivative http hxml hy imba ini
java javascript jinja jison json json5 jsonc jsonl jsonnet jssm jsx julia just kdl kotlin latex
lean less liquid log lua make markdown marko mdc mdx mermaid mojo moonbit move narrat nextflow
nextflow-groovy nix nushell objective-c objective-cpp ocaml odin openscad pascal perl php pkl
plsql polar postcss powerquery powershell prisma prolog proto pug puppet python qml qmldir qss
r raku razor reg regexp riscv ron rosmsg rst ruby rust sas scala scheme scss sdbl shaderlab
shellscript shellsession smalltalk solidity soy splunk sql stata stylus surrealql svelte swift
system-verilog systemd talonscript tasl templ tex toml tsv tsx twig typescript typespec typst v
vala vb verilog vhdl viml vue vue-html vue-vine vyper wasm wenyan wgsl wikitext wit xml xsl
yaml zenscript zig
```

The language set is deliberately limited to grammar assets with reviewed permissive redistribution notices. C++, Ruby, Julia, Just, reStructuredText, and Twig remain supported through adapted dependencies; embedded GLSL inside C++ raw strings has no separate GLSL highlighting. The source text is preserved. This version does not include the following upstream languages:

`abap`, `ada`, `apache`, `apex`, `apl`, `applescript`, `asciidoc`, `bird2`, `cue`, `dax`, `dream-maker`, `elixir`, `elm`, `erb`, `glsl`, `gnuplot`, `hcl`, `hurl`, `kusto`, `llvm`, `logo`, `luau`, `matlab`, `mipsasm`, `nginx`, `nim`, `po`, `purescript`, `racket`, `rel`, `sass`, `sparql`, `ssh-config`, `tcl`, `terraform`, `ts-tags`, `turtle`, `wolfram`.

An unavailable language falls back to readable plain code. Native Notes uses its bundled language definitions and preset colors; custom grammar and code-theme folders are not supported. Full license and adaptation details are in [third-party notices](../THIRD-PARTY-NOTICES.md).

## Turn highlighting off

Disabling built-in highlighting restores ordinary code presentation and preserves the Markdown, fence metadata, and your saved code preferences. Disabling Native Notes also removes its editor controls and styling. Filename/language edits previously saved into notes remain part of those notes.
