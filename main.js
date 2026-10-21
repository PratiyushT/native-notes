/* Native Notes — MIT. Runtime dependencies are provided by Obsidian. */
"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/icons.js
var require_icons = __commonJS({
  "src/icons.js"(exports2, module2) {
    "use strict";
    var SVG_NS = "http://www.w3.org/2000/svg";
    var ROOT_ATTRIBUTES = Object.freeze({
      xmlns: SVG_NS,
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.7",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    });
    var path = (d) => Object.freeze({ tag: "path", attributes: Object.freeze({ d }) });
    var circle = (r, filled = false) => Object.freeze({ tag: "circle", attributes: Object.freeze({
      cx: "12",
      cy: "12",
      r: String(r),
      ...filled ? { fill: "currentColor", stroke: "none" } : {}
    }) });
    var ICONS = Object.freeze({
      return: Object.freeze([path("M19 5v7a3 3 0 0 1-3 3H5"), path("m9 11-4 4 4 4")]),
      paragraph: Object.freeze([path("M14 20V4h-4a4.5 4.5 0 0 0 0 9h4M19 4v16M14 4h7")]),
      dot: Object.freeze([circle(1.6, true)]),
      circle: Object.freeze([circle(4)]),
      dash: Object.freeze([path("M8 12h8")]),
      "line-break": Object.freeze([path("M4 6h12a4 4 0 0 1 0 8H6"), path("m10 10-4 4 4 4")]),
      folder: Object.freeze([path("M3 8V6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"), path("M3 9h18")]),
      "folder-open": Object.freeze([
        path("M3 17V6a2 2 0 0 1 2-2h4l2 3h7a2 2 0 0 1 2 2v2"),
        path("M7 11h14l-2.5 7.5a2 2 0 0 1-1.9 1.5H5a2 2 0 0 1-1.9-2.6L5.1 12A2 2 0 0 1 7 11Z")
      ]),
      note: Object.freeze([
        path("M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"),
        path("M14 3v5h5M9 12h6M9 16h6")
      ]),
      "list-tree": Object.freeze([path("M4 5h16M5 9v10h4M5 12h4M12 12h8M12 19h8")]),
      "chevron-down": Object.freeze([path("m6 9 6 6 6-6")]),
      "chevron-right": Object.freeze([path("m9 6 6 6-6 6")]),
      "align-left": Object.freeze([path("M4 5h16M4 10h10M4 15h16M4 20h10")]),
      "align-center": Object.freeze([path("M4 5h16M7 10h10M4 15h16M7 20h10")]),
      "align-right": Object.freeze([path("M4 5h16M10 10h10M4 15h16M10 20h10")])
    });
    var EMPTY_LINE_MARKS = Object.freeze(Object.fromEntries([
      ["return", "Return arrow"],
      ["paragraph", "Paragraph mark"],
      ["dot", "Dot"],
      ["circle", "Circle"],
      ["dash", "Dash"],
      ["line-break", "Line break"]
    ].map(([icon, name]) => [icon, Object.freeze({ name, icon })])));
    function definition(name) {
      if (typeof name !== "string" || !Object.hasOwn(ICONS, name)) throw new RangeError(`Unknown Native Notes icon: ${String(name)}`);
      return ICONS[name];
    }
    function attributesText(attributes) {
      return Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
    }
    function iconSvg(name) {
      const shapes = definition(name).map((shape) => `<${shape.tag} ${attributesText(shape.attributes)}/>`).join("");
      return `<svg ${attributesText(ROOT_ATTRIBUTES)}>${shapes}</svg>`;
    }
    function iconMask(name) {
      return `url("data:image/svg+xml,${encodeURIComponent(iconSvg(name).replace(/currentColor/g, "black"))}")`;
    }
    function setLocalIcon(element, name) {
      const shapes = definition(name), doc = element.ownerDocument;
      const svg = doc.createElementNS(SVG_NS, "svg");
      for (const [key, value] of Object.entries(ROOT_ATTRIBUTES)) svg.setAttribute(key, value);
      svg.setAttribute("class", "svg-icon nn-local-icon");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      for (const shape of shapes) {
        const child = doc.createElementNS(SVG_NS, shape.tag);
        for (const [key, value] of Object.entries(shape.attributes)) child.setAttribute(key, value);
        svg.appendChild(child);
      }
      element.replaceChildren(svg);
      return svg;
    }
    module2.exports = { EMPTY_LINE_MARKS, iconSvg, iconMask, setLocalIcon };
  }
});

// src/settings.js
var require_settings = __commonJS({
  "src/settings.js"(exports2, module2) {
    "use strict";
    var { EMPTY_LINE_MARKS } = require_icons();
    var FEATURE_LABELS = {
      outline: ["Floating outline", "Browse, search, and collapse headings from the note toolbar. Replaces the need for Dynamic Outline."],
      outlineLevels: ["Show heading levels", "Show H1\u2013H6 labels beside headings in the floating outline."],
      emptyLineMarks: ["Empty line marks", "Show a subtle symbol on empty lines in the editor. Reading view stays clear."],
      nestedBullets: ["Nested bullet shapes", "Use solid, hollow, and square bullets for different indentation levels."],
      tableSpacing: ["Extra table spacing", "Add space above and below tables. When off, use Obsidian\u2019s default spacing."],
      imageAlignment: ["Image alignment", "Show left, center, and right alignment controls for images and diagrams."],
      icons: ["Folder and note icons", "Show distinct icons in the sidebar. Expanded folders use an open-folder icon."],
      codeLanguages: ["Show language beside filename", "Show the code language next to a filename. Blocks without filenames always show their language."],
      codeHeaders: ["Editable code headers", "With Shiki Highlighter, click a filename or language in Live Preview to change it. Reading view remains read-only."]
    };
    var OPTIONAL_FEATURES = Object.keys(FEATURE_LABELS);
    var CORE_FEATURES2 = ["appearance", "chrome", "typography", "lists", "hideIndentGuides", "codeBlocks", "callouts", "math", "blockSpacing", "diagrams", "properties", "tables", "integrations"];
    var FEATURE_CLASSES = Object.fromEntries([...CORE_FEATURES2, ...OPTIONAL_FEATURES].map((key) => [key, `nn-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`]));
    var LAYOUT = {
      textSize: { label: "Note text size", min: 12, max: 24, step: 1, value: 16, unit: "px", css: "--an-body-font-size", feature: "typography" },
      lineHeight: { label: "Note line height", min: 1.2, max: 2, step: 0.025, value: 1.625, unit: "", css: "--an-body-line-height", feature: "typography" },
      contentWidth: { label: "Readable line width", min: 420, max: 1200, step: 20, value: 720, unit: "px", css: "--an-content-width", feature: "typography" },
      codeSize: { label: "Code text size", min: 11, max: 22, step: 1, value: 13, unit: "px", css: "--an-code-size", feature: "codeBlocks" },
      codeLineHeight: { label: "Code line height", min: 16, max: 36, step: 1, value: 22, unit: "px", css: "--an-code-line-height", feature: "codeBlocks" },
      codePadding: { label: "Code padding", min: 8, max: 32, step: 1, value: 20, unit: "px", css: "--an-code-padding", feature: "codeBlocks" },
      listGap: { label: "List item gap", min: 0, max: 8, step: 1, value: 2, unit: "px", css: "--an-list-row-gap", feature: "lists" },
      codeGap: { label: "Code block gap", min: 0, max: 40, step: 1, value: 20, unit: "px", css: "--an-code-gap", feature: "blockSpacing" },
      calloutGap: { label: "Callout gap", min: 0, max: 40, step: 1, value: 16, unit: "px", css: "--an-callout-gap", feature: "blockSpacing" },
      mathGap: { label: "Math block gap", min: 0, max: 40, step: 1, value: 18, unit: "px", css: "--an-math-gap", feature: "blockSpacing" }
    };
    var FONTS = {
      text: {
        system: { name: "System", css: '-apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif' },
        serif: { name: "System serif", css: 'ui-serif, Georgia, "Times New Roman", serif' },
        rounded: { name: "System rounded", css: 'ui-rounded, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Noto Sans", Ubuntu, Cantarell, sans-serif' },
        theme: { name: "Use current theme", css: null }
      },
      code: {
        system: { name: "System monospace", css: 'ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, "Liberation Mono", "DejaVu Sans Mono", monospace' },
        menlo: { name: "Menlo", css: 'Menlo, ui-monospace, Consolas, "Liberation Mono", "DejaVu Sans Mono", monospace' },
        theme: { name: "Use current theme", css: null }
      }
    };
    var COLORS = {
      accent: ["Accent", "Buttons and active controls"],
      link: ["Links", "Links and note highlights"],
      background: ["Note background", "Main document surface"],
      surface: ["Block background", "Code, properties, and grouped surfaces"],
      sidebar: ["Navigation background", "Opaque sidebar and toolbar surfaces"],
      text: ["Text", "Primary text"],
      muted: ["Secondary text", "Labels and secondary content"],
      focus: ["Focus ring", "Keyboard focus and active text fields"],
      selection: ["Text selection", "Selected text background"],
      keyword: ["Keywords", "Syntax highlighting"],
      string: ["Strings", "Syntax highlighting"],
      fn: ["Functions", "Syntax highlighting"],
      type: ["Types and values", "Syntax highlighting"],
      comment: ["Comments", "Syntax highlighting"],
      red: ["Red", "Errors and danger callouts"],
      orange: ["Orange", "Warnings and questions"],
      green: ["Green", "Success callouts"],
      blue: ["Blue", "Notes and information"],
      cyan: ["Cyan", "Tips and summaries"],
      purple: ["Purple", "Examples"]
    };
    var PALETTES = {
      dark: { accent: "#ffd600", link: "#ffd600", background: "#1e1e1e", surface: "#262628", sidebar: "#252527", text: "#e1e1e1", muted: "#a7a7ad", focus: "#0a84ff", selection: "#284f78", keyword: "#ec85c7", string: "#efaaa1", fn: "#c1a7ec", type: "#9bbdf0", comment: "#9da4ae", red: "#ff6961", orange: "#ffb340", green: "#5ac878", blue: "#6aafff", cyan: "#70d7e8", purple: "#c1a7ec" },
      light: { accent: "#ffcc00", link: "#936600", background: "#ffffff", surface: "#f6f6f7", sidebar: "#f2f2f4", text: "#252525", muted: "#6b6b70", focus: "#007aff", selection: "#c8e1ff", keyword: "#a02783", string: "#b14236", fn: "#6b499e", type: "#426596", comment: "#6b7178", red: "#c93b32", orange: "#a95c00", green: "#347d43", blue: "#2462a5", cyan: "#168091", purple: "#7850a4" }
    };
    var preset = (name, description, dark, light) => ({ name, description, palettes: { dark: { ...PALETTES.dark, ...dark }, light: { ...PALETTES.light, ...light } } });
    var PRESETS = {
      notes: preset("Notes", "Classic yellow accents with neutral paper and surfaces.", {}, {}),
      ocean: preset(
        "Ocean",
        "Clear blue accents with cool slate surfaces.",
        { accent: "#6aafff", link: "#91c2ff", background: "#191e26", surface: "#222a35", sidebar: "#202833", text: "#e2e8f1", muted: "#a2b0c2", focus: "#6aafff", selection: "#294d73" },
        { accent: "#007aff", link: "#005bbc", background: "#fbfcff", surface: "#f0f4fa", sidebar: "#eaf0f8", text: "#202b3c", muted: "#586b85", focus: "#007aff", selection: "#c8e1ff" }
      ),
      forest: preset(
        "Forest",
        "Soft green accents with quiet botanical tones.",
        { accent: "#76cb99", link: "#8dd7ac", background: "#1b211e", surface: "#242e28", sidebar: "#222b26", text: "#e1e9e3", muted: "#a5b4a9", focus: "#76cb99", selection: "#2a5140" },
        { accent: "#2f8052", link: "#286b45", background: "#fbfdfb", surface: "#f0f5f0", sidebar: "#eaf1eb", text: "#24372a", muted: "#5a705f", focus: "#2f8052", selection: "#c9e7d4" }
      ),
      rose: preset(
        "Rose",
        "Muted pink accents with warm, soft surfaces.",
        { accent: "#ee9bb3", link: "#f3b2c5", background: "#241c21", surface: "#30262d", sidebar: "#2c2329", text: "#efe1e8", muted: "#bea8b4", focus: "#ee9bb3", selection: "#613d4e" },
        { accent: "#b9446b", link: "#a13358", background: "#fffbfd", surface: "#f8f0f4", sidebar: "#f3e9ee", text: "#3e2732", muted: "#7e5e6d", focus: "#b9446b", selection: "#f2d1de" }
      ),
      graphite: preset(
        "Graphite",
        "A restrained monochrome palette with silver accents.",
        { accent: "#b7bcc5", link: "#d4d8df", background: "#1d1e20", surface: "#27292c", sidebar: "#242629", text: "#e4e6e9", muted: "#a8adb6", focus: "#b7bcc5", selection: "#454c58" },
        { accent: "#586170", link: "#414b5a", background: "#fcfcfd", surface: "#f1f2f4", sidebar: "#eceef1", text: "#282d35", muted: "#656d79", focus: "#586170", selection: "#d9dfe8" }
      )
    };
    var TEXT_SIZES = {
      small: { name: "Small", textSize: 14, codeSize: 12, codeLineHeight: 20 },
      default: { name: "Default", textSize: 16, codeSize: 13, codeLineHeight: 22 },
      large: { name: "Large", textSize: 18, codeSize: 14, codeLineHeight: 24 }
    };
    var isObject = (value) => !!value && typeof value === "object" && !Array.isArray(value);
    var own = (object, key) => isObject(object) && Object.prototype.hasOwnProperty.call(object, key) ? object[key] : void 0;
    var color = (value) => typeof value === "string" && /^#[\da-f]{6}$/i.test(value) ? value.toLowerCase() : null;
    function defaults() {
      return {
        schemaVersion: 2,
        preset: "notes",
        textSize: "default",
        sidebarDensity: "comfortable",
        emptyLineStyle: "return",
        features: Object.fromEntries(Object.keys(FEATURE_LABELS).map((key) => [key, !["outlineLevels", "tableSpacing"].includes(key)])),
        options: { translucentNavigation: true, hideRibbon: false }
      };
    }
    function closestPreset(hex, mode) {
      const channels = (value) => [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
      const target = channels(hex);
      return Object.keys(PRESETS).reduce((best, key) => {
        const distance = (candidate) => channels(PRESETS[candidate].palettes[mode].accent).reduce((sum, n, i) => sum + (n - target[i]) ** 2, 0);
        return distance(key) < distance(best) ? key : best;
      }, "notes");
    }
    function normalizeSettings2(input) {
      const output = defaults();
      if (!isObject(input)) return output;
      if (own(input, "schemaVersion") === 1) {
        const oldSize = own(own(input, "layout"), "textSize");
        if (typeof oldSize === "number" && Number.isFinite(oldSize)) output.textSize = oldSize <= 14 ? "small" : oldSize >= 18 ? "large" : "default";
        if (own(own(input, "options"), "compactSidebar") === true) output.sidebarDensity = "compact";
        for (const mode of ["dark", "light"]) {
          const accent = color(own(own(own(input, "palettes"), mode), "accent"));
          if (accent) {
            output.preset = closestPreset(accent, mode);
            break;
          }
        }
      }
      const chosenPreset = own(input, "preset"), chosenSize = own(input, "textSize"), density = own(input, "sidebarDensity");
      if (typeof chosenPreset === "string" && Object.prototype.hasOwnProperty.call(PRESETS, chosenPreset)) output.preset = chosenPreset;
      if (typeof chosenSize === "string" && Object.prototype.hasOwnProperty.call(TEXT_SIZES, chosenSize)) output.textSize = chosenSize;
      if (["comfortable", "compact"].includes(density)) output.sidebarDensity = density;
      const emptyLineStyle = own(input, "emptyLineStyle");
      if (typeof emptyLineStyle === "string" && Object.prototype.hasOwnProperty.call(EMPTY_LINE_MARKS, emptyLineStyle)) output.emptyLineStyle = emptyLineStyle;
      for (const group of ["features", "options"]) for (const key of Object.keys(output[group])) {
        const value = own(own(input, group), key);
        if (typeof value === "boolean") output[group][key] = value;
      }
      return output;
    }
    function resolveDesign(input) {
      const settings = normalizeSettings2(input), size = TEXT_SIZES[settings.textSize];
      const layout = Object.fromEntries(Object.entries(LAYOUT).map(([key, item]) => [key, item.value]));
      for (const key of ["textSize", "codeSize", "codeLineHeight"]) layout[key] = size[key];
      return {
        ...settings,
        fonts: { interface: "system", text: "system", code: "system" },
        layout,
        palettes: JSON.parse(JSON.stringify(PRESETS[settings.preset].palettes))
      };
    }
    function exportProfile(settings) {
      return JSON.stringify({ plugin: "native-notes", version: 2, settings: normalizeSettings2(settings) }, null, 2);
    }
    function importProfile(text) {
      if (typeof text !== "string" || text.length > 1e5) throw new Error("Choose a Native Notes profile smaller than 100 KB.");
      let profile;
      try {
        profile = JSON.parse(text);
      } catch {
        throw new Error("This is not valid JSON. Paste the complete exported profile.");
      }
      if (profile?.plugin !== "native-notes" || ![1, 2].includes(profile.version) || !isObject(profile.settings) || profile.settings.schemaVersion !== profile.version) throw new Error("This profile is not a supported Native Notes profile (version 1 or 2).");
      return normalizeSettings2(profile.settings);
    }
    module2.exports = { FEATURE_LABELS, FEATURE_CLASSES, CORE_FEATURES: CORE_FEATURES2, OPTIONAL_FEATURES, LAYOUT, FONTS, COLORS, PALETTES, PRESETS, TEXT_SIZES, defaults, normalizeSettings: normalizeSettings2, resolveDesign, exportProfile, importProfile };
  }
});

// src/appearance.js
var require_appearance = __commonJS({
  "src/appearance.js"(exports2, module2) {
    "use strict";
    var { FEATURE_CLASSES, CORE_FEATURES: CORE_FEATURES2, OPTIONAL_FEATURES, FONTS, LAYOUT, normalizeSettings: normalizeSettings2, resolveDesign } = require_settings();
    var { EMPTY_LINE_MARKS, iconMask } = require_icons();
    var EXTRA_CLASSES = ["nn-enabled", "nn-solid-surfaces", "nn-compact-sidebar", "nn-hide-ribbon"];
    var OWNED_CLASSES2 = [...EXTRA_CLASSES, ...Object.values(FEATURE_CLASSES)];
    var rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    function contrastText(hex) {
      const c = rgb(hex).map((n) => {
        const s = n / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      const luminance = c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
      return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? "#000000" : "#ffffff";
    }
    function classNames2(settings) {
      settings = normalizeSettings2(settings);
      const names = ["nn-enabled", ...[...CORE_FEATURES2, ...OPTIONAL_FEATURES.filter((key) => settings.features[key])].map((key) => FEATURE_CLASSES[key])];
      if (!settings.options.translucentNavigation) names.push("nn-solid-surfaces");
      if (settings.sidebarDensity === "compact") names.push("nn-compact-sidebar");
      if (settings.options.hideRibbon) names.push("nn-hide-ribbon");
      return names;
    }
    function settingsCSS2(input) {
      const s = resolveDesign(input);
      const rules = [];
      const emit = (selector, vars) => rules.push(`${selector}{${Object.entries(vars).map(([name, value]) => `${name}:${value};`).join("")}}`);
      const layout = {};
      for (const spec of Object.values(LAYOUT)) layout[spec.feature] = {};
      for (const [key, spec] of Object.entries(LAYOUT)) layout[spec.feature][spec.css] = `${s.layout[key]}${spec.unit}`;
      for (const [feature, vars] of Object.entries(layout)) emit(`body.nn-enabled.${FEATURE_CLASSES[feature]}`, vars);
      const textFont = FONTS.text[s.fonts.text].css;
      const codeFont = FONTS.code[s.fonts.code].css;
      const interfaceFont = FONTS.text[s.fonts.interface].css;
      if (textFont) emit("body.nn-enabled.nn-typography", { "--font-text-theme": textFont });
      if (codeFont) emit("body.nn-enabled.nn-code-blocks", { "--font-monospace-theme": codeFont });
      if (interfaceFont) emit("body.nn-enabled.nn-chrome", { "--font-interface-theme": interfaceFont });
      emit("body.nn-enabled.nn-empty-line-marks", { "--nn-empty-line-icon": iconMask(EMPTY_LINE_MARKS[s.emptyLineStyle].icon) });
      emit("body.nn-enabled.nn-icons", {
        "--nn-folder-icon": iconMask("folder"),
        "--nn-folder-open-icon": iconMask("folder-open"),
        "--nn-note-icon": iconMask("note")
      });
      rules.push("@media screen {");
      for (const mode of ["light", "dark"]) {
        const p = s.palettes[mode];
        const mix = (value, into, percent) => `color-mix(in srgb,${value},${into} ${percent}%)`;
        const vars = {
          "--an-paper": p.background,
          "--an-block": p.surface,
          "--an-label": p.text,
          "--an-secondary": p.muted,
          "--an-tertiary": mix(p.muted, p.background, 20),
          "--an-gold": p.link,
          "--an-link-hover": mix(p.link, mode === "dark" ? "white" : "black", 14),
          "--an-accent-fill": p.accent,
          "--an-accent-hover": mix(p.accent, mode === "dark" ? "white" : "black", 8),
          "--an-focus": p.focus,
          "--an-text-selection": p.selection,
          "--an-chrome-solid": p.sidebar,
          "--an-glass": p.sidebar,
          "--an-chrome-underlay": p.sidebar,
          "--an-inline": mix(p.surface, p.text, 6),
          "--an-input": p.background,
          "--an-control": mix(p.surface, p.text, mode === "dark" ? 9 : 0),
          "--an-control-hover": mix(p.surface, p.text, mode === "dark" ? 15 : 4),
          "--an-popover": mix(p.surface, "transparent", 3),
          "--an-rule": mix(p.text, "transparent", 89),
          "--an-border-hover": mix(p.text, "transparent", 78),
          "--an-glass-edge": mix(p.text, "transparent", 88),
          "--an-selection": mix(p.text, "transparent", 94),
          "--an-selection-text": p.text,
          "--an-hover": mix(p.text, "transparent", 96),
          "--text-on-accent": contrastText(p.accent),
          "--interactive-accent-rgb": rgb(p.accent).join(","),
          "--an-syntax-keyword": p.keyword,
          "--an-syntax-type": p.type,
          "--an-syntax-string": p.string,
          "--an-syntax-function": p.fn,
          "--an-syntax-comment": p.comment
        };
        for (const name of ["red", "orange", "green", "blue", "cyan", "purple"]) {
          vars[`--color-${name}`] = p[name];
          vars[`--color-${name}-rgb`] = rgb(p[name]).join(",");
        }
        emit(`body.nn-enabled.nn-appearance.theme-${mode}`, vars);
        emit(`body.nn-enabled.nn-appearance.nn-code-blocks.theme-${mode}`, {
          "--shiki-code-keyword": p.keyword,
          "--shiki-code-function": p.fn,
          "--shiki-code-property": p.type,
          "--shiki-code-string": p.string,
          "--shiki-code-comment": p.comment,
          "--shiki-code-value": p.type
        });
      }
      rules.push("}");
      rules.push("@media screen and (prefers-contrast: more){body.nn-enabled.nn-appearance:is(.theme-light,.theme-dark){--an-rule:var(--an-secondary);--an-border-hover:var(--an-label);--an-secondary:var(--an-label);}}");
      return rules.join("\n");
    }
    module2.exports = { OWNED_CLASSES: OWNED_CLASSES2, classNames: classNames2, settingsCSS: settingsCSS2, contrastText };
  }
});

// src/sync/ui.js
var require_ui = __commonJS({
  "src/sync/ui.js"(exports2, module2) {
    "use strict";
    var { Modal, Notice: Notice2, Setting } = require("obsidian");
    var SETUP_URL = "https://github.com/PratiyushT/native-notes/blob/main/docs/SYNC.md";
    var SyncHistoryModal2 = class extends Modal {
      constructor(plugin) {
        super(plugin.app);
        this.plugin = plugin;
        this.live = false;
        this.offset = 0;
        this.filter = "";
      }
      onOpen() {
        if (this.plugin.disposed) {
          this.close();
          return;
        }
        this.live = true;
        this.session = {};
        this.busy = false;
        this.plugin.settingsModals.add(this);
        this.setTitle("Local recovery history");
        this.contentEl.classList.add("native-notes-sync-modal");
        this.errorEl = this.contentEl.createEl("p", { cls: "native-notes-sync-status", attr: { role: "status", "aria-live": "polite" } });
        this.body = this.contentEl.createDiv();
        this.body.createEl("p", { text: "These recovery snapshots are saved on this device. Restoring creates a separate copy so you can review it without replacing your current note." });
        const session = this.session;
        const label = this.body.createEl("label", { cls: "native-notes-sync-field" });
        label.createSpan({ text: "Filter by file" });
        const search = label.createEl("input", { attr: { type: "search", autocomplete: "off", spellcheck: "false" } });
        search.value = this.filter;
        const list = this.body.createDiv({ cls: "native-notes-sync-history" });
        search.addEventListener("input", () => {
          if (!this.current(session)) return;
          this.filter = search.value;
          this.offset = 0;
          void this.perform(() => this.loadRows(list, session), session);
        });
        void this.perform(() => this.loadRows(list, session), session);
      }
      current(session = this.session) {
        return this.live && session === this.session && !this.plugin.disposed;
      }
      async perform(action, session = this.session) {
        if (!this.current(session) || this.busy) return;
        this.busy = true;
        this.errorEl.textContent = "Working\u2026";
        const controls = [...this.body.querySelectorAll("button, input, textarea, select")].map((element) => [element, element.disabled]);
        controls.forEach(([element]) => {
          element.disabled = true;
        });
        try {
          await action();
          if (this.current(session)) this.errorEl.textContent = "";
        } catch (error) {
          if (this.current(session)) this.errorEl.textContent = error?.message || "The recovery action could not finish. Try again.";
        } finally {
          if (this.current(session)) {
            this.busy = false;
            controls.forEach(([element, disabled]) => {
              element.disabled = disabled;
            });
          }
        }
      }
      async loadRows(list, session = this.session) {
        if (!this.current(session)) return;
        const serial = this.serial = (this.serial || 0) + 1;
        const sync = this.plugin.sync;
        await sync.ensureStorage();
        if (!this.current(session)) return;
        const records = await sync.storage.history();
        if (!this.current(session) || serial !== this.serial) return;
        const rows = records.filter((record) => typeof record.path === "string" && record.path.toLowerCase().includes(this.filter.toLowerCase())).sort((a, b) => b.modified - a.modified);
        if (this.offset >= rows.length) this.offset = Math.max(0, Math.floor((rows.length - 1) / 30) * 30);
        list.empty();
        list.createEl("p", { cls: "native-notes-sync-hint", text: rows.length ? `${rows.length} saved versions. Local history retains up to 20 versions per file, 5,000 versions total, within a 100 MiB device budget.` : "No saved versions match. Turn on Cloud folder tools to start saving recovery snapshots." });
        for (const record of rows.slice(this.offset, this.offset + 30)) {
          const row = list.createDiv({ cls: "native-notes-sync-history-row" });
          row.createEl("strong", { text: record.path });
          row.createEl("p", { cls: "native-notes-sync-hint", text: `${new Date(record.modified).toLocaleString()} \xB7 ${record.reason || "Local recovery snapshot"}` });
          const readBytes = async () => {
            const bytes = await sync.storage.readSnapshot(record.id);
            if (!ArrayBuffer.isView(bytes) || Object.prototype.toString.call(bytes) !== "[object Uint8Array]") {
              throw new Error("This recovery snapshot is unavailable. Choose another saved version.");
            }
            return bytes;
          };
          if (record.path.toLowerCase().endsWith(".md")) {
            const details = row.createEl("details");
            details.createEl("summary", { text: "Preview" });
            const preview = details.createEl("pre");
            let previewRequest = 0;
            details.addEventListener("toggle", () => {
              const request = ++previewRequest;
              if (!this.current(session)) return;
              if (!details.open) {
                preview.textContent = "";
                return;
              }
              preview.textContent = "Loading\u2026";
              void (async () => {
                try {
                  const bytes = await readBytes();
                  if (this.current(session) && request === previewRequest && details.open && details.isConnected) {
                    preview.textContent = new TextDecoder().decode(bytes.subarray(0, 8e4)).slice(0, 2e4);
                  }
                } catch (error) {
                  if (this.current(session) && request === previewRequest && details.open && details.isConnected) {
                    preview.textContent = "";
                    this.errorEl.textContent = error?.message || "This preview is unavailable.";
                  }
                }
              })();
            });
          }
          new Setting(row).addButton((button) => button.setButtonText("Restore a copy").onClick(() => void this.perform(async () => {
            const bytes = await readBytes();
            if (!this.current(session)) return;
            const file = await sync.files().restoreCopy(record.path, bytes);
            if (this.current(session)) new Notice2(`Saved recovery copy: ${file.path}`);
          }, session)));
        }
        const navigation = new Setting(list);
        if (this.offset > 0) navigation.addButton((button) => button.setButtonText("Previous").onClick(() => {
          if (!this.current(session)) return;
          this.offset = Math.max(0, this.offset - 30);
          void this.perform(() => this.loadRows(list, session), session);
        }));
        if (this.offset + 30 < rows.length) navigation.addButton((button) => button.setButtonText("Next").onClick(() => {
          if (!this.current(session)) return;
          this.offset += 30;
          void this.perform(() => this.loadRows(list, session), session);
        }));
      }
      onClose() {
        this.live = false;
        this.session = null;
        this.busy = false;
        this.plugin.settingsModals.delete(this);
        this.contentEl.empty();
      }
    };
    function syncDefinitions(tab) {
      const plugin = tab.plugin, sync = plugin.sync;
      if (!sync) return [];
      const perform = async (action) => {
        if (plugin.disposed) return;
        try {
          await action();
        } catch (error) {
          if (!plugin.disposed) new Notice2(error?.message || "The recovery action could not finish. Try again.");
        }
        if (!plugin.disposed) tab.refreshSettingsTab();
      };
      const definition = (...args) => tab.settingDefinition(...args);
      const items = [
        tab.descriptionDefinition("Create or open your vault inside an iCloud Drive or OneDrive folder. Your installed cloud service transfers the files. Native Notes adds optional recovery snapshots saved on this device.", "native-notes-section-description"),
        definition("Cloud folder tools", "Off by default. Save local recovery versions while Obsidian is open. Turning this off stops these snapshots; your cloud service keeps syncing.", (setting) => {
          setting.addToggle((toggle) => toggle.setValue(sync.config.enabled).onChange((value) => void perform(() => sync.setEnabled(value))));
        }),
        definition("Cloud service", "Choose the setup instructions for your cloud folder. This does not move your vault or change your cloud service. Changing this choice pauses local recovery.", (setting) => {
          setting.controlEl.classList.add("nn-select-control");
          setting.addDropdown((dropdown) => dropdown.addOptions({ icloud: "iCloud Drive", onedrive: "OneDrive" }).setValue(sync.config.provider).onChange((value) => void perform(() => sync.configure({ provider: value }))));
        }),
        definition("Recovery status", sync.status, (setting) => {
          setting.addButton((button) => button.setButtonText("Save snapshot").setDisabled(!sync.config.enabled).onClick(() => void perform(() => sync.run()))).addButton((button) => button.setButtonText("History").onClick(() => new SyncHistoryModal2(plugin).open()));
          return sync.subscribe((text) => setting.setDesc(text));
        }),
        definition("Include attachments in recovery", "Add visible attachments up to 10 MiB to local snapshots. This does not change what your cloud service syncs. Changing this choice pauses local recovery.", (setting) => {
          setting.addToggle((toggle) => toggle.setValue(sync.config.attachments).onChange((value) => void perform(() => sync.configure({ attachments: value }))));
        }),
        definition("Cloud folder setup", sync.config.provider === "icloud" ? "On Mac, iPhone, and iPad, create or open an Obsidian vault using iCloud Drive. On iPhone and iPad, use iCloud Drive/Obsidian. Keep your files downloaded for offline editing." : "On Mac or Windows, open a vault inside your OneDrive folder and keep it available offline. Linux needs a separate compatible sync client. Obsidian on iPhone and iPad cannot open a OneDrive vault folder natively.", (setting) => {
          setting.controlEl.createEl("a", { text: "Open vault manager", cls: "native-notes-sync-guide", attr: { href: "obsidian://choose-vault" } });
          setting.controlEl.createEl("a", { text: "Setup guide", cls: "native-notes-sync-guide", attr: { href: SETUP_URL, target: "_blank", rel: "noopener noreferrer" } });
        })
      ];
      return [{ type: "group", heading: "Cloud folders", cls: "native-notes-settings-section", items }];
    }
    module2.exports = { syncDefinitions, SyncHistoryModal: SyncHistoryModal2 };
  }
});

// src/settings-tab.js
var require_settings_tab = __commonJS({
  "src/settings-tab.js"(exports2, module2) {
    "use strict";
    var { PluginSettingTab, Setting, Modal, Notice: Notice2 } = require("obsidian");
    var { FEATURE_LABELS, PRESETS, TEXT_SIZES, defaults, exportProfile, importProfile } = require_settings();
    var { EMPTY_LINE_MARKS, setLocalIcon } = require_icons();
    var { syncDefinitions } = require_ui();
    var SettingsModal = class extends Modal {
      constructor(plugin) {
        super(plugin.app);
        this.plugin = plugin;
        this.session = null;
      }
      startSession() {
        if (this.plugin.disposed) {
          this.close();
          return null;
        }
        this.session = {};
        this.plugin.settingsModals.add(this);
        return this.session;
      }
      isCurrent(session) {
        return this.session === session && !this.plugin.disposed;
      }
      onClose() {
        this.session = null;
        this.plugin.settingsModals.delete(this);
        this.contentEl.empty();
      }
    };
    var ProfileModal = class extends SettingsModal {
      constructor(plugin, mode, afterSave) {
        super(plugin);
        this.mode = mode;
        this.afterSave = afterSave;
      }
      onOpen() {
        const session = this.startSession();
        if (!session) return;
        this.setTitle(this.mode === "export" ? "Export profile" : "Import profile");
        this.contentEl.classList.add("native-notes-profile");
        this.contentEl.createEl("p", { text: this.mode === "export" ? "Copy this profile to another device, or save it as a JSON file. It contains appearance settings only." : "Paste an exported Native Notes profile or choose its JSON file. Import replaces your appearance settings." });
        const input = this.contentEl.createEl("textarea", { attr: { "aria-label": "Native Notes profile", spellcheck: "false" } });
        input.value = this.mode === "export" ? exportProfile(this.plugin.settings) : "";
        input.readOnly = this.mode === "export";
        this.input = input;
        this.errorEl = this.contentEl.createEl("p", { cls: "native-notes-profile-error", attr: { role: "status", "aria-live": "polite" } });
        const controls = new Setting(this.contentEl);
        if (this.mode === "export") {
          controls.addButton((button) => button.setButtonText("Copy").setCta().onClick(async () => {
            if (!this.isCurrent(session)) return;
            try {
              await input.ownerDocument.defaultView.navigator.clipboard.writeText(input.value);
              if (this.isCurrent(session)) new Notice2("Profile copied.");
            } catch {
              if (!this.isCurrent(session)) return;
              input.focus();
              input.select();
              this.errorEl.textContent = "Select and copy the profile text using your device\u2019s copy command.";
            }
          }));
          controls.addButton((button) => button.setButtonText("Save file").onClick(() => {
            if (!this.isCurrent(session)) return;
            const win = input.ownerDocument.defaultView;
            const url = win.URL.createObjectURL(new win.Blob([input.value], { type: "application/json" }));
            const link = this.contentEl.createEl("a", { attr: { href: url, download: "native-notes-profile.json" } });
            link.click();
            link.remove();
            this.urls || (this.urls = []);
            this.urls.push([win, url]);
          }));
        } else {
          const file = this.contentEl.createEl("input", { attr: { type: "file", accept: ".json,application/json", "aria-label": "Choose profile file" } });
          file.hidden = true;
          file.addEventListener("change", async () => {
            if (!this.isCurrent(session)) return;
            const selected = file.files?.[0];
            if (!selected) return;
            if (selected.size > 1e5) {
              this.errorEl.textContent = "Choose a profile smaller than 100 KB.";
              return;
            }
            try {
              const text = await selected.text();
              if (!this.isCurrent(session)) return;
              input.value = text;
              this.errorEl.textContent = "Profile loaded. Select import to apply it.";
            } catch {
              if (this.isCurrent(session)) this.errorEl.textContent = "The file could not be read.";
            }
          });
          controls.addButton((button) => button.setButtonText("Choose file").onClick(() => {
            if (this.isCurrent(session)) file.click();
          }));
          controls.addButton((button) => button.setButtonText("Import").setCta().onClick(async () => {
            if (!this.isCurrent(session)) return;
            try {
              const settings = importProfile(input.value);
              this.plugin.settings = settings;
              const saved = await this.plugin.updateSettings();
              if (!this.isCurrent(session)) return;
              if (!saved) {
                this.errorEl.textContent = "The profile could not be saved. Check that your vault is writable, then try again.";
                return;
              }
              this.afterSave?.();
              this.close();
              new Notice2("Profile imported.");
            } catch (error) {
              if (this.isCurrent(session)) this.errorEl.textContent = error.message;
            }
          }));
        }
        controls.addButton((button) => button.setButtonText("Close").onClick(() => this.close()));
      }
      onClose() {
        for (const [win, url] of this.urls || []) win.URL.revokeObjectURL(url);
        this.urls = [];
        super.onClose();
      }
    };
    var ResetModal = class extends SettingsModal {
      constructor(plugin, afterSave) {
        super(plugin);
        this.afterSave = afterSave;
      }
      onOpen() {
        const session = this.startSession();
        if (!session) return;
        this.setTitle("Restore default appearance?");
        this.contentEl.createEl("p", { text: "This resets your theme, text size, sidebar density, and optional features. Export a profile first if you want to keep them." });
        new Setting(this.contentEl).addButton((button) => button.setButtonText("Cancel").onClick(() => this.close())).addButton((button) => button.setButtonText("Restore defaults").setWarning().onClick(async () => {
          if (!this.isCurrent(session)) return;
          this.plugin.settings = defaults();
          const saved = await this.plugin.updateSettings();
          if (!this.isCurrent(session) || !saved) return;
          this.afterSave();
          this.close();
        }));
      }
    };
    var NativeNotesSettingsTab2 = class extends PluginSettingTab {
      constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
      }
      // Definitions are also read before the tab opens to index settings search.
      // Keep document access inside render callbacks, when the host window is known.
      settingDefinition(name, desc, render, aliases) {
        return { name, desc, aliases, render: (setting, group) => {
          this.plugin.attachDocument(setting.settingEl.ownerDocument);
          this.containerEl.classList.add("native-notes-settings");
          return render(setting, group);
        } };
      }
      descriptionDefinition(text, cls) {
        const definition = this.settingDefinition("", text, (setting, group) => {
          if (cls === "native-notes-intro") group.addClass("native-notes-intro-group");
          setting.settingEl.empty();
          setting.settingEl.classList.remove("setting-item");
          setting.settingEl.classList.add(cls);
          setting.settingEl.textContent = text;
        });
        definition.searchable = false;
        return definition;
      }
      refreshSettingsTab() {
        if (this.plugin.disposed) return;
        const scrollTop = this.containerEl.scrollTop;
        this.update();
        this.containerEl.scrollTop = scrollTop;
      }
      getSettingDefinitions() {
        return [
          this.descriptionDefinition("A coordinated Apple-inspired design. Choose a look and a few personal preferences.", "native-notes-intro"),
          { type: "group", heading: "Appearance", cls: "native-notes-settings-section", items: [
            this.descriptionDefinition("Every theme includes matching light and dark colors. Fonts and spacing are taken care of.", "native-notes-section-description"),
            this.settingDefinition("Color theme", PRESETS[this.plugin.settings.preset].description, (setting) => this.renderTheme(setting), Object.values(PRESETS).map((preset) => preset.name)),
            this.settingDefinition("Text size", "Adjust note and code text together.", (setting) => {
              setting.controlEl.classList.add("nn-select-control");
              setting.addDropdown((dropdown) => dropdown.addOptions(Object.fromEntries(Object.entries(TEXT_SIZES).map(([id, size]) => [id, size.name]))).setValue(this.plugin.settings.textSize).onChange((value) => {
                this.plugin.settings.textSize = value;
                void this.plugin.updateSettings();
              }));
            }),
            this.settingDefinition("Sidebar density", "Choose roomier or closer rows. Mobile keeps comfortable touch targets.", (setting) => {
              setting.controlEl.classList.add("nn-select-control");
              setting.addDropdown((dropdown) => dropdown.addOptions({ comfortable: "Comfortable", compact: "Compact" }).setValue(this.plugin.settings.sidebarDensity).onChange((value) => {
                this.plugin.settings.sidebarDensity = value;
                void this.plugin.updateSettings();
              }));
            })
          ] },
          { type: "group", heading: "Optional features", cls: "native-notes-settings-section", items: this.featureDefinitions() },
          ...syncDefinitions(this),
          { type: "group", heading: "Profiles", cls: "native-notes-settings-section", items: [
            this.descriptionDefinition("Keep the same look on your other devices.", "native-notes-section-description"),
            this.settingDefinition("Transfer settings", "Export your choices and import them on another device. Profiles contain no notes or account information.", (setting) => {
              setting.addButton((button) => button.setButtonText("Export").onClick(() => new ProfileModal(this.plugin, "export").open())).addButton((button) => button.setButtonText("Import").onClick(() => new ProfileModal(this.plugin, "import", () => this.refreshSettingsTab()).open()));
            }, ["Import", "Export", "Profile"]),
            this.settingDefinition("Restore defaults", "Return to the Notes theme and original preferences.", (setting) => {
              setting.addButton((button) => button.setButtonText("Restore defaults").onClick(() => new ResetModal(this.plugin, () => this.refreshSettingsTab()).open()));
            }, ["Reset"])
          ] }
        ];
      }
      renderTheme(theme) {
        theme.controlEl.classList.add("nn-select-control");
        theme.settingEl.classList.add("native-notes-theme-setting");
        const preview = theme.settingEl.createDiv({ cls: "native-notes-theme-preview" });
        const refreshPreview = () => {
          const preset = PRESETS[this.plugin.settings.preset];
          theme.setDesc(preset.description);
          preview.empty();
          for (const mode of ["light", "dark"]) {
            const row = preview.createDiv({ cls: "native-notes-palette-row" });
            row.createSpan({ text: mode === "light" ? "Light" : "Dark" });
            const swatches = row.createDiv({ cls: "native-notes-palette", attr: { "aria-label": `${preset.name} ${mode} palette` } });
            for (const key of ["background", "surface", "sidebar", "text", "accent"]) {
              const swatch = swatches.createDiv({ attr: { "aria-hidden": "true" } });
              swatch.style.backgroundColor = preset.palettes[mode][key];
            }
          }
        };
        theme.addDropdown((dropdown) => dropdown.addOptions(Object.fromEntries(Object.entries(PRESETS).map(([id, preset]) => [id, preset.name]))).setValue(this.plugin.settings.preset).onChange((value) => {
          this.plugin.settings.preset = value;
          void this.plugin.updateSettings();
          refreshPreview();
        }));
        refreshPreview();
        return () => preview.remove();
      }
      featureDefinitions() {
        const definitions = [];
        for (const [key, [name, desc]] of Object.entries(FEATURE_LABELS)) {
          let symbolChoice, symbolRow;
          definitions.push(this.settingDefinition(name, desc, (setting) => {
            setting.addToggle((toggle) => toggle.setValue(this.plugin.settings.features[key]).onChange((value) => {
              this.plugin.settings.features[key] = value;
              symbolChoice?.setDisabled(!value);
              symbolRow?.settingEl.classList.toggle("is-disabled", !value);
              void this.plugin.updateSettings();
            }));
          }));
          if (key === "emptyLineMarks") {
            definitions.push(this.settingDefinition("Empty line symbol", "Choose the symbol shown on empty editor lines.", (setting) => {
              symbolRow = setting;
              setting.controlEl.classList.add("nn-select-control");
              setting.settingEl.classList.add("native-notes-symbol-setting");
              setting.settingEl.classList.toggle("is-disabled", !this.plugin.settings.features.emptyLineMarks);
              const preview = setting.controlEl.createSpan({ cls: "native-notes-symbol-preview", attr: { "aria-hidden": "true" } });
              const showPreview = () => setLocalIcon(preview, EMPTY_LINE_MARKS[this.plugin.settings.emptyLineStyle].icon);
              setting.addDropdown((dropdown) => {
                symbolChoice = dropdown;
                dropdown.addOptions(Object.fromEntries(Object.entries(EMPTY_LINE_MARKS).map(([id, mark]) => [id, mark.name]))).setValue(this.plugin.settings.emptyLineStyle).setDisabled(!this.plugin.settings.features.emptyLineMarks).onChange((value) => {
                  this.plugin.settings.emptyLineStyle = value;
                  showPreview();
                  void this.plugin.updateSettings();
                });
                dropdown.selectEl.setAttribute("aria-label", "Empty line symbol");
              });
              showPreview();
              return () => {
                symbolRow = void 0;
                symbolChoice = void 0;
              };
            }));
          }
        }
        const options = {
          translucentNavigation: ["Translucent navigation", "Desktop popovers use a soft blur. On Mac, also enable Obsidian\u2019s Translucent window setting for translucent sidebars. Windows and Linux keep solid sidebars; mobile uses solid surfaces."],
          hideRibbon: ["Hide left ribbon", "Desktop only. Commands remain available through the command palette."]
        };
        for (const [key, [name, desc]] of Object.entries(options)) definitions.push(this.settingDefinition(name, desc, (setting) => {
          setting.addToggle((toggle) => toggle.setValue(this.plugin.settings.options[key]).onChange((value) => {
            this.plugin.settings.options[key] = value;
            void this.plugin.updateSettings();
          }));
        }));
        return definitions;
      }
    };
    module2.exports = { NativeNotesSettingsTab: NativeNotesSettingsTab2, ProfileModal };
  }
});

// src/fence.js
var require_fence = __commonJS({
  "src/fence.js"(exports2, module2) {
    "use strict";
    function requireString(value, name) {
      if (typeof value !== "string") throw new TypeError(`${name} must be a string`);
    }
    function stripQuotes(line, count) {
      let offset = 0;
      let depth = 0;
      while (count === void 0 || depth < count) {
        const match = /^ {0,3}>[ \t]?/.exec(line.slice(offset));
        if (!match) break;
        offset += match[0].length;
        depth++;
      }
      return { offset, depth };
    }
    function parseOpening(line) {
      if (/[\r\n]/.test(line)) return null;
      const quotes = stripQuotes(line);
      let offset = quotes.offset;
      let listIndent = 0;
      const list = /^ {0,3}(?:[-+*]|\d{1,9}[.)]) {1,4}(?=\S)/.exec(line.slice(offset));
      if (list) {
        listIndent = list[0].length;
        offset += listIndent;
      }
      const fence = /^( {0,3})(`{3,}|~{3,})(.*)$/.exec(line.slice(offset));
      if (!fence) return null;
      const fenceChar = fence[2][0];
      if (fenceChar === "`" && fence[3].includes("`")) return null;
      const fenceStart = offset + fence[1].length;
      const infoStart = fenceStart + fence[2].length;
      return {
        fenceChar,
        fenceLength: fence[2].length,
        fenceStart,
        infoStart,
        quoteDepth: quotes.depth,
        listIndent,
        prefix: line.slice(0, fenceStart)
      };
    }
    function sourceLines(text) {
      const lines = [];
      const pattern = /([^\r\n]*)(\r\n|\r|\n|$)/g;
      let match;
      while ((match = pattern.exec(text)) && match[0].length) {
        lines.push({
          text: match[1],
          start: match.index,
          end: match.index + match[1].length,
          next: match.index + match[0].length,
          eol: match[2]
        });
      }
      return lines;
    }
    function containerContent(line, opening) {
      const quotes = stripQuotes(line, opening.quoteDepth);
      if (quotes.depth !== opening.quoteDepth) return null;
      let content = line.slice(quotes.offset);
      if (opening.listIndent) {
        if (/^[ \t]*$/.test(content)) return "";
        if (!content.startsWith(" ".repeat(opening.listIndent))) return null;
        content = content.slice(opening.listIndent);
      }
      return content;
    }
    function scanFences(text) {
      requireString(text, "text");
      const lines = sourceLines(text);
      const blocks = [];
      let active = null;
      function finish(closingIndex, bodyEnd) {
        const line = lines[active.index];
        blocks.push({
          lineStart: active.index,
          lineEnd: closingIndex,
          openingLine: line.text,
          openingStart: line.start,
          openingEnd: line.end,
          body: text.slice(line.next, bodyEnd),
          bodyStart: line.next,
          bodyEnd,
          fenceChar: active.opening.fenceChar,
          fenceLength: active.opening.fenceLength,
          prefix: active.opening.prefix,
          eol: line.eol,
          closed: closingIndex !== null,
          closingLine: closingIndex === null ? null : lines[closingIndex].text
        });
        active = null;
      }
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if (active) {
          const content = containerContent(line.text, active.opening);
          if (content === null) {
            finish(null, line.start);
          } else {
            const closing = /^( {0,3})(`+|~+)[ \t]*$/.exec(content);
            if (closing && closing[2][0] === active.opening.fenceChar && closing[2].length >= active.opening.fenceLength) {
              finish(index, line.start);
            }
            continue;
          }
        }
        const opening = parseOpening(line.text);
        if (opening) active = { index, opening };
      }
      if (active) finish(null, text.length);
      return blocks;
    }
    function metadataStart(line, opening) {
      let index = opening.infoStart;
      while (/\s/.test(line[index] || "") && index < line.length) index++;
      const rest = line.slice(index);
      if (/^[^\s="'/{]+\s*=/.test(rest) || /^["'/{]/.test(rest)) return index;
      const language = /^\S+/.exec(rest);
      return language ? index + language[0].length : index;
    }
    function languageRange(line, opening) {
      let start = opening.infoStart;
      while (start < line.length && /\s/.test(line[start])) start++;
      const end = metadataStart(line, opening);
      return end > start ? { start, end } : null;
    }
    function readLanguage(openingLine) {
      requireString(openingLine, "openingLine");
      const opening = parseOpening(openingLine);
      if (!opening) return null;
      const language = languageRange(openingLine, opening);
      return language ? openingLine.slice(language.start, language.end) : null;
    }
    function updateLanguage(openingLine, newLanguage) {
      requireString(openingLine, "openingLine");
      requireString(newLanguage, "newLanguage");
      if (!/^[A-Za-z0-9][A-Za-z0-9_.+#-]*$/.test(newLanguage)) {
        throw new RangeError("Use a single language alias such as javascript, c++, or c#");
      }
      const opening = parseOpening(openingLine);
      if (!opening) throw new SyntaxError("Expected a supported opening fence line");
      const language = languageRange(openingLine, opening);
      if (language) {
        return openingLine.slice(0, language.start) + newLanguage + openingLine.slice(language.end);
      }
      const metadata = metadataStart(openingLine, opening);
      if (metadata < openingLine.length) {
        return openingLine.slice(0, metadata) + newLanguage + " " + openingLine.slice(metadata);
      }
      return openingLine.slice(0, opening.infoStart) + newLanguage + openingLine.slice(opening.infoStart);
    }
    function decodeQuoted(value, quote) {
      let decoded = "";
      for (let index = 0; index < value.length; index++) {
        if (value[index] === "\\" && (value[index + 1] === "\\" || value[index + 1] === quote)) {
          decoded += value[++index];
        } else {
          decoded += value[index];
        }
      }
      return decoded;
    }
    function optionOptions(line, opening, optionKey) {
      const start = metadataStart(line, opening);
      const input = line.slice(start);
      const masked = input.split("");
      const titles = [];
      for (let index = 0; index < input.length; index++) {
        if (index > 0 && !/\s/.test(input[index - 1])) continue;
        if (/\s/.test(input[index])) continue;
        const keyMatch = /^([^\s"'/{=]+)\s*=\s*/.exec(input.slice(index));
        const key = keyMatch ? keyMatch[1] : null;
        const valueStart = index + (keyMatch ? keyMatch[0].length : 0);
        const delimiter = input[valueStart];
        if (!['"', "'", "/", "{"].includes(delimiter)) continue;
        const endDelimiter = delimiter === "{" ? "}" : delimiter;
        let end = valueStart + 1;
        for (; end < input.length; end++) {
          if (input[end] === "\\") {
            end++;
          } else if (input[end] === endDelimiter && (end + 1 === input.length || /\s/.test(input[end + 1]))) {
            break;
          }
        }
        if (end >= input.length) continue;
        if (key && key.toLowerCase() === optionKey) {
          titles.push({
            start: start + valueStart,
            end: start + end + 1,
            quote: delimiter === '"' || delimiter === "'" ? delimiter : null,
            value: delimiter === '"' || delimiter === "'" ? decodeQuoted(input.slice(valueStart + 1, end), endDelimiter) : null,
            hasEquals: true,
            malformed: false
          });
        }
        for (let maskIndex = index; maskIndex <= end; maskIndex++) masked[maskIndex] = " ";
        index = end;
      }
      const simple = /([^\s=]+)(?:\s*=\s*(\S+))?/g;
      const remaining = masked.join("");
      let match;
      while (match = simple.exec(remaining)) {
        if (match[1].toLowerCase() !== optionKey) continue;
        const hasEquals = match[2] !== void 0;
        const valueStart = hasEquals ? match.index + match[0].lastIndexOf(match[2]) : match.index + match[1].length;
        const value = match[2];
        titles.push({
          start: start + valueStart,
          end: start + valueStart + (value ? value.length : 0),
          quote: null,
          value: hasEquals && value !== "true" && value !== "false" ? value : null,
          hasEquals,
          malformed: hasEquals ? /^["'/{]/.test(value) : /^\s*=/.test(remaining.slice(match.index + match[1].length))
        });
      }
      return titles.sort((a, b) => a.start - b.start);
    }
    function readTitle(openingLine) {
      requireString(openingLine, "openingLine");
      const opening = parseOpening(openingLine);
      if (!opening) return null;
      const titles = optionOptions(openingLine, opening, "title");
      if (titles.some((title) => title.malformed)) return null;
      const strings = titles.filter((title) => title.value !== null);
      return strings.length ? strings[strings.length - 1].value : null;
    }
    function readFrame(openingLine) {
      requireString(openingLine, "openingLine");
      const opening = parseOpening(openingLine);
      if (!opening) return null;
      const strings = optionOptions(openingLine, opening, "frame").filter((option) => !option.malformed && option.value !== null);
      return strings.length ? strings[strings.length - 1].value : null;
    }
    function encodeQuoted(value, quote) {
      return quote + value.replace(/\\/g, "\\\\").split(quote).join("\\" + quote) + quote;
    }
    function updateTitle(openingLine, newTitle) {
      requireString(openingLine, "openingLine");
      requireString(newTitle, "newTitle");
      if (!newTitle.trim()) throw new RangeError("Title must not be blank");
      if (Array.from(newTitle).some((char) => {
        const code = char.charCodeAt(0);
        return code < 32 || code >= 127 && code <= 159 || code === 8232 || code === 8233;
      })) {
        throw new RangeError("Title must not contain newlines or control characters");
      }
      const opening = parseOpening(openingLine);
      if (!opening) throw new SyntaxError("Expected a supported opening fence line");
      if (opening.fenceChar === "`" && newTitle.includes("`")) {
        throw new RangeError("A backtick fence title must not contain a backtick");
      }
      const titles = optionOptions(openingLine, opening, "title");
      if (titles.length > 1) throw new SyntaxError("Cannot edit duplicate title attributes safely");
      const title = titles[0];
      if (title && title.malformed) throw new SyntaxError("Cannot edit a malformed title attribute safely");
      if (title) {
        const safeBare = !/[\s"'/{]/.test(newTitle) && newTitle !== "true" && newTitle !== "false";
        const value = title.quote ? encodeQuoted(newTitle, title.quote) : title.hasEquals && safeBare ? newTitle : encodeQuoted(newTitle, '"');
        return openingLine.slice(0, title.start) + (title.hasEquals ? "" : "=") + value + openingLine.slice(title.end);
      }
      const trailing = /[ \t]*$/.exec(openingLine)[0];
      const end = openingLine.length - trailing.length;
      return openingLine.slice(0, end) + " title=" + encodeQuoted(newTitle, '"') + trailing;
    }
    module2.exports = { scanFences, readTitle, updateTitle, readLanguage, updateLanguage, readFrame };
  }
});

// src/callout-spacing.js
var require_callout_spacing = __commonJS({
  "src/callout-spacing.js"(exports2, module2) {
    "use strict";
    var { scanFences } = require_fence();
    var QUOTE = /^( {0,3})>[ \t]?/;
    var HEADER = /^ {0,3}\[![^\]\s]+\](?:[+-])?(?:[ \t].*)?$/;
    var LIST = /^( {0,3})(?:[-+*]|\d{1,9}[.)])([ \t]+)(.*)$/;
    function quoteContent(line) {
      const prefix = QUOTE.exec(line);
      return prefix ? line.slice(prefix[0].length) : null;
    }
    function isRootHeader(line) {
      const content = quoteContent(line);
      return content !== null && HEADER.test(content);
    }
    function interruptsParagraph(line) {
      return /^ {0,3}(?:#{1,6}(?:[ \t]|$)|`{3,}|~{3,}|>|\$\$|%%)/.test(line) || /^ {0,3}(?:\*[ \t]*){3,}$/.test(line) || /^ {0,3}(?:_[ \t]*){3,}$/.test(line) || /^ {0,3}(?:-[ \t]*){3,}$/.test(line) || /^ {0,3}(?:=+|-+)[ \t]*$/.test(line) || /^ {0,3}(?:[-+*]|1[.)])[ \t]+\S/.test(line) || /^ {0,3}(?:<|\[\^[^\]]+\]:)/.test(line);
    }
    function paragraphAfterQuote(content, wasParagraph) {
      let nested;
      while ((nested = quoteContent(content)) !== null) content = nested;
      const list = LIST.exec(content);
      if (list) content = list[3];
      if (!content.trim()) return false;
      if (/^ {0,3}</.test(content) || content.includes("|")) return false;
      if (/^(?: {4}|\t)/.test(content)) return wasParagraph;
      return !interruptsParagraph(content);
    }
    function maskComments(text) {
      const lines = text.split(/\r\n|\r|\n/);
      const fences = new Map(scanFences(text).map((fence) => [fence.lineStart, fence]));
      let close = null;
      let from = 0;
      if (/^\uFEFF?---[ \t]*$/.test(lines[0])) {
        from = 1;
        while (from < lines.length && !/^(?:---|\.\.\.)[ \t]*$/.test(lines[from])) from++;
        from++;
      }
      for (let row = from; row < lines.length; row++) {
        if (!close && /`{3,}|~{3,}/.test(lines[row])) {
          let fence = fences.get(row);
          let offset = 0;
          if (!fence) {
            fence = scanFences(lines.slice(row).join("\n"))[0];
            if (fence?.lineStart !== 0) fence = null;
            offset = row;
          }
          if (fence) {
            if (fence.lineEnd !== null) row = offset + fence.lineEnd;
            else {
              const source2 = offset ? lines.slice(offset).join("\n") : text;
              const end = source2.slice(0, Math.max(fence.openingStart, fence.bodyEnd - 1));
              row = offset + end.split(/\r\n|\r|\n/).length - 1;
            }
            continue;
          }
        }
        const source = lines[row];
        const chars = source.split("");
        for (let index = 0; index < source.length; ) {
          if (close) {
            const end = source.indexOf(close, index);
            const next = end === -1 ? source.length : end + close.length;
            chars.fill(" ", index, next);
            index = next;
            if (end !== -1) close = null;
            continue;
          }
          if (source[index] === "\\") {
            index += 2;
            continue;
          }
          if (source[index] === "`") {
            const run = /^`+/.exec(source.slice(index))[0];
            const ticks = /`+/g;
            ticks.lastIndex = index + run.length;
            let match;
            while ((match = ticks.exec(source)) && match[0].length !== run.length) {
            }
            index = match ? match.index + match[0].length : index + run.length;
            continue;
          }
          const opener = source.startsWith("%%", index) ? "%%" : source.startsWith("<!--", index) ? "<!--" : null;
          if (!opener) {
            index++;
            continue;
          }
          chars.fill(" ", index, index + opener.length);
          index += opener.length;
          close = opener === "%%" ? "%%" : "-->";
        }
        lines[row] = chars.join("");
      }
      return lines.join("\n");
    }
    function scanRootCallouts(text) {
      if (typeof text !== "string") throw new TypeError("text must be a string");
      text = maskComments(text);
      const lines = text.split(/\r\n|\r|\n/);
      const starts = [0];
      for (const match of text.matchAll(/\r\n|\r|\n/g)) starts.push(match.index + match[0].length);
      const lineAt = (position) => {
        let low = 0;
        let high = starts.length;
        while (low + 1 < high) {
          const middle = low + high >>> 1;
          if (starts[middle] <= position) low = middle;
          else high = middle;
        }
        return low;
      };
      const excluded = new Uint8Array(lines.length);
      for (const fence of scanFences(text)) {
        const end = fence.lineEnd === null ? lineAt(Math.max(fence.openingStart, fence.bodyEnd - 1)) : fence.lineEnd;
        excluded.fill(1, fence.lineStart, end + 1);
      }
      if (/^\uFEFF?---[ \t]*$/.test(lines[0])) {
        let end = 1;
        while (end < lines.length && !/^(?:---|\.\.\.)[ \t]*$/.test(lines[end])) end++;
        excluded.fill(1, 0, Math.min(lines.length, end + 1));
      }
      const result = [];
      let listIndent = null;
      let listBlank = false;
      let html = false;
      let math = false;
      function quoteEnd(start, splitHeaders) {
        let end = start;
        let paragraph = true;
        let quotedHtml = false;
        for (let index = start + 1; index < lines.length; index++) {
          const line = lines[index];
          const content = quoteContent(line);
          if (content !== null) {
            if (!excluded[index] && splitHeaders && isRootHeader(line)) break;
            end = index;
            if (excluded[index]) {
              paragraph = false;
              continue;
            }
            if (!content.trim()) quotedHtml = false;
            else if (/^ {0,3}</.test(content)) quotedHtml = true;
            paragraph = !quotedHtml && paragraphAfterQuote(content, paragraph);
            continue;
          }
          if (!line.trim() || excluded[index] || !paragraph || interruptsParagraph(line)) break;
          end = index;
        }
        return end;
      }
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if (excluded[index]) continue;
        if (math) {
          if (/\$\$[ \t]*$/.test(line)) math = false;
          continue;
        }
        if (!line.trim()) {
          html = false;
          listBlank = true;
          continue;
        }
        if (html) continue;
        if (/^ {0,3}</.test(line)) {
          html = true;
          continue;
        }
        if (/^ {0,3}\$\$/.test(line)) {
          math = !/\$\$[ \t]*$/.test(line.slice(line.indexOf("$$") + 2));
          continue;
        }
        if (listIndent !== null) {
          const indent = /^[ \t]*/.exec(line)[0].replace(/\t/g, "    ").length;
          if (indent >= listIndent || !listBlank && !interruptsParagraph(line)) continue;
          listIndent = null;
        }
        const list = LIST.exec(line);
        if (list) {
          listIndent = line.length - list[3].length;
          listBlank = false;
          continue;
        }
        if (quoteContent(line) === null) continue;
        const callout = isRootHeader(line);
        const end = quoteEnd(index, callout);
        if (callout) result.push({ start: index, end });
        index = end;
        listBlank = false;
      }
      return result;
    }
    module2.exports = { scanRootCallouts, maskComments };
  }
});

// src/math-spacing.js
var require_math_spacing = __commonJS({
  "src/math-spacing.js"(exports2, module2) {
    "use strict";
    var { scanFences } = require_fence();
    var { maskComments } = require_callout_spacing();
    var OPEN = /^ {0,3}\$\$(?!\$)/;
    var LIST = /^( {0,3})(?:[-+*]|\d{1,9}[.)])([ \t]+)(.*)$/;
    function closingDelimiter(line, from = 0) {
      const delimiter = /\$\$(?!\$)/g;
      delimiter.lastIndex = from;
      let match;
      while (match = delimiter.exec(line)) {
        if (line[match.index - 1] === "$") continue;
        let escapes = 0;
        for (let index = match.index - 1; index >= 0 && line[index] === "\\"; index--) escapes++;
        if (escapes % 2 === 0) return match.index;
      }
      return -1;
    }
    function scanRootMath(text) {
      if (typeof text !== "string") throw new TypeError("text must be a string");
      text = maskComments(text);
      const lines = text.split("\n");
      const fences = new Map(scanFences(text).map((fence) => [fence.lineStart, fence]));
      const result = [];
      let active = null;
      let listIndent = null;
      let listBlank = false;
      let html = false;
      let first = 0;
      if (/^\uFEFF?---[ \t]*$/.test(lines[0])) {
        first = 1;
        while (first < lines.length && !/^(?:---|\.\.\.)[ \t]*$/.test(lines[first])) first++;
        first++;
      }
      for (let index = first; index < lines.length; index++) {
        const line = lines[index];
        if (active !== null) {
          const close2 = closingDelimiter(line);
          if (close2 !== -1) {
            if (!line.slice(close2 + 2).trim()) result.push({ start: active, end: index });
            else result.push({ start: active, end: null });
            active = null;
          }
          continue;
        }
        if (!line.trim()) {
          html = false;
          listBlank = true;
          continue;
        }
        if (html) continue;
        if (/^ {0,3}</.test(line)) {
          html = true;
          continue;
        }
        if (listIndent !== null) {
          const indentation = /^[ \t]*/.exec(line)[0].replace(/\t/g, "    ").length;
          const interrupts = /^ {0,3}(?:#{1,6}(?:[ \t]|$)|>|`{3,}|~{3,}|\$\$)/.test(line);
          if (indentation >= listIndent || !listBlank && !interrupts && !LIST.test(line)) continue;
          listIndent = null;
        }
        const list = LIST.exec(line);
        if (list) {
          listIndent = line.length - list[3].length;
          listBlank = false;
        }
        if (/`{3,}|~{3,}/.test(line)) {
          let fence = fences.get(index);
          let offset = 0;
          if (!fence) {
            fence = scanFences(lines.slice(index).join("\n"))[0];
            if (fence?.lineStart !== 0) fence = null;
            offset = index;
          }
          if (fence) {
            if (fence.lineEnd !== null) index = offset + fence.lineEnd;
            else {
              const source = offset ? lines.slice(offset).join("\n") : text;
              index = offset + source.slice(0, Math.max(fence.openingStart, fence.bodyEnd - 1)).split("\n").length - 1;
            }
            continue;
          }
        }
        if (list || /^ {0,3}>/.test(line)) continue;
        const open = OPEN.exec(line);
        if (!open) continue;
        const close = closingDelimiter(line, open[0].length);
        if (close !== -1) {
          if (!line.slice(close + 2).trim()) result.push({ start: index, end: index });
        } else active = index;
      }
      if (active !== null) result.push({ start: active, end: null });
      return result;
    }
    module2.exports = { scanRootMath };
  }
});

// src/code-features.js
var require_code_features = __commonJS({
  "src/code-features.js"(exports2, module2) {
    "use strict";
    var { Component, MarkdownRenderChild, TFile, Notice: Notice2, editorInfoField } = require("obsidian");
    var { ViewPlugin, Decoration } = require("@codemirror/view");
    var { StateEffect } = require("@codemirror/state");
    var settingsChanged = StateEffect.define();
    var { scanFences, readTitle, updateTitle, readLanguage, updateLanguage, readFrame } = require_fence();
    var { scanRootCallouts } = require_callout_spacing();
    var { scanRootMath } = require_math_spacing();
    function editorDecorations(state, spacing, emptyLineMarks) {
      if (!spacing && !emptyLineMarks) return Decoration.none;
      const text = state.doc.toString();
      const ranges = [];
      for (const { start, end } of spacing ? scanRootCallouts(text) : []) {
        if (start === end) {
          ranges.push(Decoration.line({ class: "an-callout-source-start an-callout-source-end" }).range(state.doc.line(start + 1).from));
        } else {
          ranges.push(Decoration.line({ class: "an-callout-source-start" }).range(state.doc.line(start + 1).from));
          ranges.push(Decoration.line({ class: "an-callout-source-end" }).range(state.doc.line(end + 1).from));
        }
      }
      for (const { start, end } of spacing ? scanRootMath(text) : []) {
        if (start === end) {
          ranges.push(Decoration.line({ class: "nn-math-source-begin nn-math-source-end" }).range(state.doc.line(start + 1).from));
        } else {
          ranges.push(Decoration.line({ class: "nn-math-source-begin" }).range(state.doc.line(start + 1).from));
          if (end !== null) ranges.push(Decoration.line({ class: "nn-math-source-end" }).range(state.doc.line(end + 1).from));
        }
      }
      if (emptyLineMarks) {
        let from = 0;
        for (const line of text.split("\n")) {
          if (line.length === 0) ranges.push(Decoration.line({ class: "an-empty-source-line" }).range(from));
          from += line.length + 1;
        }
      }
      return Decoration.set(ranges, true);
    }
    var TITLE = ".expressive-code > .frame > .header > :is(.title, .an-code-language-label)";
    var COPY_FEEDBACK = ".expressive-code > .frame > .copy .feedback";
    function removeCopyFeedbackPortal(record) {
      record.portal?.remove();
      record.portal = null;
      record.stopPositioning?.();
      record.stopPositioning = null;
    }
    function positionCopyFeedback(record) {
      const { portal, button } = record;
      if (!portal) return;
      if (!button.isConnected) {
        removeCopyFeedbackPortal(record);
        return;
      }
      const win = button.ownerDocument.defaultView;
      const anchor = button.getBoundingClientRect();
      const bounds = portal.getBoundingClientRect();
      const width = win.innerWidth;
      const height = win.innerHeight;
      if (anchor.bottom < 0 || anchor.top > height || anchor.right < 0 || anchor.left > width) {
        removeCopyFeedbackPortal(record);
        return;
      }
      const left = Math.max(8, Math.min(anchor.right - bounds.width, width - bounds.width - 8));
      const above = anchor.top - bounds.height - 8;
      const top = above >= 8 ? above : Math.min(anchor.bottom + 8, height - bounds.height - 8);
      portal.style.setProperty("--nn-copy-feedback-left", `${left}px`);
      portal.style.setProperty("--nn-copy-feedback-top", `${Math.max(8, top)}px`);
      portal.classList.toggle("nn-copy-feedback-below", above < 8);
    }
    function syncCopyFeedback(record) {
      const { feedback, button } = record;
      if (!feedback.isConnected || !button.isConnected || !feedback.classList.contains("show")) {
        removeCopyFeedbackPortal(record);
        return;
      }
      if (!record.portal) {
        const doc = feedback.ownerDocument;
        const win = doc.defaultView;
        const portal = record.portal = doc.createElement("div");
        portal.className = "nn-copy-feedback-portal";
        portal.setAttribute("role", "status");
        portal.setAttribute("aria-live", "polite");
        doc.body.appendChild(portal);
        let pending = null;
        const reposition = () => {
          if (pending !== null) return;
          if (!win.requestAnimationFrame) {
            positionCopyFeedback(record);
            return;
          }
          pending = win.requestAnimationFrame(() => {
            pending = null;
            positionCopyFeedback(record);
          });
        };
        win.addEventListener("resize", reposition);
        doc.addEventListener("scroll", reposition, true);
        record.stopPositioning = () => {
          if (pending !== null) win.cancelAnimationFrame(pending);
          win.removeEventListener("resize", reposition);
          doc.removeEventListener("scroll", reposition, true);
        };
      }
      const message = feedback.textContent.trim();
      if (record.portal.textContent !== message) record.portal.textContent = message;
      positionCopyFeedback(record);
    }
    var LANGUAGE_NAMES = {
      ts: "TypeScript",
      typescript: "TypeScript",
      js: "JavaScript",
      javascript: "JavaScript",
      jsx: "JSX",
      tsx: "TSX",
      py: "Python",
      python: "Python",
      sh: "Shell",
      shell: "Shell",
      bash: "Bash",
      zsh: "Zsh",
      html: "HTML",
      css: "CSS",
      json: "JSON",
      jsonc: "JSONC",
      md: "Markdown",
      markdown: "Markdown",
      yaml: "YAML",
      yml: "YAML",
      sql: "SQL",
      swift: "Swift",
      rust: "Rust",
      go: "Go",
      java: "Java",
      text: "Plain text",
      txt: "Plain text",
      plaintext: "Plain text"
    };
    function languageName(language) {
      return LANGUAGE_NAMES[language.toLowerCase()] || language || "Code";
    }
    function titleHint(title) {
      const placeholder = title.classList.contains("an-code-title-placeholder") || title.classList.contains("an-code-language-label");
      title.setAttribute("aria-label", placeholder ? `Language: ${title.textContent.trim()}` : `Filename: ${title.textContent.trim()}`);
      title.setAttribute("title", placeholder ? "Change language \xB7 Enter to save \xB7 Esc to cancel" : "Rename file \xB7 Enter to save \xB7 Esc to cancel");
    }
    var TitleRegion = class extends MarkdownRenderChild {
      constructor(element, context, plugin) {
        super(element);
        this.context = context;
        this.plugin = plugin;
        this.decorated = /* @__PURE__ */ new Map();
        this.copyFeedback = /* @__PURE__ */ new Map();
      }
      onload() {
        this.regionLoaded = true;
        this.refreshSettings();
      }
      refreshSettings() {
        const display = this.regionLoaded && this.plugin.running;
        if (!this.plugin.host.featureEnabled("codeHeaders") && this.plugin.active?.region === this) this.plugin.close(this.plugin.active, false);
        if (!display) {
          if (this.plugin.active?.region === this) this.plugin.close(this.plugin.active, false);
          if (this.behavior) {
            this.removeChild(this.behavior);
            this.behavior = null;
          }
          this.scan = null;
          for (const [title, record] of this.decorated) this.release(title, record);
          for (const [feedback, record] of this.copyFeedback) this.releaseCopyFeedback(feedback, record);
          return;
        }
        if (this.behavior) {
          this.scan();
          return;
        }
        const behavior = this.behavior = this.addChild(new Component());
        this.scan = () => {
          const active = this.plugin.active;
          if (active?.region === this && active.input && !active.input.isConnected && !active.saving) this.plugin.close(active, false);
          for (const [title, record] of this.decorated) {
            if (!this.containerEl.contains(title)) this.release(title, record);
          }
          for (const [feedback, record] of this.copyFeedback) {
            if (!this.containerEl.contains(feedback) || !record.button.isConnected) this.releaseCopyFeedback(feedback, record);
          }
          for (const feedback of this.containerEl.querySelectorAll(COPY_FEEDBACK)) this.claimCopyFeedback(feedback);
          for (const frame of this.containerEl.querySelectorAll(".expressive-code > .frame")) {
            const header = frame.querySelector(":scope > .header");
            if (!header) continue;
            const info = this.info(frame);
            let sourceFence = null;
            if (info) {
              if (this.sourceText !== info.text) {
                this.sourceText = info.text;
                this.sourceFences = scanFences(info.text);
              }
              const inside = this.sourceFences.filter((f) => f.lineStart >= info.lineStart && f.lineEnd !== null && f.lineEnd <= info.lineEnd);
              sourceFence = this.sourceFences.find((f) => f.lineStart === info.lineStart) || (inside.length === 1 ? inside[0] : null);
            }
            if (sourceFence && readFrame(sourceFence.openingLine) === "none") {
              for (const [target2, record] of this.decorated) if (record.frame === frame) this.release(target2, record);
              continue;
            }
            const language = sourceFence ? readLanguage(sourceFence.openingLine) || "" : frame.querySelector(":scope > pre")?.dataset.language || "";
            let title = header.querySelector(":scope > .title");
            const created = !title;
            if (!title) {
              title = header.ownerDocument.createElement("span");
              title.className = "title";
              header.prepend(title);
            }
            const placeholder = title.classList.contains("an-code-title-placeholder") || !title.textContent.trim() && !title.querySelector("input");
            const titleRecord = this.claim(title, {
              frame,
              created,
              placeholder,
              addedHeader: !frame.classList.contains("has-title"),
              originalNodes: placeholder ? [...title.childNodes] : null
            });
            if (titleRecord) {
              if (placeholder) {
                title.classList.add("an-code-title-placeholder");
                frame.classList.add("has-title");
                this.showLanguage(title, language);
              }
              const filename = sourceFence && readTitle(sourceFence.openingLine);
              this.setEditable(title, titleRecord, !!sourceFence && (placeholder || filename !== null && filename !== ""));
            }
            let languageLabel = header.querySelector(":scope > .an-code-language-label");
            if (placeholder || !this.plugin.host.featureEnabled("codeLanguages")) {
              const oldRecord = languageLabel && this.decorated.get(languageLabel);
              if (oldRecord) this.release(languageLabel, oldRecord);
              continue;
            }
            const createdLanguage = !languageLabel;
            if (!languageLabel) {
              languageLabel = header.ownerDocument.createElement("span");
              languageLabel.className = "an-code-language-label";
              title.after(languageLabel);
            }
            const languageRecord = this.claim(languageLabel, { frame, created: createdLanguage, placeholder: false, addedHeader: false, originalNodes: null });
            if (languageRecord) {
              this.showLanguage(languageLabel, language);
              this.setEditable(languageLabel, languageRecord, !!sourceFence);
            }
          }
        };
        this.scan();
        const Observer = this.containerEl.ownerDocument.defaultView.MutationObserver;
        const observer = new Observer((changes) => {
          if (changes.some((change) => change.type === "childList")) this.scan?.();
          else for (const change of changes) {
            const record = this.copyFeedback.get(change.target);
            if (record) syncCopyFeedback(record);
          }
        });
        observer.observe(this.containerEl, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
        behavior.register(() => observer.disconnect());
        const target = (event) => {
          const title = event.target?.closest?.(TITLE);
          return title?.classList.contains("an-code-title-editable") && this.containerEl.contains(title) && this.plugin.titleRegions.get(title) === this ? title : null;
        };
        behavior.registerDomEvent(this.containerEl, "pointerdown", (event) => {
          const title = target(event);
          if (!title) return;
          event.stopPropagation();
          if (!event.target.closest("input")) event.preventDefault();
        }, true);
        behavior.registerDomEvent(this.containerEl, "click", (event) => {
          const title = target(event);
          if (!title || event.target.closest("input")) return;
          event.preventDefault();
          event.stopPropagation();
          void this.plugin.begin(title, this);
        }, true);
        behavior.registerDomEvent(this.containerEl, "keydown", (event) => {
          const title = target(event);
          if (!title || event.target.closest("input") || !["Enter", " ", "F2"].includes(event.key)) return;
          event.preventDefault();
          event.stopPropagation();
          void this.plugin.begin(title, this);
        });
      }
      claimCopyFeedback(feedback) {
        const previous = this.plugin.copyFeedbackRegions.get(feedback);
        if (previous && previous !== this && this.containerEl.contains(previous.containerEl)) return;
        let record = this.copyFeedback.get(feedback);
        if (!record) {
          const button = feedback.closest(".copy")?.querySelector(":scope > button");
          if (!button) return;
          record = previous?.copyFeedback.get(feedback) || {
            feedback,
            button,
            portal: null,
            stopPositioning: null,
            ariaHidden: feedback.getAttribute("aria-hidden"),
            ownedClass: !feedback.classList.contains("nn-copy-feedback-source")
          };
          if (previous && previous !== this) previous.copyFeedback.delete(feedback);
          this.copyFeedback.set(feedback, record);
          this.plugin.copyFeedbackRegions.set(feedback, this);
          if (record.ownedClass && !feedback.classList.contains("nn-copy-feedback-source")) feedback.classList.add("nn-copy-feedback-source");
          feedback.setAttribute("aria-hidden", "true");
        }
        syncCopyFeedback(record);
      }
      releaseCopyFeedback(feedback, record) {
        if (this.plugin.copyFeedbackRegions.get(feedback) === this) {
          removeCopyFeedbackPortal(record);
          if (record.ownedClass) feedback.classList.remove("nn-copy-feedback-source");
          if (record.ariaHidden === null) feedback.removeAttribute("aria-hidden");
          else feedback.setAttribute("aria-hidden", record.ariaHidden);
          this.plugin.copyFeedbackRegions.delete(feedback);
        }
        this.copyFeedback.delete(feedback);
      }
      claim(title, record) {
        const previous = this.plugin.titleRegions.get(title);
        if (previous && previous !== this && this.containerEl.contains(previous.containerEl)) return null;
        this.plugin.titleRegions.set(title, this);
        if (this.decorated.has(title)) return this.decorated.get(title);
        const inherited = previous?.decorated.get(title);
        if (inherited) previous.decorated.delete(title);
        const owned = inherited || {
          ...record,
          attrs: Object.fromEntries(["role", "tabindex", "aria-label", "title"].map((key) => [key, title.getAttribute(key)]))
        };
        this.decorated.set(title, owned);
        return owned;
      }
      showLanguage(title, language) {
        if (this.plugin.active?.title === title || title.querySelector("input")) return;
        const record = this.decorated.get(title);
        if (record?.language === language && title.textContent) return;
        if (record) record.language = language;
        const label = languageName(language);
        if (title.textContent !== label) title.textContent = label;
      }
      setEditable(title, record, mapped) {
        if (this.plugin.active?.title === title) return;
        const editable = mapped && this.plugin.running && this.plugin.host.featureEnabled("codeHeaders") && (!title.classList.contains("an-code-language-label") || this.plugin.host.featureEnabled("codeLanguages")) && !!title.closest(".markdown-source-view");
        title.classList.toggle("an-code-title-editable", editable);
        if (editable) {
          title.setAttribute("role", "button");
          title.setAttribute("tabindex", "0");
          titleHint(title);
        } else {
          for (const [key, value] of Object.entries(record.attrs)) {
            if (value === null) title.removeAttribute(key);
            else title.setAttribute(key, value);
          }
        }
      }
      info(title) {
        try {
          return this.context.getSectionInfo(title) || this.context.getSectionInfo(this.containerEl);
        } catch {
          return null;
        }
      }
      onunload() {
        this.regionLoaded = false;
        this.refreshSettings();
      }
      release(title, record) {
        if (this.plugin.active?.title === title) this.plugin.close(this.plugin.active, false);
        if (this.plugin.titleRegions.get(title) === this) {
          title.classList.remove("an-code-title-editable", "an-code-title-placeholder");
          for (const [key, value] of Object.entries(record.attrs)) {
            if (value === null) title.removeAttribute(key);
            else title.setAttribute(key, value);
          }
          if (record.created) title.remove();
          else if (record.placeholder) title.replaceChildren(...record.originalNodes);
          if (record.addedHeader) record.frame.classList.remove("has-title");
          this.plugin.titleRegions.delete(title);
        }
        this.decorated.delete(title);
      }
    };
    var CodeFeatures2 = class extends Component {
      constructor(host) {
        super();
        this.host = host;
        this.app = host.app;
        this.titleRegions = /* @__PURE__ */ new WeakMap();
        this.copyFeedbackRegions = /* @__PURE__ */ new WeakMap();
        this.regions = /* @__PURE__ */ new Map();
        this.liveRegions = /* @__PURE__ */ new Set();
        this.editorPlugins = /* @__PURE__ */ new Set();
        this.active = null;
        this.running = false;
        this.registered = false;
      }
      onload() {
        this.running = true;
        if (this.registered) {
          this.refreshSettings();
          return;
        }
        this.registered = true;
        const createEditorPlugin = (owner) => class {
          constructor(view) {
            this.view = view;
            this.decorations = owner.editorDecorations(view.state);
            const context = {
              editorView: view,
              get sourcePath() {
                return view.state.field(editorInfoField, false)?.file?.path || "";
              },
              getSectionInfo(element) {
                const widget = element.closest(".cm-embed-block");
                if (!widget || !view.contentDOM.contains(widget)) return null;
                const parent = widget.parentElement;
                const index = [...parent.childNodes].indexOf(widget);
                const start = view.posAtDOM(parent, index);
                const end = view.posAtDOM(parent, index + 1);
                return {
                  text: view.state.doc.toString(),
                  lineStart: view.state.doc.lineAt(start).number - 1,
                  lineEnd: view.state.doc.lineAt(end).number - 1
                };
              }
            };
            this.region = new TitleRegion(view.contentDOM, context, owner);
            owner.editorPlugins.add(this);
            owner.liveRegions.add(this.region);
            this.region.load();
          }
          update(update) {
            const settingsUpdate = update.transactions.some((transaction) => transaction.effects.some((effect) => effect.is(settingsChanged)));
            if (update.docChanged || settingsUpdate) {
              this.decorations = owner.editorDecorations(update.state);
            }
            if (settingsUpdate) this.region.refreshSettings();
          }
          destroy() {
            this.region.unload();
            owner.liveRegions.delete(this.region);
            owner.editorPlugins.delete(this);
          }
        };
        this.host.registerEditorExtension(ViewPlugin.fromClass(createEditorPlugin(this), { decorations: (plugin) => plugin.decorations }));
        this.host.registerMarkdownPostProcessor((element, context) => {
          if (!this.running || !context.sourcePath?.toLowerCase().endsWith(".md")) return;
          const codeContainer = 'pre, .expressive-code, [class^="block-language-"], [class*=" block-language-"]';
          if (!element.matches(codeContainer) && !element.querySelector(codeContainer)) return;
          const existing = this.regions.get(element);
          if (existing) {
            existing.context = context;
            existing.refreshSettings();
            return;
          }
          const region = new TitleRegion(element, context, this);
          this.regions.set(element, region);
          region.register(() => this.regions.delete(element));
          context.addChild(region);
        }, 1001);
      }
      spacingEnabled() {
        return this.running && this.host.featureEnabled("blockSpacing");
      }
      editorDecorations(state) {
        return editorDecorations(state, this.spacingEnabled(), this.running && this.host.featureEnabled("emptyLineMarks"));
      }
      refreshSettings() {
        if (!this.running || !this.host.featureEnabled("codeHeaders")) {
          if (this.active) this.close(this.active, false);
        }
        for (const region of this.regions.values()) region.refreshSettings();
        for (const controller of this.editorPlugins) {
          controller.view.dispatch({ effects: settingsChanged.of(null), scrollIntoView: false });
        }
      }
      sourceEditor(file, title) {
        const views = this.app.workspace.getLeavesOfType("markdown").map((leaf) => leaf.view).filter((view) => view.file?.path === file.path && view.getMode() === "source" && view.editor);
        return views.find((view) => view.containerEl.contains(title))?.editor || null;
      }
      sourceView(file, title) {
        for (const region of this.liveRegions || []) {
          const view = region.context.editorView;
          if (region.context.sourcePath === file.path && view?.contentDOM.isConnected && view.contentDOM.contains(title)) return view;
        }
        return null;
      }
      async anchorFor(title, region) {
        const file = this.app.vault.getAbstractFileByPath(region.context.sourcePath);
        if (!(file instanceof TFile) || file.extension.toLowerCase() !== "md") throw new Error("This title needs a Markdown note to edit.");
        const editor = this.sourceEditor(file, title);
        const text = editor ? editor.getValue() : await this.app.vault.read(file);
        const info = region.info(title);
        if (!info) throw new Error("The block is still rendering. Click its title again in a moment.");
        if (info.text.replace(/\r\n/g, "\n") !== text.replace(/\r\n/g, "\n")) {
          throw new Error("The displayed block is still updating. Click its title again in a moment.");
        }
        const label = title.textContent.trim();
        const placeholder = title.classList?.contains("an-code-title-placeholder") || false;
        const explicitLanguage = title.classList?.contains("an-code-language-label") || false;
        const language = placeholder || explicitLanguage;
        const matchesLabel = (fence2) => {
          if (explicitLanguage) return languageName(readLanguage(fence2.openingLine) || "") === label;
          const value = readTitle(fence2.openingLine);
          return placeholder ? value === null || value === "" : value === label;
        };
        const fences = scanFences(text).filter((fence2) => fence2.lineEnd !== null);
        const exact = fences.find((fence2) => fence2.lineStart === info.lineStart);
        let fence = exact;
        if (!fence) {
          const matches = fences.filter((f) => f.lineStart >= info.lineStart && f.lineEnd <= info.lineEnd && matchesLabel(f));
          if (matches.length === 1) fence = matches[0];
        }
        if (!fence || !matchesLabel(fence)) {
          throw new Error("Could not locate this exact code block. Use its Edit button and try again.");
        }
        return {
          file,
          fence,
          label,
          kind: language ? "language" : "title",
          value: language ? readLanguage(fence.openingLine) || "" : readTitle(fence.openingLine) || "",
          placeholder,
          sourceText: text
        };
      }
      async begin(title, region) {
        if (!this.running || !this.host.featureEnabled("codeHeaders") || !title.closest(".markdown-source-view")) return;
        if (title.classList?.contains("an-code-language-label") && !this.host.featureEnabled("codeLanguages")) return;
        if (this.active?.title === title) return;
        if (this.active) await this.save(this.active, false);
        if (this.active || !title.isConnected) return;
        const session = { title, region, input: null, anchor: null, closed: false, saving: false };
        this.active = session;
        try {
          session.anchor = await this.anchorFor(title, region);
          if (session.closed || this.active !== session || !this.running || !this.host.featureEnabled("codeHeaders") || title.classList?.contains("an-code-language-label") && !this.host.featureEnabled("codeLanguages") || !title.isConnected || !title.closest(".markdown-source-view")) {
            this.close(session, false);
            return;
          }
          const input = title.ownerDocument.createElement("input");
          session.input = input;
          input.type = "text";
          input.className = "an-code-title-input";
          input.value = session.anchor.value;
          const fieldName = session.anchor.kind === "language" ? "Language" : "Filename";
          input.placeholder = fieldName;
          const label = title.ownerDocument.createElement("span");
          label.id = "an-code-title-label";
          label.className = "an-code-title-field-label";
          label.textContent = fieldName;
          input.setAttribute("aria-labelledby", label.id);
          input.setAttribute("enterkeyhint", "done");
          input.spellcheck = false;
          input.autocomplete = "off";
          input.autocapitalize = "off";
          title.classList.add("an-code-title-editing");
          title.removeAttribute("role");
          title.removeAttribute("tabindex");
          title.removeAttribute("aria-label");
          title.removeAttribute("title");
          title.replaceChildren(label, input);
          const resize = () => {
            input.style.width = `${Math.max(14, input.value.length + 2)}ch`;
          };
          resize();
          input.addEventListener("input", () => {
            resize();
            input.removeAttribute("aria-invalid");
            input.setCustomValidity("");
          });
          input.addEventListener("pointerdown", (event) => event.stopPropagation());
          input.addEventListener("click", (event) => event.stopPropagation());
          input.addEventListener("keydown", (event) => {
            event.stopPropagation();
            if (event.key === "Escape" && !event.isComposing) {
              event.preventDefault();
              this.close(session, true);
            } else if (event.key === "Enter" && !event.isComposing) {
              event.preventDefault();
              void this.save(session, true);
            }
          });
          input.addEventListener("blur", () => {
            if (input.isConnected && !session.closed && !session.saving) void this.save(session, false);
          });
          input.focus({ preventScroll: true });
          input.select();
        } catch (error) {
          this.close(session, false);
          new Notice2(error.message || "Could not edit this code title.");
        }
      }
      currentFence(text, session) {
        if (text !== session.anchor.sourceText) {
          throw new Error("The note changed while its title was being edited. Please try again.");
        }
        const original = session.anchor.fence;
        const exact = scanFences(text).find((f) => f.lineStart === original.lineStart && f.lineEnd === original.lineEnd && f.openingLine === original.openingLine && f.body === original.body);
        if (exact) return exact;
        throw new Error("The code block changed while its title was being edited. Please try again.");
      }
      async save(session, refocus) {
        if (session.closed || session.saving || !session.input || !session.anchor) return;
        if (!this.running || !this.host.featureEnabled("codeHeaders") || !session.title.closest?.(".markdown-source-view") || session.title.classList?.contains("an-code-language-label") && !this.host.featureEnabled("codeLanguages")) {
          this.close(session, false);
          return;
        }
        if (!session.input.isConnected) {
          this.close(session, false);
          return;
        }
        const value = session.input.value.trim();
        if (value === (session.anchor.value ?? session.anchor.label)) {
          this.close(session, refocus);
          return;
        }
        const update = session.anchor.kind === "language" ? updateLanguage : updateTitle;
        try {
          update(session.anchor.fence.openingLine, value);
        } catch (error) {
          session.input.setAttribute("aria-invalid", "true");
          session.input.setCustomValidity(error.message);
          if (refocus) session.input.reportValidity();
          else {
            new Notice2(error.message);
            this.close(session, false);
          }
          return;
        }
        session.saving = true;
        session.input.disabled = true;
        try {
          const { file } = session.anchor;
          if (this.app.vault.getAbstractFileByPath(file.path) !== file) throw new Error("The note is no longer available.");
          const view = this.sourceView(file, session.title);
          const editor = view ? null : this.sourceEditor(file, session.title);
          if (view) {
            const fence = this.currentFence(view.state.doc.toString(), session);
            const line = view.state.doc.line(fence.lineStart + 1);
            const changes = view.state.changes({ from: line.from, to: line.to, insert: update(fence.openingLine, value) });
            const scroll = view.scrollSnapshot().map(changes);
            view.dispatch({ changes, effects: scroll ? [scroll] : [], scrollIntoView: false, userEvent: "input" });
          } else if (editor) {
            const fence = this.currentFence(editor.getValue(), session);
            editor.replaceRange(
              update(fence.openingLine, value),
              { line: fence.lineStart, ch: 0 },
              { line: fence.lineStart, ch: fence.openingLine.length }
            );
          } else {
            await this.app.vault.process(file, (text) => {
              if (session.closed || !this.running || !this.host.featureEnabled("codeHeaders") || !session.title.closest?.(".markdown-source-view") || session.title.classList?.contains("an-code-language-label") && !this.host.featureEnabled("codeLanguages")) throw new Error("The edit was cancelled.");
              const fence = this.currentFence(text, session);
              return text.slice(0, fence.openingStart) + update(fence.openingLine, value) + text.slice(fence.openingEnd);
            });
          }
          this.close(session, refocus, value);
        } catch (error) {
          this.close(session, refocus);
          new Notice2(error.message || "Could not save the code title.");
        }
      }
      close(session, refocus, value) {
        if (session.closed) return;
        session.closed = true;
        if (this.active === session) this.active = null;
        const title = session.title;
        const display = value !== void 0 && session.anchor?.kind === "language" ? languageName(value) : value;
        if (session.input && title.contains(session.input)) title.replaceChildren(title.ownerDocument.createTextNode(display ?? session.anchor?.label ?? ""));
        title.classList.remove("an-code-title-editing");
        const record = session.region?.decorated?.get(title);
        if (record) session.region.setEditable(title, record, true);
        else if (this.running && this.host.featureEnabled("codeHeaders") && title.closest?.(".markdown-source-view")) {
          title.setAttribute("role", "button");
          title.setAttribute("tabindex", "0");
          titleHint(title);
        }
        if (refocus && title.isConnected && this.running && this.host.featureEnabled("codeHeaders")) title.focus({ preventScroll: true });
      }
      onunload() {
        this.running = false;
        this.refreshSettings();
        for (const region of [...this.regions.values()]) region.unload();
        this.regions.clear();
        for (const region of this.liveRegions) region.unload();
        this.liveRegions.clear();
      }
    };
    module2.exports = { CodeFeatures: CodeFeatures2, editorDecorations };
  }
});

// src/outline.js
var require_outline = __commonJS({
  "src/outline.js"(exports2, module2) {
    "use strict";
    var { Component, Platform, prepareFuzzySearch } = require("obsidian");
    var { scanFences } = require_fence();
    var { maskComments } = require_callout_spacing();
    var { setLocalIcon } = require_icons();
    function headingLabel(text) {
      return String(text).replace(/!?(?:\[\[)([^\]]+)\]\]/g, (_, target) => target.split("|").pop()).replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/<[^>]*>/g, "").replace(/`+([^`]+)`+/g, "$1").replace(/(\*\*|__|~~)(.*?)\1/g, "$2").replace(/(^|[\s([{])([*_])([^*_]+)\2(?=$|[\s.,!?;:)\]}])/g, "$1$3").replace(/\\([\\`*{}[\]()#+.!_>~-])/g, "$1").replace(/\s+/g, " ").trim() || "Untitled heading";
    }
    function scanHeadings(source) {
      if (typeof source !== "string") throw new TypeError("source must be a string");
      const text = maskComments(source.replace(/^\uFEFF/, "")).replace(/\r\n?|\n/g, "\n");
      const lines = text.split("\n"), excluded = /* @__PURE__ */ new Set();
      for (const fence of scanFences(text)) {
        const end = fence.lineEnd ?? text.slice(0, Math.max(fence.openingStart, fence.bodyEnd - 1)).split("\n").length - 1;
        for (let line = fence.lineStart; line <= end; line++) excluded.add(line);
      }
      if (/^---[ \t]*$/.test(lines[0])) {
        let end = 1;
        while (end < lines.length && !/^(?:---|\.\.\.)[ \t]*$/.test(lines[end])) end++;
        for (let line = 0; line <= end; line++) excluded.add(line);
      }
      const headings = [];
      let paragraph = null, rawTag = null, math = false;
      const add = (line, level, heading) => headings.push({ line, level, heading: headingLabel(heading), id: `${line}:${level}` });
      for (let line = 0; line < lines.length; line++) {
        if (excluded.has(line)) {
          paragraph = null;
          continue;
        }
        let content = lines[line], quoteDepth = 0;
        while (/^ {0,3}>[ \t]?/.test(content)) {
          content = content.replace(/^ {0,3}>[ \t]?/, "");
          quoteDepth++;
        }
        const list = /^ {0,3}(?:[-+*]|\d{1,9}[.)])[ \t]+/.exec(content);
        if (list) content = content.slice(list[0].length);
        if (rawTag) {
          if (new RegExp(`</${rawTag}\\s*>`, "i").test(content)) rawTag = null;
          paragraph = null;
          continue;
        }
        const rawOpen = /^ {0,3}<(script|style|pre|textarea)(?:\s|>)/i.exec(content);
        if (rawOpen) {
          if (!new RegExp(`</${rawOpen[1]}\\s*>`, "i").test(content)) rawTag = rawOpen[1];
          paragraph = null;
          continue;
        }
        if (/^\s*\$\$/.test(content)) {
          if (!/^\s*\$\$.+\$\$\s*$/.test(content)) math = !math;
          paragraph = null;
          continue;
        }
        if (math || /^(?: {4}|\t)/.test(content)) {
          paragraph = null;
          continue;
        }
        const atx = /^ {0,3}(#{1,6})(?:[ \t]+(.*)|[ \t]*)$/.exec(content);
        if (atx) {
          add(line, atx[1].length, (atx[2] || "").replace(/[ \t]+#+[ \t]*$/, ""));
          paragraph = null;
          continue;
        }
        const setext = /^ {0,3}(=+|-+)[ \t]*$/.exec(content);
        if (setext && paragraph && paragraph.depth === quoteDepth && !list) {
          add(paragraph.line, setext[1][0] === "=" ? 1 : 2, paragraph.text);
          paragraph = null;
          continue;
        }
        if (!content.trim() || list || setext || /^ {0,3}(?:<|\[![^\]]+\]|(?:\*[ \t]*){3,}$|(?:_[ \t]*){3,}$|(?:-[ \t]*){3,}$)/.test(content)) {
          paragraph = null;
          continue;
        }
        if (paragraph && paragraph.depth === quoteDepth) paragraph.text += " " + content.trim();
        else paragraph = { line, depth: quoteDepth, text: content.trim() };
      }
      return headings;
    }
    function cachedHeadings(cache) {
      return (cache?.headings || []).filter((item) => Number.isInteger(item.position?.start?.line) && item.level >= 1 && item.level <= 6).map((item) => ({ line: item.position.start.line, level: item.level, heading: headingLabel(item.heading), id: `${item.position.start.line}:${item.level}` }));
    }
    function headingTree(headings) {
      const roots = [], stack = [];
      for (const heading of headings) {
        const node = { ...heading, children: [] };
        while (stack.length && stack[stack.length - 1].level >= node.level) stack.pop();
        (stack.length ? stack[stack.length - 1].children : roots).push(node);
        stack.push(node);
      }
      return roots;
    }
    function searchTree(nodes, query) {
      const term = query.normalize("NFKC").trim().toLocaleLowerCase();
      if (!term) return nodes;
      const match = prepareFuzzySearch(term);
      const visit = (entries) => entries.flatMap((node) => {
        const children = visit(node.children);
        const matched = match(node.heading.normalize("NFKC").toLocaleLowerCase()) !== null;
        return matched || children.length ? [{ ...node, children, matched }] : [];
      });
      return visit(nodes);
    }
    function headingAtLine(headings, line) {
      let active = null;
      for (const heading of headings) {
        if (heading.line > line) break;
        active = heading;
      }
      return active || headings[0] || null;
    }
    var nextId = 0;
    var OutlinePane = class extends Component {
      constructor(owner, leaf) {
        super();
        this.owner = owner;
        this.leaf = leaf;
        this.view = leaf.view;
        this.root = this.view.containerEl;
        this.doc = this.root.ownerDocument;
        this.win = this.doc.defaultView;
        this.headings = [];
        this.collapsed = /* @__PURE__ */ new Set();
        this.rows = /* @__PURE__ */ new Map();
        this.open = false;
      }
      onload() {
        const actions = this.root.querySelector(".view-actions");
        if (!actions) return;
        this.addedHost = !this.root.classList.contains("nn-outline-host");
        this.root.classList.add("nn-outline-host");
        this.button = this.doc.createElement("button");
        this.button.type = "button";
        this.button.className = "clickable-icon view-action nn-outline-button";
        this.button.setAttribute("aria-label", "Outline");
        this.button.setAttribute("aria-expanded", "false");
        setLocalIcon(this.button, "list-tree");
        actions.prepend(this.button);
        this.popover = this.doc.createElement("nav");
        this.popover.className = "nn-outline-popover";
        this.popover.hidden = true;
        this.popover.id = `nn-outline-${++nextId}`;
        this.popover.setAttribute("aria-label", "On this page");
        this.button.setAttribute("aria-controls", this.popover.id);
        const title = this.doc.createElement("div");
        title.className = "nn-outline-heading";
        title.textContent = "On this page";
        this.search = this.doc.createElement("input");
        this.search.type = "search";
        this.search.className = "nn-outline-search";
        this.search.placeholder = "Search headings";
        this.search.setAttribute("aria-label", "Search headings");
        this.search.autocomplete = "off";
        this.tree = this.doc.createElement("ul");
        this.tree.className = "nn-outline-tree";
        this.empty = this.doc.createElement("div");
        this.empty.className = "nn-outline-empty";
        this.popover.append(title, this.search, this.tree, this.empty);
        this.root.append(this.popover);
        this.registerDomEvent(this.button, "click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.toggle();
        });
        this.registerDomEvent(this.search, "input", () => this.render());
        this.registerDomEvent(this.popover, "click", (event) => {
          const toggle = event.target.closest?.(".nn-outline-toggle");
          const link = event.target.closest?.(".nn-outline-link");
          if (toggle && this.popover.contains(toggle)) {
            const id = toggle.dataset.id;
            if (this.collapsed.has(id)) this.collapsed.delete(id);
            else this.collapsed.add(id);
            this.render();
            this.tree.querySelector(`.nn-outline-toggle[data-id="${id}"]`)?.focus({ preventScroll: true });
          } else if (link && this.popover.contains(link)) this.jump(Number(link.dataset.line));
        });
        this.registerDomEvent(this.doc, "pointerdown", (event) => {
          if (this.open && !this.popover.contains(event.target) && !this.button.contains(event.target)) this.setOpen(false);
        }, true);
        this.registerDomEvent(this.popover, "keydown", (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            this.setOpen(false);
            this.button.focus({ preventScroll: true });
            return;
          }
          if (["ArrowDown", "ArrowUp"].includes(event.key)) {
            const links = [...this.tree.querySelectorAll(".nn-outline-link")].filter((link) => !link.closest("[hidden]"));
            if (!links.length) return;
            const index = links.indexOf(this.doc.activeElement), delta = event.key === "ArrowDown" ? 1 : -1;
            const next = index < 0 ? delta > 0 ? 0 : links.length - 1 : (index + delta + links.length) % links.length;
            event.preventDefault();
            links[next].focus({ preventScroll: true });
            this.ensureVisible(links[next].closest(".nn-outline-row"));
          } else if (event.key === "Enter" && event.target === this.search) {
            const first = this.tree.querySelector(this.search.value.trim() ? '.nn-outline-link[data-match="true"]' : ".nn-outline-link");
            if (first) {
              event.preventDefault();
              this.jump(Number(first.dataset.line));
            }
          }
        });
        this.registerDomEvent(this.root, "scroll", (event) => {
          if (!this.popover.contains(event.target)) this.scheduleActive(false);
        }, true);
        for (const event of ["keyup", "pointerup"]) this.registerDomEvent(this.root, event, (evt) => {
          if (!this.popover.contains(evt.target) && evt.target !== this.button) this.scheduleActive(true);
        });
        this.registerDomEvent(this.doc, "selectionchange", () => {
          if (this.open && this.view.getMode() === "source" && this.view.editor?.hasFocus()) this.scheduleActive(true);
        });
        this.registerDomEvent(this.win, "resize", () => this.position());
        this.refresh();
      }
      position() {
        if (!this.popover) return;
        const header = this.root.querySelector(".view-header");
        const top = header ? header.getBoundingClientRect().bottom - this.root.getBoundingClientRect().top + 8 : 48;
        this.popover.style.top = `${Math.max(8, top)}px`;
      }
      refresh() {
        if (!this.button) return;
        const path = this.view.file?.path || "";
        if (path !== this.path) {
          this.path = path;
          this.collapsed.clear();
          this.search.value = "";
          this.setOpen(false);
        }
        const cache = this.view.file && this.owner.host.app.metadataCache.getFileCache(this.view.file);
        const next = this.view.getMode() === "source" && this.view.editor ? scanHeadings(this.view.editor.getValue()) : cache?.headings ? cachedHeadings(cache) : scanHeadings(this.view.getViewData?.() || "");
        const levels = this.owner.host.featureEnabled("outlineLevels");
        const changed = JSON.stringify(next) !== JSON.stringify(this.headings) || levels !== this.showLevels;
        this.showLevels = levels;
        this.headings = next;
        this.button.hidden = !path;
        this.search.hidden = this.headings.length < 5;
        if (this.search.hidden) this.search.value = "";
        const valid = new Set(next.map((item) => item.id));
        for (const id of this.collapsed) if (!valid.has(id)) this.collapsed.delete(id);
        if (changed || !this.rows.size) this.render();
        this.updateActive(false);
        this.position();
      }
      render() {
        this.rows.clear();
        this.tree.replaceChildren();
        const query = this.search.value, nodes = searchTree(headingTree(this.headings), query);
        const append = (parent, children) => {
          for (const node of children) {
            const item = this.doc.createElement("li");
            item.className = "nn-outline-item";
            item.dataset.level = String(node.level);
            item.dataset.line = String(node.line);
            const row = this.doc.createElement("div");
            row.className = "nn-outline-row";
            const toggle = this.doc.createElement("button");
            toggle.type = "button";
            toggle.className = "nn-outline-toggle";
            toggle.dataset.id = node.id;
            const collapsed = !query.trim() && this.collapsed.has(node.id);
            if (node.children.length) {
              setLocalIcon(toggle, collapsed ? "chevron-right" : "chevron-down");
              toggle.setAttribute("aria-label", `${collapsed ? "Expand" : "Collapse"} ${node.heading}`);
              toggle.setAttribute("aria-expanded", String(!collapsed));
            } else {
              toggle.classList.add("is-leaf");
              toggle.tabIndex = -1;
              toggle.disabled = true;
              toggle.setAttribute("aria-hidden", "true");
            }
            const link = this.doc.createElement("button");
            link.type = "button";
            link.className = "nn-outline-link";
            link.textContent = node.heading;
            link.dataset.line = String(node.line);
            if (query.trim()) link.dataset.match = String(!!node.matched);
            row.append(toggle, link);
            if (this.showLevels) {
              const level = this.doc.createElement("span");
              level.className = "nn-outline-level";
              level.textContent = `H${node.level}`;
              level.setAttribute("aria-hidden", "true");
              link.setAttribute("aria-label", `Heading ${node.level}: ${node.heading}`);
              row.append(level);
            }
            item.append(row);
            this.rows.set(node.id, row);
            if (node.children.length) {
              const group = this.doc.createElement("ul");
              group.className = "nn-outline-children";
              group.hidden = collapsed;
              append(group, node.children);
              item.append(group);
            }
            parent.append(item);
          }
        };
        append(this.tree, nodes);
        this.empty.hidden = nodes.length > 0;
        this.empty.textContent = this.headings.length ? "No matching headings" : "No headings in this note";
        this.paintActive();
      }
      setOpen(open) {
        if (!this.popover) return;
        this.open = open;
        this.popover.hidden = !open;
        this.button.setAttribute("aria-expanded", String(open));
        this.button.classList.toggle("is-active", open);
        if (open) {
          this.owner.closeOthers(this);
          this.position();
          this.updateActive(false);
        }
      }
      toggle() {
        this.refresh();
        this.setOpen(!this.open);
        if (this.open && !Platform.isMobile && !this.search.hidden) this.search.focus({ preventScroll: true });
      }
      jump(line) {
        if (!this.owner.enabled() || this.view.file?.path !== this.path) {
          this.refresh();
          return;
        }
        const previous = this.headings.find((item) => item.line === line);
        this.refresh();
        const heading = this.headings.find((item) => item.line === line && item.heading === previous?.heading && item.level === previous?.level);
        if (!heading) return;
        this.owner.host.app.workspace.setActiveLeaf(this.leaf, { focus: false });
        if (this.view.getMode() === "source") {
          const pos = { line, ch: 0 };
          this.view.editor.setCursor(pos);
          this.view.editor.scrollIntoView({ from: pos, to: pos }, false);
          this.view.currentMode.applyScroll(line);
          if (!Platform.isMobile) this.view.editor.focus?.();
        } else this.view.previewMode.applyScroll(line);
        this.search.value = "";
        this.render();
        this.activeId = heading.id;
        this.paintActive();
      }
      scheduleActive(cursor) {
        this.useCursor = cursor;
        if (this.activeFrame !== void 0) return;
        this.activeFrame = this.win.requestAnimationFrame(() => {
          this.activeFrame = void 0;
          this.updateActive(this.useCursor);
        });
      }
      updateActive(cursor) {
        if (!this.open) return;
        let line = 0;
        if (cursor && this.view.getMode() === "source" && this.view.editor) line = this.view.editor.getCursor().line;
        else line = (this.view.currentMode?.getScroll() ?? this.view.previewMode?.getScroll() ?? 0) + 0.01;
        this.activeId = headingAtLine(this.headings, line)?.id || null;
        this.paintActive();
      }
      ensureVisible(row) {
        if (!row || !this.open) return;
        const box = this.tree.getBoundingClientRect(), target = row.getBoundingClientRect();
        if (!box.height) return;
        if (target.top < box.top) this.tree.scrollTop -= box.top - target.top;
        else if (target.bottom > box.bottom) this.tree.scrollTop += target.bottom - box.bottom;
      }
      paintActive() {
        let visible = this.rows.get(this.activeId);
        let hidden;
        while (visible && (hidden = visible.closest(".nn-outline-children[hidden]"))) visible = hidden.parentElement.querySelector(":scope > .nn-outline-row");
        for (const row of this.rows.values()) {
          const active = row === visible;
          row.classList.toggle("is-active", active);
          const link = row.querySelector(".nn-outline-link");
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
        this.ensureVisible(visible);
      }
      onunload() {
        if (this.activeFrame !== void 0) this.win.cancelAnimationFrame(this.activeFrame);
        this.button?.remove();
        this.popover?.remove();
        if (this.addedHost) this.root.classList.remove("nn-outline-host");
        this.rows.clear();
        this.open = false;
      }
    };
    var FloatingOutline2 = class extends Component {
      constructor(host) {
        super();
        this.host = host;
        this.panes = /* @__PURE__ */ new Map();
        this.running = false;
      }
      enabled() {
        return this.running && this.host.featureEnabled("outline");
      }
      onload() {
        this.running = true;
        this.refreshSettings();
      }
      refreshSettings() {
        if (!this.enabled()) {
          if (this.scope) {
            this.removeChild(this.scope);
            this.scope = null;
          }
          for (const pane of this.panes.values()) this.removeChild(pane);
          this.panes.clear();
          return;
        }
        if (!this.scope) {
          this.scope = this.addChild(new Component());
          const workspace = this.host.app.workspace;
          for (const event of ["layout-change", "active-leaf-change", "file-open"]) this.scope.registerEvent(workspace.on(event, () => this.sync()));
          this.scope.registerEvent(workspace.on("editor-change", (_editor, info) => {
            for (const pane of this.panes.values()) if (pane.view === info || pane.view.file?.path === info.file?.path) pane.refresh();
          }));
          this.scope.registerEvent(this.host.app.metadataCache.on("changed", (file) => {
            for (const pane of this.panes.values()) if (pane.view.file?.path === file.path) pane.refresh();
          }));
        }
        this.sync();
      }
      sync() {
        if (!this.enabled()) return;
        const leaves = new Set(this.host.app.workspace.getLeavesOfType("markdown"));
        for (const [leaf, pane] of this.panes) if (!leaves.has(leaf) || leaf.view !== pane.view || pane.root.ownerDocument !== pane.doc || !pane.button?.isConnected) {
          this.removeChild(pane);
          this.panes.delete(leaf);
        }
        for (const leaf of leaves) {
          if (!leaf.view.containerEl.querySelector(".view-actions")) continue;
          let pane = this.panes.get(leaf);
          if (!pane) {
            pane = this.addChild(new OutlinePane(this, leaf));
            this.panes.set(leaf, pane);
          } else pane.refresh();
        }
      }
      closeOthers(pane) {
        for (const other of this.panes.values()) if (other !== pane && other.open) other.setOpen(false);
      }
      toggleActive(checking = false) {
        if (!this.enabled()) return false;
        const leaf = this.host.app.workspace.getMostRecentLeaf();
        if (!leaf || leaf.view.getViewType() !== "markdown") return false;
        if (!checking) {
          this.sync();
          this.panes.get(leaf)?.toggle();
        }
        return true;
      }
      onunload() {
        this.running = false;
        this.refreshSettings();
      }
    };
    module2.exports = { FloatingOutline: FloatingOutline2, scanHeadings, cachedHeadings, headingLabel, headingTree, searchTree, headingAtLine };
  }
});

// src/media-alignment-source.js
var require_media_alignment_source = __commonJS({
  "src/media-alignment-source.js"(exports2, module2) {
    "use strict";
    var { scanFences, readLanguage } = require_fence();
    var { maskComments } = require_callout_spacing();
    var ALIGNMENTS = /* @__PURE__ */ new Set(["left", "center", "right"]);
    var MARKER = /^( {0,3})<!-- native-notes:align=(left|center|right) -->([ \t]*)$/;
    var IMAGE_EXTENSION = /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i;
    function linesOf(source) {
      const lines = [];
      for (const match of source.matchAll(/([^\r\n]*)(\r\n|\r|\n|$)/g)) {
        if (!match[0].length) break;
        lines.push({
          text: match[1],
          start: match.index,
          end: match.index + match[1].length,
          next: match.index + match[0].length,
          eol: match[2]
        });
      }
      return lines;
    }
    function closingBracket(text, start, open, close) {
      let depth = 1;
      for (let index = start + 1; index < text.length; index++) {
        if (text[index] === "\\") {
          index++;
          continue;
        }
        if (text[index] === open) depth++;
        else if (text[index] === close && --depth === 0) return index;
      }
      return -1;
    }
    function parseImage(line) {
      const match = /^ {0,3}(\S.*?)[ \t]*$/.exec(line);
      if (!match) return null;
      const text = match[1];
      const wiki = /^!\[\[([^\]\r\n[]+)\]\]$/.exec(text);
      if (wiki) {
        let separator = -1;
        for (let index2 = 0; index2 < wiki[1].length; index2++) {
          if (wiki[1][index2] === "|" && wiki[1][index2 - 1] !== "\\") {
            separator = index2;
            break;
          }
        }
        const target2 = separator < 0 ? wiki[1] : wiki[1].slice(0, separator);
        if (!target2.trim() || !IMAGE_EXTENSION.test(target2)) return null;
        return { syntax: "wiki", target: target2, alt: separator < 0 ? "" : wiki[1].slice(separator + 1) };
      }
      if (!text.startsWith("![")) return null;
      const labelEnd = closingBracket(text, 1, "[", "]");
      if (labelEnd < 0 || text[labelEnd + 1] !== "(") return null;
      let index = labelEnd + 2;
      while (/[ \t]/.test(text[index] || "\0")) index++;
      const destinationStart = index;
      let target;
      if (text[index] === "<") {
        index++;
        const start = index;
        for (; index < text.length; index++) {
          if (text[index] === "\\") {
            index++;
            continue;
          }
          if (text[index] === "<") return null;
          if (text[index] === ">") break;
        }
        if (index >= text.length) return null;
        target = text.slice(start, index++);
      } else {
        let depth = 0;
        for (; index < text.length; index++) {
          const char = text[index];
          if (char === "\\") {
            index++;
            continue;
          }
          if (/[ \t]/.test(char)) break;
          if (char === "(") depth++;
          else if (char === ")") {
            if (!depth) break;
            depth--;
          }
        }
        if (depth) return null;
        target = text.slice(destinationStart, index);
      }
      if (!target || Array.from(target).some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)) return null;
      const separatorStart = index;
      while (/[ \t]/.test(text[index] || "\0")) index++;
      let title = null;
      if (text[index] !== ")") {
        if (index === separatorStart) return null;
        const quote = text[index];
        const close = quote === "(" ? ")" : quote;
        if (!['"', "'", "("].includes(quote)) return null;
        const start = ++index;
        for (; index < text.length; index++) {
          if (text[index] === "\\") {
            index++;
            continue;
          }
          if (text[index] === close) break;
          if (quote === "(" && text[index] === "(") return null;
        }
        if (index >= text.length) return null;
        title = text.slice(start, index++);
        while (/[ \t]/.test(text[index] || "\0")) index++;
      }
      if (text[index] !== ")" || index !== text.length - 1) return null;
      return { syntax: "markdown", target, alt: text.slice(2, labelEnd), title };
    }
    function scanMedia(source) {
      if (typeof source !== "string") throw new TypeError("source must be a string");
      const lines = linesOf(source);
      if (!lines.length) return [];
      const visible = lines.map((line) => line.text);
      if (/^\uFEFF?---[ \t]*$/.test(visible[0])) {
        let end = 1;
        while (end < visible.length && !/^(?:---|\.\.\.)[ \t]*$/.test(visible[end])) end++;
        for (let row = 0; row <= Math.min(end, visible.length - 1); row++) visible[row] = " ".repeat(visible[row].length);
      }
      const masked = maskComments(visible.map((line, row) => line + lines[row].eol).join("")).split("\n");
      const maskedSource = lines.map((line, row) => masked[row] + line.eol).join("");
      const fences = new Map(scanFences(maskedSource).map((fence) => [fence.lineStart, fence]));
      const result = [];
      let listIndent = null;
      let listBlank = false;
      let quote = false;
      let html = false;
      let math = false;
      function describe(kind, first, last, extra = {}) {
        const previous = first > 0 ? MARKER.exec(lines[first - 1].text) : null;
        const marker = previous ? lines[first - 1] : null;
        const ambiguous = !!(previous && first > 1 && MARKER.test(lines[first - 2].text));
        const localEol = lines[first].eol || marker?.eol || lines[first - 1]?.eol || lines.find((line) => line.eol)?.eol || "\n";
        return {
          kind,
          lineStart: first,
          lineEnd: last,
          from: lines[first].start,
          to: lines[last].end,
          sourceText: source,
          alignment: previous ? previous[2] : null,
          markerFrom: marker ? marker.start : null,
          markerTo: marker ? marker.end : null,
          eol: localEol,
          ambiguous,
          ...extra
        };
      }
      for (let row = 0; row < lines.length; row++) {
        const line = masked[row];
        if (!line.trim()) {
          html = false;
          quote = false;
          listBlank = true;
          continue;
        }
        if (math) {
          if (/\$\$[ \t]*$/.test(line)) math = false;
          continue;
        }
        if (html) continue;
        if (/^ {0,3}</.test(line)) {
          html = true;
          continue;
        }
        if (/^ {0,3}\$\$/.test(line)) {
          math = !/\$\$[ \t]*$/.test(line.slice(line.indexOf("$$") + 2));
          continue;
        }
        const indent = /^[ \t]*/.exec(line)[0].replace(/\t/g, "    ").length;
        const fence = fences.get(row);
        const interrupt = /^ {0,3}(?:#{1,6}(?:[ \t]|$)|`{3,}|~{3,}|>|[-+*][ \t]|\d+[.)][ \t])/.test(line);
        let nested = false;
        if (listIndent !== null) {
          if (indent >= listIndent || !listBlank && !interrupt) nested = true;
          else listIndent = null;
        }
        if (quote && !interrupt) nested = true;
        else if (quote) quote = false;
        if (fence) {
          if (!nested && fence.closed && /^ {0,3}$/.test(fence.prefix) && readLanguage(fence.openingLine)?.toLowerCase() === "mermaid") {
            result.push(describe("mermaid", row, fence.lineEnd, {
              fence: {
                ...fence,
                openingLine: lines[row].text,
                body: source.slice(fence.bodyStart, fence.bodyEnd),
                closingLine: lines[fence.lineEnd].text
              }
            }));
          }
          row = fence.lineEnd === null ? Math.max(row, lines.findIndex((line2) => line2.start >= fence.bodyEnd) - 1) : fence.lineEnd;
          if (!fence.closed && fence.bodyEnd === source.length) row = lines.length;
          continue;
        }
        if (nested) continue;
        const list = /^( {0,3})(?:[-+*]|\d{1,9}[.)])([ \t]+)(.*)$/.exec(line);
        if (list) {
          listIndent = line.length - list[3].length;
          listBlank = false;
          continue;
        }
        if (/^ {0,3}>/.test(line)) {
          quote = true;
          continue;
        }
        const image = parseImage(line);
        if (image && line === lines[row].text) result.push(describe("image", row, row, image));
        listBlank = false;
      }
      return result;
    }
    function alignmentChange(currentSource, target, alignment) {
      if (typeof currentSource !== "string") throw new TypeError("currentSource must be a string");
      if (!ALIGNMENTS.has(alignment)) throw new RangeError("Alignment must be left, center, or right");
      if (!target || target.sourceText !== currentSource) throw new Error("The media source changed; reopen its alignment control");
      const identity = ["kind", "lineStart", "lineEnd", "from", "to", "alignment", "markerFrom", "markerTo"];
      const candidates = scanMedia(currentSource).filter((candidate) => identity.every((key) => candidate[key] === target[key]));
      if (candidates.length !== 1 || candidates[0].ambiguous) throw new Error("Cannot safely identify this media block");
      const matched = candidates[0];
      if (matched.markerFrom !== null) {
        const marker = currentSource.slice(matched.markerFrom, matched.markerTo);
        return {
          from: matched.markerFrom,
          to: matched.markerTo,
          insert: marker.replace(/native-notes:align=(?:left|center|right)/, `native-notes:align=${alignment}`)
        };
      }
      return { from: matched.from, to: matched.from, insert: `<!-- native-notes:align=${alignment} -->${matched.eol}` };
    }
    module2.exports = { scanMedia, alignmentChange };
  }
});

// src/media-alignment.js
var require_media_alignment = __commonJS({
  "src/media-alignment.js"(exports2, module2) {
    "use strict";
    var { Component, MarkdownRenderChild, Notice: Notice2, editorInfoField } = require("obsidian");
    var { ViewPlugin, Decoration } = require("@codemirror/view");
    var { StateEffect } = require("@codemirror/state");
    var { scanMedia, alignmentChange } = require_media_alignment_source();
    var { setLocalIcon } = require_icons();
    var MEDIA = ".mermaid, .image-embed, img[src]";
    var settingsChanged = StateEffect.define();
    function mediaTargets(container) {
      const candidates = [...container.matches(MEDIA) ? [container] : [], ...container.querySelectorAll(MEDIA)];
      const targets = /* @__PURE__ */ new Map();
      for (const element of candidates) {
        if (element.closest("table, pre, .nn-media-actions")) continue;
        if (element.matches(".mermaid")) {
          targets.set(element, "mermaid");
          continue;
        }
        if (element.closest(".mermaid, svg")) continue;
        let target = element.closest(".image-embed");
        if (!target && element.matches("img[src]")) {
          target = element.closest("p, .cm-line");
          if (!target || target.textContent.trim() || target.querySelectorAll("img[src]").length !== 1) continue;
        }
        if (target) targets.set(target, "image");
      }
      return targets;
    }
    var MediaRegion = class extends MarkdownRenderChild {
      constructor(element, context, owner) {
        super(element);
        this.context = context;
        this.owner = owner;
        this.records = /* @__PURE__ */ new Map();
      }
      onload() {
        this.running = true;
        this.scan();
        const observer = new this.containerEl.ownerDocument.defaultView.MutationObserver(() => this.queue());
        observer.observe(this.containerEl, { childList: true, subtree: true });
        this.register(() => observer.disconnect());
      }
      queue() {
        if (this.queued) return;
        this.queued = true;
        Promise.resolve().then(() => {
          this.queued = false;
          if (this.running) this.scan();
        });
      }
      info(target) {
        try {
          const live = this.owner.liveRegion(target);
          const context = live?.context || this.context;
          return context.getSectionInfo(target) || context.getSectionInfo(this.containerEl);
        } catch {
          return null;
        }
      }
      scan() {
        if (!this.running || !this.owner.enabled()) {
          for (const [target, record] of this.records) this.release(target, record);
          return;
        }
        const targets = mediaTargets(this.containerEl);
        for (const [target, record] of this.records) if (!targets.has(target)) this.release(target, record);
        for (const [target, kind] of targets) {
          const info = this.info(target);
          if (!info) continue;
          if (this.sourceText !== info.text) {
            this.sourceText = info.text;
            this.media = scanMedia(info.text);
          }
          const matches = this.media.filter((item) => item.kind === kind && item.lineStart >= info.lineStart && item.lineEnd <= info.lineEnd);
          const descriptor = matches.length === 1 && !matches[0].ambiguous ? matches[0] : null;
          if (!descriptor) {
            const old = this.records.get(target);
            if (old) this.release(target, old);
            continue;
          }
          const previous = this.owner.owners.get(target);
          if (previous && previous !== this && this.containerEl.contains(previous.containerEl)) continue;
          let record = this.records.get(target) || previous?.records.get(target);
          if (!record) record = { target, originalAlign: target.getAttribute("data-nn-align"), originalClass: target.classList.contains("nn-media-align-target") };
          if (previous && previous !== this) previous.records.delete(target);
          this.records.set(target, record);
          this.owner.owners.set(target, this);
          record.region = this;
          record.descriptor = descriptor;
          target.classList.add("nn-media-align-target");
          if (descriptor.alignment) target.setAttribute("data-nn-align", descriptor.alignment);
          else target.removeAttribute("data-nn-align");
          const editable = this.owner.isEditing(target) && !!this.owner.liveRegion(target);
          if (editable) this.owner.ensureButton(record);
          else this.owner.removeButton(record);
        }
      }
      release(target, record) {
        if (this.owner.owners.get(target) === this) {
          this.owner.removeButton(record);
          if (!record.originalClass) target.classList.remove("nn-media-align-target");
          if (record.originalAlign === null) target.removeAttribute("data-nn-align");
          else target.setAttribute("data-nn-align", record.originalAlign);
          this.owner.owners.delete(target);
        }
        this.records.delete(target);
      }
      onunload() {
        this.running = false;
        for (const [target, record] of this.records) this.release(target, record);
      }
    };
    var MediaAlignment2 = class extends Component {
      constructor(host) {
        super();
        this.host = host;
        this.regions = /* @__PURE__ */ new Map();
        this.live = /* @__PURE__ */ new Set();
        this.editors = /* @__PURE__ */ new Set();
        this.owners = /* @__PURE__ */ new WeakMap();
      }
      enabled() {
        return this.running && this.host.featureEnabled("imageAlignment");
      }
      onload() {
        this.running = true;
        const createEditorPlugin = (owner) => class {
          constructor(view) {
            this.view = view;
            this.decorations = owner.decorations(view.state);
            const context = {
              editorView: view,
              get sourcePath() {
                return view.state.field(editorInfoField, false)?.file?.path || "";
              },
              getSectionInfo(element) {
                let block = element.closest(".cm-embed-block");
                if (!block) block = element.closest(".cm-line");
                if (!block || !view.contentDOM.contains(block)) return null;
                const parent = block.parentElement;
                const index = [...parent.childNodes].indexOf(block);
                const start = view.posAtDOM(parent, index);
                const end = view.posAtDOM(parent, index + 1);
                return {
                  text: view.state.doc.toString(),
                  lineStart: view.state.doc.lineAt(start).number - 1,
                  lineEnd: view.state.doc.lineAt(Math.max(start, end - 1)).number - 1
                };
              }
            };
            this.region = new MediaRegion(view.contentDOM, context, owner);
            owner.live.add(this.region);
            owner.editors.add(this);
            this.region.load();
          }
          update(update) {
            if (update.docChanged || update.transactions.some((transaction) => transaction.effects.some((effect) => effect.is(settingsChanged)))) {
              this.decorations = owner.decorations(update.state);
              this.region.queue();
            } else if (update.viewportChanged) this.region.queue();
          }
          destroy() {
            this.region.unload();
            owner.live.delete(this.region);
            owner.editors.delete(this);
          }
        };
        this.host.registerEditorExtension(ViewPlugin.fromClass(createEditorPlugin(this), { decorations: (plugin) => plugin.decorations }));
        this.host.registerMarkdownPostProcessor((element, context) => {
          if (!this.running || !context.sourcePath?.toLowerCase().endsWith(".md")) return;
          const selector = `${MEDIA}, .internal-embed[src], code.language-mermaid`;
          if (!element.matches(selector) && !element.querySelector(selector)) return;
          const existing = this.regions.get(element);
          if (existing) {
            existing.context = context;
            existing.queue();
            return;
          }
          const region = new MediaRegion(element, context, this);
          this.regions.set(element, region);
          region.register(() => this.regions.delete(element));
          context.addChild(region);
        }, 1002);
        if (this.host.app?.workspace) this.host.registerEvent(this.host.app.workspace.on("layout-change", () => {
          for (const region of [...this.live, ...this.regions.values()]) region.queue();
        }));
      }
      liveRegion(target) {
        for (const region of this.live) if (region.running && region.containerEl.contains(target)) return region;
        return null;
      }
      isEditing(target) {
        const source = target.closest(".markdown-source-view");
        if (!source || source.style.display === "none") return false;
        const view = this.host.app?.workspace.getLeavesOfType("markdown").map((leaf) => leaf.view).find((view2) => view2.containerEl.contains(target));
        return !view || view.getMode() === "source";
      }
      decorations(state) {
        if (!this.enabled()) return Decoration.none;
        const ranges = scanMedia(state.doc.toString()).filter((item) => item.markerFrom !== null && !item.ambiguous).map((item) => Decoration.line({ class: "nn-media-alignment-marker" }).range(item.markerFrom));
        return Decoration.set(ranges, true);
      }
      ensureButton(record) {
        const { target } = record;
        const widget = target.closest(".cm-embed-block");
        let toolbar = target.querySelector(":scope > .embed-actions") || widget?.querySelector(":scope > .embed-actions");
        if (!toolbar) toolbar = record.ownToolbar;
        if (record.button?.isConnected && record.button.parentElement === toolbar) return;
        this.removeButton(record);
        if (!toolbar || !toolbar.isConnected) {
          toolbar = target.ownerDocument.createElement("div");
          toolbar.className = "nn-media-actions";
          toolbar.setAttribute("contenteditable", "false");
          target.appendChild(toolbar);
          record.ownToolbar = toolbar;
        } else {
          record.hostHadClass = toolbar.classList.contains("nn-media-actions-host");
          toolbar.classList.add("nn-media-actions-host");
        }
        record.toolbar = toolbar;
        const button = target.ownerDocument.createElement("button");
        button.type = "button";
        button.className = "embed-action nn-align-button";
        button.setAttribute("aria-label", "Align image or diagram");
        button.setAttribute("title", "Alignment");
        button.setAttribute("aria-haspopup", "dialog");
        button.setAttribute("aria-expanded", "false");
        setLocalIcon(button, "align-center");
        const edit = toolbar.querySelector(":scope > .edit-block-button");
        const zoom = [...toolbar.children].find((child) => /zoom/i.test(child.getAttribute("aria-label") || "") || child.querySelector(".lucide-zoom-in"));
        if (zoom) zoom.after(button);
        else toolbar.insertBefore(button, edit);
        button.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          event.stopPropagation();
        });
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.open(record);
        });
        record.button = button;
      }
      removeButton(record) {
        if (this.active?.record === record) this.close();
        record.button?.remove();
        record.ownToolbar?.remove();
        if (record.toolbar && !record.hostHadClass) record.toolbar.classList.remove("nn-media-actions-host");
        record.button = record.ownToolbar = record.toolbar = null;
      }
      open(record) {
        const same = this.active?.record === record;
        this.close();
        if (same || !this.enabled() || !record.target.isConnected || !this.isEditing(record.target)) return;
        const live = this.liveRegion(record.target);
        if (!live?.context.sourcePath) return;
        const doc = record.target.ownerDocument;
        const menu = doc.createElement("div");
        menu.className = "nn-alignment-menu";
        menu.setAttribute("role", "dialog");
        menu.setAttribute("aria-label", "Image alignment");
        const session = this.active = { record, descriptor: record.descriptor, path: live.context.sourcePath, view: live.context.editorView, menu, disposers: [] };
        const selected = record.descriptor.alignment || (record.descriptor.kind === "mermaid" ? "center" : "left");
        for (const alignment of ["left", "center", "right"]) {
          const button = doc.createElement("button");
          button.type = "button";
          button.className = "nn-alignment-choice";
          button.dataset.alignment = alignment;
          button.setAttribute("aria-label", `Align ${alignment}`);
          button.setAttribute("title", alignment[0].toUpperCase() + alignment.slice(1));
          button.setAttribute("aria-pressed", String(alignment === selected));
          setLocalIcon(button, `align-${alignment}`);
          button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.choose(session, alignment);
          });
          menu.appendChild(button);
        }
        menu.addEventListener("pointerdown", (event) => event.stopPropagation());
        menu.addEventListener("keydown", (event) => {
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            const items = [...menu.children], index = items.indexOf(doc.activeElement);
            const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3;
            items[next].focus({ preventScroll: true });
          }
        });
        doc.body.appendChild(menu);
        record.button.setAttribute("aria-expanded", "true");
        record.toolbar.classList.add("nn-media-actions-open");
        const rect = record.button.getBoundingClientRect(), bounds = menu.getBoundingClientRect();
        menu.style.left = `${Math.max(8, Math.min(rect.right - bounds.width, doc.documentElement.clientWidth - bounds.width - 8))}px`;
        menu.style.top = `${Math.max(8, Math.min(rect.bottom + 6, doc.documentElement.clientHeight - bounds.height - 8))}px`;
        const listen = (element, type, callback, options) => {
          element.addEventListener(type, callback, options);
          session.disposers.push(() => element.removeEventListener(type, callback, options));
        };
        listen(doc, "pointerdown", (event) => {
          if (!menu.contains(event.target) && !record.button?.contains(event.target)) this.close();
        }, true);
        listen(doc, "keydown", (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            this.close(true);
          }
        }, true);
        listen(doc, "focusin", (event) => {
          if (!menu.contains(event.target) && event.target !== record.button) this.close();
        });
        listen(doc.defaultView, "resize", () => this.close());
        listen(session.view.scrollDOM, "scroll", () => this.close(), { passive: true });
        menu.querySelector('[aria-pressed="true"]').focus({ preventScroll: true });
      }
      choose(session, alignment) {
        if (this.active !== session) return;
        try {
          const live = this.liveRegion(session.record.target);
          if (!this.enabled() || !session.record.target.isConnected || !this.isEditing(session.record.target) || live?.context.editorView !== session.view || live.context.sourcePath !== session.path) throw new Error("Reopen alignment in the note you want to edit.");
          const change = alignmentChange(session.view.state.doc.toString(), session.descriptor, alignment);
          this.close();
          const changes = session.view.state.changes(change);
          const scroll = session.view.scrollSnapshot().map(changes);
          session.view.dispatch({ changes, effects: scroll ? [scroll] : [], scrollIntoView: false, userEvent: "input" });
          for (const region of [...this.live, ...this.regions.values()]) region.queue();
        } catch (error) {
          this.close();
          new Notice2(error.message || "This image could not be aligned.");
        }
      }
      close(focus = false) {
        const session = this.active;
        if (!session) return;
        this.active = null;
        session.disposers.forEach((dispose) => dispose());
        session.menu.remove();
        session.record.button?.setAttribute("aria-expanded", "false");
        session.record.toolbar?.classList.remove("nn-media-actions-open");
        if (focus && session.record.button?.isConnected) session.record.button.focus({ preventScroll: true });
      }
      refreshSettings() {
        if (!this.enabled()) this.close();
        for (const region of [...this.live, ...this.regions.values()]) region.scan();
        for (const editor of this.editors) editor.view.dispatch({ effects: settingsChanged.of(null), scrollIntoView: false });
      }
      onunload() {
        this.running = false;
        this.close();
        for (const region of [...this.live, ...this.regions.values()]) region.unload();
        this.live.clear();
        this.editors.clear();
        this.regions.clear();
      }
    };
    module2.exports = { MediaAlignment: MediaAlignment2 };
  }
});

// src/dom-state.js
var require_dom_state = __commonJS({
  "src/dom-state.js"(exports2, module2) {
    "use strict";
    var TARGETS = [
      ".nav-folder-title",
      ".nav-file-title",
      ".cm-preview-code-block",
      "pre",
      "figure.frame",
      "figcaption.header",
      "mjx-container",
      "math-field",
      "svg.flowchart"
    ].join(",");
    var CLASSES = [
      "nn-has-iconize",
      "nn-has-expressive-code",
      "nn-has-code",
      "nn-code-widget",
      "nn-editable-code-header",
      "nn-has-copy-feedback",
      "nn-has-copy-button",
      "nn-shell-frame",
      "nn-has-language-label",
      "nn-math-display",
      "nn-mathlive-field"
    ];
    var OWNED = new Set(CLASSES);
    var OWNERS = /* @__PURE__ */ new WeakMap();
    var CANDIDATES = `${TARGETS},${CLASSES.map((name) => `.${name}`).join(",")}`;
    var CONTEXTS = /* @__PURE__ */ new Set(["mermaid", "mathlive-modal-content", "obsidian-mathlive-codemirror-wrapper"]);
    var externalClasses = (value) => String(value || "").split(/\s+/).filter((name) => name && !OWNED.has(name)).sort().join(" ");
    var direct = (el, selector) => Array.from(el.children).some((child) => child.matches(selector));
    var DOMState2 = class {
      constructor(doc) {
        this.doc = doc;
        this.win = doc.defaultView;
        this.tracked = /* @__PURE__ */ new Set();
        this.states = /* @__PURE__ */ new WeakMap();
        this.pending = /* @__PURE__ */ new Set();
        this.diagrams = /* @__PURE__ */ new Map();
        this.frame = null;
        this.disposed = false;
        this.observer = new this.win.MutationObserver((records) => this.collect(records));
        this.observer.observe(doc.body, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeOldValue: true,
          attributeFilter: ["class", "data-language", "display", "id"]
        });
        this.refreshDiagrams = () => {
          for (const el of this.tracked) if (el.matches("svg.flowchart")) {
            this.clearDiagram(el);
            this.pending.add(el);
          }
          this.schedule();
        };
        this.styleObserver = new this.win.MutationObserver(this.refreshDiagrams);
        this.styleObserver.observe(doc.head, { subtree: true, childList: true, characterData: true });
        doc.head.addEventListener("load", this.refreshDiagrams, true);
        this.addSubtree(doc.body);
        this.flush();
      }
      addSubtree(node) {
        if (node.nodeType !== 1) return;
        if (node.matches(CANDIDATES)) this.pending.add(node);
        for (const el of node.querySelectorAll(CANDIDATES)) this.pending.add(el);
      }
      collect(records) {
        if (this.disposed) return;
        for (const record of records) {
          const target = record.target;
          if (record.type === "attributes" && record.attributeName === "class" && externalClasses(record.oldValue) === externalClasses(target.getAttribute("class")) && CLASSES.every((name) => target.classList.contains(name) === Boolean(this.states.get(target)?.has(name)))) continue;
          if (target.nodeType !== 1 || target.closest("[data-native-notes-diagram-style]")) continue;
          for (let el = target; el && el !== this.doc.body; el = el.parentElement) {
            if (el.matches(TARGETS) || this.tracked.has(el)) this.pending.add(el);
          }
          if (record.type === "attributes" && record.attributeName === "class") {
            const previous = new Set(String(record.oldValue || "").split(/\s+/));
            if (Array.from(CONTEXTS).some((name) => previous.has(name) !== target.classList.contains(name))) this.addSubtree(target);
          }
          for (const node of record.addedNodes || []) this.addSubtree(node);
          for (const node of record.removedNodes || []) this.addSubtree(node);
        }
        this.schedule();
      }
      schedule() {
        if (!this.disposed && this.pending.size && this.frame === null) {
          this.frame = this.win.requestAnimationFrame(() => {
            this.frame = null;
            this.flush();
          });
        }
      }
      flush() {
        if (this.disposed) return;
        for (const el of this.pending) {
          if (!el.isConnected || el.ownerDocument !== this.doc || !el.matches(TARGETS)) {
            this.clearElement(el);
            continue;
          }
          this.syncElement(el);
        }
        this.pending.clear();
      }
      syncElement(el) {
        this.tracked.add(el);
        OWNERS.set(el, this);
        const states = /* @__PURE__ */ new Set();
        const set = (name, value) => {
          if (value) states.add(name);
        };
        if (el.matches(".nav-folder-title, .nav-file-title")) set("nn-has-iconize", el.querySelector(".iconize-icon"));
        if (el.matches(".cm-preview-code-block")) {
          set("nn-has-expressive-code", el.querySelector(".expressive-code"));
          set("nn-has-code", el.querySelector(".expressive-code, pre"));
          set("nn-code-widget", direct(el, "pre") || Array.from(el.children).some((child) => child.matches("div") && direct(child, ".expressive-code")));
          set("nn-editable-code-header", el.querySelector(".an-code-title-editable"));
          set("nn-has-copy-feedback", el.querySelector(".expressive-code .copy .feedback"));
        }
        if (el.matches("pre")) set("nn-has-copy-button", direct(el, "button.copy-code-button"));
        if (el.matches("figure.frame")) {
          set("nn-editable-code-header", el.querySelector(".an-code-title-editable"));
          set("nn-shell-frame", direct(el, 'pre:is([data-language="sh"], [data-language="bash"], [data-language="zsh"], [data-language="shell"])'));
        }
        if (el.matches("figcaption.header")) set("nn-has-language-label", direct(el, ".an-code-language-label"));
        set("nn-math-display", el.localName === "mjx-container" && el.getAttribute("display") === "true");
        set("nn-mathlive-field", el.localName === "math-field" && el.closest(".mathlive-modal-content, .obsidian-mathlive-codemirror-wrapper"));
        this.states.set(el, states);
        for (const name of CLASSES) el.classList.toggle(name, states.has(name));
        if (el.matches(".mermaid svg.flowchart")) this.syncDiagram(el);
        else this.clearDiagram(el);
      }
      syncDiagram(svg) {
        const id = svg.id;
        if (!id) {
          this.clearDiagram(svg);
          return;
        }
        const current = this.diagrams.get(svg);
        if (current?.id === id && current.style.parentNode === svg) return;
        this.clearDiagram(svg);
        const escaped = this.win.CSS?.escape ? this.win.CSS.escape(id) : Array.from(id, (char) => `\\${char.codePointAt(0).toString(16)} `).join("");
        const rules = [];
        const visit = (sheet) => {
          let entries;
          try {
            entries = sheet.cssRules;
          } catch {
            return;
          }
          for (const rule of entries || []) {
            if (rule.selectorText?.includes("body.nn-enabled.nn-diagrams") && rule.selectorText.includes(".mermaid svg.flowchart") && !rule.selectorText.includes(".mermaid svg.flowchart#")) {
              const selector = rule.selectorText.split(".mermaid svg.flowchart").join(`.mermaid svg.flowchart#${escaped}`);
              rules.push(`${selector} { ${rule.style.cssText} }`);
            }
          }
        };
        for (const sheet of this.doc.styleSheets) {
          if (!sheet.ownerNode?.hasAttribute?.("data-native-notes-diagram-style")) visit(sheet);
        }
        if (!rules.length) return;
        const style = this.doc.createElementNS("http://www.w3.org/2000/svg", "style");
        style.setAttribute("data-native-notes-diagram-style", "");
        style.textContent = rules.join("\n");
        svg.appendChild(style);
        this.diagrams.set(svg, { id, style });
      }
      clearDiagram(el) {
        this.diagrams.get(el)?.style.remove();
        this.diagrams.delete(el);
      }
      clearElement(el) {
        if (OWNERS.get(el) === this) {
          el.classList.remove(...CLASSES);
          OWNERS.delete(el);
        }
        this.clearDiagram(el);
        this.states.delete(el);
        this.tracked.delete(el);
      }
      destroy() {
        this.disposed = true;
        this.observer.disconnect();
        this.styleObserver.disconnect();
        this.doc.head.removeEventListener("load", this.refreshDiagrams, true);
        if (this.frame !== null) this.win.cancelAnimationFrame(this.frame);
        this.frame = null;
        this.pending.clear();
        for (const el of this.tracked) this.clearElement(el);
      }
    };
    module2.exports = { DOMState: DOMState2 };
  }
});

// src/sync/storage.js
var require_storage = __commonJS({
  "src/sync/storage.js"(exports2, module2) {
    "use strict";
    var MAX_HISTORY_BYTES = 100 * 1024 * 1024;
    var MAX_HISTORY_RECORDS = 5e3;
    var MAX_VERSIONS_PER_FILE = 20;
    function isBytes(value) {
      return ArrayBuffer.isView(value) && Object.prototype.toString.call(value) === "[object Uint8Array]";
    }
    function pruneRecords(records, info, history) {
      const counts = /* @__PURE__ */ new Map();
      let size = 0, retained = 0;
      for (const item of records) {
        const count = counts.get(item.path) || 0;
        if (count >= MAX_VERSIONS_PER_FILE || retained >= MAX_HISTORY_RECORDS || size + item.size > MAX_HISTORY_BYTES) {
          info.delete(item.id);
          history.delete(item.id);
        } else {
          counts.set(item.path, count + 1);
          size += item.size;
          retained++;
        }
      }
    }
    var SyncStorage = class {
      constructor(app, indexedDB = typeof window !== "undefined" ? window.indexedDB : void 0, crypto = typeof window !== "undefined" ? window.crypto : void 0) {
        this.app = app;
        this.indexedDB = indexedDB;
        this.crypto = crypto;
        this.db = null;
        this.closed = false;
        this.opening = null;
        this.cancelOpen = null;
      }
      async open() {
        if (this.closed) throw new Error("Recovery stopped.");
        if (this.db) return this;
        if (this.opening) return this.opening;
        if (!this.indexedDB) throw new Error("Device storage is unavailable. Recovery remains off.");
        let id = this.app.loadLocalStorage("native-notes-sync-device");
        if (typeof id !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(id)) {
          id = this.crypto.randomUUID();
          this.app.saveLocalStorage("native-notes-sync-device", id);
        }
        this.deviceId = id;
        this.opening = new Promise((resolve, reject) => {
          const request = this.indexedDB.open(`native-notes-sync-${id}`, 2);
          let settled = false;
          const fail = (error) => {
            if (settled) return;
            settled = true;
            this.cancelOpen = null;
            reject(error);
          };
          this.cancelOpen = () => fail(new Error("Recovery stopped."));
          request.onupgradeneeded = () => {
            if (settled || this.closed) {
              request.transaction.abort();
              return;
            }
            const db = request.result;
            if (!db.objectStoreNames.contains("state")) db.createObjectStore("state");
            if (!db.objectStoreNames.contains("history")) db.createObjectStore("history", { keyPath: "id" });
            const info = db.createObjectStore("info", { keyPath: "id" });
            info.createIndex("path", "path");
            info.createIndex("modified", "modified");
            const history = request.transaction.objectStore("history");
            const cursorRequest = history.openCursor();
            cursorRequest.onsuccess = () => {
              const cursor = cursorRequest.result;
              if (cursor) {
                const record = cursor.value;
                if (typeof record.id === "string" && typeof record.path === "string" && record.path && Number.isFinite(record.modified) && isBytes(record.bytes) && record.bytes.byteLength <= MAX_HISTORY_BYTES) {
                  info.put({
                    id: record.id,
                    path: record.path,
                    modified: record.modified,
                    reason: typeof record.reason === "string" ? record.reason : "Recovery snapshot",
                    size: record.bytes.byteLength,
                    hash: null
                  });
                  cursor.update({ id: record.id, bytes: record.bytes });
                } else cursor.delete();
                cursor.continue();
              } else {
                const counts = /* @__PURE__ */ new Map();
                let size = 0, retained = 0;
                const ordered = info.index("modified").openCursor(null, "prev");
                ordered.onsuccess = () => {
                  const current = ordered.result;
                  if (!current) return;
                  const item = current.value, count = counts.get(item.path) || 0;
                  if (count >= MAX_VERSIONS_PER_FILE || retained >= MAX_HISTORY_RECORDS || size + item.size > MAX_HISTORY_BYTES) {
                    current.delete();
                    history.delete(item.id);
                  } else {
                    counts.set(item.path, count + 1);
                    size += item.size;
                    retained++;
                  }
                  current.continue();
                };
              }
            };
          };
          request.onerror = () => fail(new Error("Could not open device storage. Recovery remains off."));
          request.onblocked = () => fail(new Error("Device storage is busy. Close other vault windows and try again."));
          request.onsuccess = () => {
            if (settled || this.closed) {
              request.result.close();
              fail(new Error("Recovery stopped."));
              return;
            }
            settled = true;
            this.cancelOpen = null;
            this.db = request.result;
            this.db.onversionchange = () => this.close();
            resolve(this);
          };
        }).finally(() => {
          this.opening = null;
        });
        return this.opening;
      }
      transaction(store, mode, action) {
        if (this.closed || !this.db) return Promise.reject(new Error("Recovery stopped."));
        return new Promise((resolve, reject) => {
          let transaction;
          try {
            transaction = this.db.transaction(store, mode);
          } catch {
            reject(new Error("Device storage is unavailable. Recovery paused to protect your files."));
            return;
          }
          let request;
          transaction.oncomplete = () => resolve(request?.result);
          transaction.onerror = transaction.onabort = () => reject(new Error("Device storage could not be saved. Recovery paused to protect your files."));
          try {
            request = action(transaction.objectStore(Array.isArray(store) ? store[0] : store), transaction);
          } catch (error) {
            transaction.abort();
            reject(error);
          }
        });
      }
      get(key) {
        return this.transaction("state", "readonly", (store) => store.get(key));
      }
      put(key, value) {
        return this.transaction("state", "readwrite", (store) => store.put(value, key));
      }
      async remember(path, bytes, reason = "snapshot") {
        if (typeof path !== "string" || !path || !isBytes(bytes)) throw new Error("Invalid recovery snapshot.");
        if (bytes.byteLength > MAX_HISTORY_BYTES) throw new Error("The recovery snapshot exceeds device storage limits.");
        const snapshot = bytes.slice();
        const digest = await this.crypto.subtle.digest("SHA-256", snapshot);
        const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
        await this.transaction(["info", "history"], "readwrite", (info, transaction) => {
          const history = transaction.objectStore("history");
          const request = info.index("path").getAll(path);
          const insert = () => {
            const all = info.getAll();
            all.onsuccess = () => {
              try {
                const records = all.result.sort((a, b) => b.modified - a.modified);
                const record = {
                  id: this.crypto.randomUUID(),
                  path,
                  size: snapshot.byteLength,
                  hash,
                  reason: typeof reason === "string" ? reason : "Recovery snapshot",
                  modified: Math.max(Date.now(), (records[0]?.modified || 0) + 1)
                };
                info.put(record);
                history.put({ id: record.id, bytes: snapshot });
                records.unshift(record);
                pruneRecords(records, info, history);
              } catch {
                transaction.abort();
              }
            };
          };
          request.onsuccess = () => {
            try {
              const previous = request.result.sort((a, b) => b.modified - a.modified)[0];
              if (previous?.hash === hash && previous.size === snapshot.byteLength) return;
              if (previous && previous.hash === null && previous.size === snapshot.byteLength) {
                const old = history.get(previous.id);
                old.onsuccess = () => {
                  if (equalBytes(old.result?.bytes, snapshot)) info.put({ ...previous, hash });
                  else insert();
                };
              } else {
                insert();
              }
            } catch {
              transaction.abort();
            }
          };
          return request;
        });
      }
      async history(path) {
        const records = await this.transaction("info", "readonly", (store) => path === void 0 ? store.getAll() : store.index("path").getAll(path));
        return records.sort((a, b) => b.modified - a.modified).map(({ id, path: path2, modified, reason, size }) => ({ id, path: path2, modified, reason, size }));
      }
      async readSnapshot(id) {
        if (typeof id !== "string" || !id || id.length > 128) throw new Error("Invalid recovery snapshot identifier.");
        let metadata;
        const record = await this.transaction(["history", "info"], "readonly", (history, transaction) => {
          const info = transaction.objectStore("info").get(id);
          info.onsuccess = () => {
            metadata = info.result;
          };
          return history.get(id);
        });
        if (this.closed) throw new Error("Recovery stopped.");
        if (!metadata || !isBytes(record?.bytes) || record.bytes.byteLength > MAX_HISTORY_BYTES || record.bytes.byteLength !== metadata.size) {
          throw new Error("This recovery snapshot is unavailable. Choose another saved version.");
        }
        return record.bytes;
      }
      close() {
        this.closed = true;
        this.cancelOpen?.();
        this.db?.close();
        this.db = null;
      }
    };
    function equalBytes(a, b) {
      return isBytes(a) && isBytes(b) && a.byteLength === b.byteLength && a.every((byte, i) => byte === b[i]);
    }
    module2.exports = { SyncStorage, equalBytes, MAX_HISTORY_BYTES, MAX_HISTORY_RECORDS, MAX_VERSIONS_PER_FILE };
  }
});

// src/sync/local.js
var require_local = __commonJS({
  "src/sync/local.js"(exports2, module2) {
    "use strict";
    var MAX_FILE_BYTES = 10 * 1024 * 1024;
    var RESTORE_FOLDER = "Native Notes Restored";
    var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    function scopeKey(path) {
      return String(path || "").normalize("NFKC").toUpperCase().toLowerCase();
    }
    function inside(path, folder) {
      return folder && (path === folder || path.startsWith(`${folder}/`));
    }
    function validateRelativePath(path) {
      if (typeof path !== "string" || !path || path.length > 4096 || path.startsWith("/") || /^[a-z]:/i.test(path) || path.includes("\\") || Array.from(path).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) {
        throw new Error("Recovery requires a safe vault-relative path.");
      }
      for (const part of path.split("/")) {
        const normalized = part.normalize("NFKC");
        if (!part || normalized === "." || normalized === ".." || /[/\\]/.test(normalized)) {
          throw new Error("Recovery requires a safe vault-relative path.");
        }
      }
      return path;
    }
    function validateBytes(bytes) {
      if (!ArrayBuffer.isView(bytes) || Object.prototype.toString.call(bytes) !== "[object Uint8Array]") throw new Error("Invalid recovery data.");
      if (bytes.byteLength > MAX_FILE_BYTES) throw new Error("A selected file exceeds the 10 MiB recovery limit.");
    }
    function exactBuffer(bytes) {
      return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    }
    var VaultFiles = class {
      constructor(app, storage, options, alive, cryptoProvider = typeof window !== "undefined" ? window.crypto : void 0) {
        this.app = app;
        this.storage = storage;
        this.options = options;
        this.alive = alive;
        this.crypto = cryptoProvider;
      }
      visiblePath(path) {
        try {
          validateRelativePath(path);
        } catch {
          return false;
        }
        if (path.split("/").some((part) => part.normalize("NFKC").startsWith("."))) return false;
        const key = scopeKey(path);
        return !inside(key, scopeKey(RESTORE_FOLDER)) && !inside(key, scopeKey(this.app.vault.configDir));
      }
      includes(path) {
        return this.visiblePath(path) && (this.options.attachments === true || path.toLowerCase().endsWith(".md"));
      }
      check(path) {
        if (!this.alive()) throw new Error("Recovery stopped.");
        if (!this.includes(path)) throw new Error("This path is excluded from recovery snapshots.");
      }
      async list() {
        if (!this.alive()) throw new Error("Recovery stopped.");
        return this.app.vault.getFiles().filter((file) => this.includes(file.path)).map((file) => file.path);
      }
      async read(path) {
        this.check(path);
        const file = this.app.vault.getAbstractFileByPath(path);
        if (!file) return null;
        if (!file.stat) throw new Error("A folder occupies the selected file path.");
        if (file.stat.size > MAX_FILE_BYTES) throw new Error("A selected file exceeds the 10 MiB recovery limit.");
        const buffer = await this.app.vault.readBinary(file);
        this.check(path);
        if (Object.prototype.toString.call(buffer) !== "[object ArrayBuffer]") throw new Error("Obsidian returned invalid recovery data.");
        const bytes = new Uint8Array(buffer);
        validateBytes(bytes);
        if (file.path !== path || this.app.vault.getAbstractFileByPath(path) !== file) {
          throw new Error("A file moved while recovery was reading it. Try again.");
        }
        return bytes;
      }
      async parents(target) {
        validateRelativePath(target);
        if (!target.startsWith(`${RESTORE_FOLDER}/`)) throw new Error("Restored copies must stay in the recovery folder.");
        const parts = target.split("/");
        parts.pop();
        let parent = "";
        for (const part of parts) {
          if (!this.alive()) throw new Error("Recovery stopped.");
          parent = parent ? `${parent}/${part}` : part;
          const existing = this.app.vault.getAbstractFileByPath(parent);
          if (existing?.stat) throw new Error("A file occupies a required recovery folder path.");
          if (!existing) {
            try {
              await this.app.vault.createFolder(parent);
            } catch {
              const created = this.app.vault.getAbstractFileByPath(parent);
              if (!created || created.stat) throw new Error("The recovery folder could not be created.");
            }
          }
        }
        if (!this.alive()) throw new Error("Recovery stopped.");
      }
      async restoreCopy(path, bytes) {
        validateRelativePath(path);
        if (!this.visiblePath(path)) throw new Error("Hidden, configuration, and recovery paths cannot be restored here.");
        validateBytes(bytes);
        if (!this.alive()) throw new Error("Recovery stopped.");
        if (!this.crypto?.randomUUID) throw new Error("Secure recovery identifiers are unavailable on this device.");
        const id = this.crypto.randomUUID();
        if (!UUID.test(id)) throw new Error("A safe recovery identifier could not be created.");
        const target = `${RESTORE_FOLDER}/${id}/${path}`;
        if (this.app.vault.getAbstractFileByPath(target)) throw new Error("That recovery copy already exists. Try restoring again.");
        const snapshot = new Uint8Array(bytes);
        await this.parents(target);
        if (!this.alive()) throw new Error("Recovery stopped.");
        if (this.app.vault.getAbstractFileByPath(target)) throw new Error("That recovery copy already exists. Try restoring again.");
        return this.app.vault.createBinary(target, exactBuffer(snapshot));
      }
    };
    module2.exports = { VaultFiles, MAX_FILE_BYTES, RESTORE_FOLDER, validateRelativePath, exactBuffer };
  }
});

// src/sync/controller.js
var require_controller = __commonJS({
  "src/sync/controller.js"(exports2, module2) {
    "use strict";
    var { SyncStorage } = require_storage();
    var { VaultFiles } = require_local();
    var CONFIG_KEY = "native-notes-cloud-folders-v1";
    function syncDefaults() {
      return { enabled: false, provider: "icloud", attachments: false };
    }
    function normalizeSyncSettings(value) {
      const config = syncDefaults();
      if (!value || typeof value !== "object") return config;
      config.enabled = value.enabled === true;
      config.attachments = value.attachments === true;
      config.provider = value.provider === "onedrive" ? "onedrive" : "icloud";
      return config;
    }
    var NativeSync2 = class {
      constructor(plugin) {
        this.plugin = plugin;
        this.app = plugin.app;
        this.config = normalizeSyncSettings(this.app.loadLocalStorage?.(CONFIG_KEY));
        this.status = "Off";
        this.listeners = /* @__PURE__ */ new Set();
        this.generation = 0;
        this.storage = null;
        this.storagePromise = null;
        this.timer = null;
        this.work = null;
        this.destroyed = false;
      }
      load() {
        for (const event of ["create", "modify", "delete", "rename"]) {
          if (this.app.vault?.on) this.plugin.registerEvent(this.app.vault.on(event, () => this.schedule(2e3)));
        }
        if (this.plugin.registerDomEvent) {
          this.plugin.registerDomEvent(document, "visibilitychange", () => {
            if (!document.hidden) this.schedule(500);
          });
        }
        if (this.config.enabled) this.app.workspace.onLayoutReady(() => {
          if (!this.destroyed) this.schedule(1e3);
        });
      }
      subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
      }
      setStatus(text) {
        if (this.destroyed || this.plugin.disposed) return;
        this.status = String(text);
        for (const listener of this.listeners) listener(this.status);
      }
      assertAlive() {
        if (this.destroyed || this.plugin.disposed) throw new Error("Cloud folder tools stopped.");
      }
      isCurrent(generation) {
        return !this.destroyed && !this.plugin.disposed && generation === this.generation;
      }
      async ensureStorage() {
        this.assertAlive();
        if (!this.storagePromise) {
          const storage = new SyncStorage(this.app);
          this.storage = storage;
          this.storagePromise = storage.open().then((result) => {
            this.assertAlive();
            return result;
          }).catch((error) => {
            storage.close();
            this.storagePromise = null;
            throw error;
          });
        }
        return this.storagePromise;
      }
      saveConfig() {
        this.assertAlive();
        this.app.saveLocalStorage(CONFIG_KEY, this.config);
      }
      async configure(patch) {
        const pending = this.pause(), generation = this.generation;
        await pending;
        if (!this.isCurrent(generation)) return;
        this.config = normalizeSyncSettings({ ...this.config, ...patch, enabled: false });
        this.saveConfig();
      }
      async setEnabled(enabled) {
        if (!enabled) return this.pause();
        const pending = this.pause(), generation = this.generation;
        await pending;
        if (!this.isCurrent(generation)) return;
        await this.ensureStorage();
        if (!this.isCurrent(generation)) return;
        this.config.enabled = true;
        this.saveConfig();
        this.setStatus("Recovery ready \xB7 cloud transfers are managed by your device.");
        this.schedule(0);
      }
      async pause() {
        this.config.enabled = false;
        this.generation++;
        if (this.timer !== null) window.clearTimeout(this.timer);
        this.timer = null;
        if (!this.destroyed && !this.plugin.disposed) {
          this.saveConfig();
          this.setStatus("Off \xB7 cloud transfers remain controlled by your device.");
        }
        if (this.work) await this.work.catch(() => {
        });
      }
      schedule(delay = 3e4) {
        if (this.destroyed || this.plugin.disposed || !this.config.enabled || this.work) return;
        if (this.timer !== null) window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
          this.timer = null;
          void this.run().catch(() => {
          });
        }, delay);
      }
      files(alive = () => !this.destroyed && !this.plugin.disposed) {
        return new VaultFiles(this.app, this.storage, this.config, alive);
      }
      run() {
        if (this.work) return this.work;
        if (!this.config.enabled || this.destroyed || this.plugin.disposed) return Promise.reject(new Error("Enable cloud folder tools to save recovery snapshots."));
        const generation = this.generation;
        this.work = (async () => {
          await this.ensureStorage();
          const alive = () => this.isCurrent(generation) && this.config.enabled;
          if (!alive()) return;
          this.setStatus("Saving local recovery snapshots\u2026");
          const local = this.files(alive);
          let count = 0, skipped = 0;
          for (const path of await local.list()) {
            if (!alive()) return;
            let bytes;
            try {
              bytes = await local.read(path);
            } catch {
              if (!alive()) return;
              skipped++;
              continue;
            }
            if (!alive()) return;
            if (bytes) {
              await this.storage.remember(path, bytes, "Cloud folder recovery");
              count++;
            }
          }
          if (alive()) this.setStatus(`Recovery checked for ${count} file${count === 1 ? "" : "s"}${skipped ? ` \xB7 ${skipped} skipped (unavailable or over 10 MiB)` : ""} \xB7 cloud delivery is managed by your device.`);
        })().catch((error) => {
          if (this.isCurrent(generation)) this.setStatus(error.message || "Recovery snapshot could not be saved.");
          throw error;
        }).finally(() => {
          this.work = null;
          this.schedule(3e4);
        });
        return this.work;
      }
      destroy() {
        this.destroyed = true;
        this.generation++;
        if (this.timer !== null) window.clearTimeout(this.timer);
        this.timer = null;
        this.listeners.clear();
        this.storage?.close();
      }
    };
    module2.exports = { NativeSync: NativeSync2, normalizeSyncSettings, syncDefaults, CONFIG_KEY };
  }
});

// src/main.js
var { Plugin, Notice } = require("obsidian");
var { normalizeSettings, CORE_FEATURES } = require_settings();
var { OWNED_CLASSES, classNames, settingsCSS } = require_appearance();
var { NativeNotesSettingsTab } = require_settings_tab();
var { CodeFeatures } = require_code_features();
var { FloatingOutline } = require_outline();
var { MediaAlignment } = require_media_alignment();
var { DOMState } = require_dom_state();
var { NativeSync } = require_controller();
var { SyncHistoryModal } = require_ui();
module.exports = class NativeNotes extends Plugin {
  async onload() {
    this.disposed = false;
    this.documents = /* @__PURE__ */ new Map();
    this.documentDisposers = /* @__PURE__ */ new Map();
    this.documentStates = /* @__PURE__ */ new Map();
    this.settingsModals = /* @__PURE__ */ new Set();
    this.saveQueue = Promise.resolve();
    const stored = await this.loadData();
    this.settings = normalizeSettings(stored);
    this.sync = new NativeSync(this);
    this.sync.load();
    this.settingTab = new NativeNotesSettingsTab(this.app, this);
    this.addSettingTab(this.settingTab);
    this.codeFeatures = this.addChild(new CodeFeatures(this));
    this.outline = this.addChild(new FloatingOutline(this));
    this.mediaAlignment = this.addChild(new MediaAlignment(this));
    this.addCommand({ id: "toggle-outline", name: "Toggle floating outline", checkCallback: (checking) => this.featureEnabled("outline") && this.outline.toggleActive(checking) });
    this.addCommand({ id: "cloud-recovery-snapshot", name: "Save cloud folder recovery snapshot", callback: () => {
      void this.sync.run().catch((error) => {
        if (!this.disposed) new Notice(error.message);
      });
    } });
    this.addCommand({ id: "cloud-recovery-history", name: "Open cloud folder recovery history", callback: () => new SyncHistoryModal(this).open() });
    this.registerEvent(this.app.workspace.on("window-open", (_window, win) => this.attachDocument(win.document)));
    this.registerEvent(this.app.workspace.on("window-close", (_window, win) => this.detachDocument(win.document)));
    this.registerEvent(this.app.workspace.on("layout-change", () => this.findDocuments()));
    this.app.workspace.onLayoutReady(() => {
      if (!this.disposed) this.findDocuments();
    });
    this.findDocuments();
    if (stored?.schemaVersion === 1) void this.updateSettings();
  }
  featureEnabled(key) {
    return !this.disposed && (CORE_FEATURES.includes(key) || this.settings.features[key] === true);
  }
  findDocuments() {
    this.attachDocument(document);
    this.app.workspace.iterateAllLeaves((leaf) => this.attachDocument(leaf.view.containerEl.ownerDocument));
    for (const doc of this.documents.keys()) if (doc.defaultView?.closed) this.detachDocument(doc);
  }
  attachDocument(doc) {
    if (this.disposed || !doc?.body || this.documents.has(doc)) return;
    const style = doc.createElement("style");
    style.dataset.nativeNotes = "settings";
    doc.head.appendChild(style);
    this.documents.set(doc, style);
    const cleanup = (event) => {
      if (!event.persisted) this.detachDocument(doc);
    };
    doc.defaultView?.addEventListener("pagehide", cleanup);
    this.documentDisposers.set(doc, () => doc.defaultView?.removeEventListener("pagehide", cleanup));
    this.applyDocument(doc, style);
    this.documentStates.set(doc, new DOMState(doc));
  }
  applyDocument(doc, style) {
    const names = new Set(classNames(this.settings));
    for (const name of OWNED_CLASSES) doc.body.classList.toggle(name, names.has(name));
    style.textContent = settingsCSS(this.settings);
  }
  detachDocument(doc) {
    if (!this.documents.has(doc)) return;
    this.documentStates.get(doc)?.destroy();
    this.documentStates.delete(doc);
    doc.body?.classList.remove(...OWNED_CLASSES);
    this.documents.get(doc).remove();
    this.documentDisposers.get(doc)?.();
    this.documentDisposers.delete(doc);
    this.documents.delete(doc);
  }
  applySettings() {
    if (this.disposed) return;
    for (const [doc, style] of this.documents) this.applyDocument(doc, style);
    this.codeFeatures?.refreshSettings();
    this.outline?.refreshSettings();
    this.mediaAlignment?.refreshSettings();
  }
  updateSettings() {
    if (this.disposed) return Promise.resolve(false);
    this.settings = normalizeSettings(this.settings);
    this.applySettings();
    const snapshot = JSON.parse(JSON.stringify(this.settings));
    this.saveQueue = this.saveQueue.catch(() => {
    }).then(() => this.saveData(snapshot));
    return this.saveQueue.then(() => true, (error) => {
      console.error("Native Notes could not save settings", error);
      if (!this.disposed) new Notice("Native Notes could not save your settings. Check that your vault is writable.");
      return false;
    });
  }
  async onExternalSettingsChange() {
    while (!this.disposed) {
      const pending = this.saveQueue;
      await pending.catch(() => {
      });
      if (pending !== this.saveQueue) continue;
      const next = normalizeSettings(await this.loadData());
      if (this.disposed) return;
      if (pending !== this.saveQueue) continue;
      this.settings = next;
      this.applySettings();
      break;
    }
  }
  onunload() {
    this.disposed = true;
    this.sync?.destroy();
    for (const modal of this.settingsModals) modal.close();
    this.settingsModals.clear();
    for (const doc of this.documents.keys()) this.detachDocument(doc);
  }
};
