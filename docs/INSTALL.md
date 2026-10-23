# Installation and device transfer

Native Notes is published in the [Obsidian Community Plugins directory](https://community.obsidian.md/plugins/native-notes), with public downloads in [PratiyushT/native-notes](https://github.com/PratiyushT/native-notes). Development source is maintained privately. It requires Obsidian 1.13.0 or later on macOS, Windows, Linux, iPhone, or iPad. Native in-app testing on Windows, Linux, iPhone, and iPad remains unverified.

## Install through Community Plugins

1. Install or update Obsidian, then open or create a vault.
2. Open **Settings → Community plugins** and select **Turn on community plugins** if prompted.
3. Select **Browse**, search for **Native Notes**, and open its entry.
4. Select **Install**, then **Enable**.
5. Open **Settings → Native Notes** to choose your appearance and optional features. Start with Obsidian's Default theme for the most predictable result.

Use these steps on macOS, Windows, Linux, iPhone, and iPad. You can also select **Add to Obsidian** on the [directory page](https://community.obsidian.md/plugins/native-notes). For updates, use **Settings → Community plugins → Check for updates**.

## Install from a release on desktop

1. Open the [latest GitHub release](https://github.com/PratiyushT/native-notes/releases/latest) and download all three plugin assets: `main.js`, `manifest.json`, and `styles.css`. GitHub's automatically generated **Source code** archives contain a distribution snapshot, not the private development source. Use the three individual assets for installation.
2. Open or create a vault in Obsidian. Locate the vault's configuration folder, normally `.obsidian`. The folder button beside **Settings → Community plugins → Installed plugins** opens the plugins directory directly. If locating it manually, enable your file manager's option to show hidden files where necessary; macOS Finder uses **Command–Shift–.**.
3. Create `plugins/native-notes` inside that configuration folder if it does not exist.
4. Put `main.js`, `manifest.json`, and `styles.css` directly inside `plugins/native-notes`. Do not add an extra nested `native-notes` folder.
5. Restart Obsidian. Open **Settings → Community plugins**, select **Turn on community plugins** if prompted, then enable **Native Notes** in the installed list.
6. Open **Settings → Native Notes** to choose a color theme, text size, sidebar density, and optional features. All controls are visible on one scrolling page under **Appearance**, **Optional features**, **Code blocks**, and **Profiles**.

The expected structure is:

```text
Your vault/
  .obsidian/
    plugins/
      native-notes/
        main.js
        manifest.json
        styles.css
```

If your vault uses **Override config folder**, use that folder instead of `.obsidian`. Keep an existing `data.json` file when updating the three release files; it contains your saved preferences.

The same three files work across supported platforms and use local system fonts and bundled icons. Windows and Linux keep solid sidebars. On Mac, enable Obsidian's **Translucent window** preference if you want translucent sidebars.

The core appearance applies immediately. A new installation starts with the **Notes** theme, **Default** text size, and **Comfortable** sidebar density. Obsidian controls light/dark mode. Floating outline and empty-line marks start on; heading-level labels and extra table spacing start off. See the [feature and settings guide](../README.md) for all choices and defaults.

## Use the same setup on another device

### Through Obsidian Sync

Install and configure Native Notes on one device, then connect each device to the same remote vault. This can include macOS, Windows, Linux, iPhone, and iPad. On **each device**, open **Settings → Sync** and enable **Installed community plugin list** and the relevant plugin-settings option, if shown separately. Enable **Active community plugin list** if enabled/disabled states should also match. Sync preferences must be configured separately on each device. [Obsidian Sync settings](https://obsidian.md/help/sync/settings)

Wait for synchronization to finish, then reload Obsidian on the receiving device; iPhone or iPad may need the app closed and reopened. Check that Native Notes appears under Community plugins. [Applying synced configuration changes](https://obsidian.md/help/sync/settings)

If your phone needs different preferences, use a separate configuration profile and configure its Sync options accordingly. [Obsidian configuration profiles](https://obsidian.md/help/sync/settings)

### Without Obsidian Sync

A sync method that includes the vault's configuration folder can carry the plugin files and preferences. Follow that service's Obsidian instructions, and avoid running two synchronization services over the same vault. For a different vault, install Native Notes there and transfer its JSON settings profile separately.

You can install Native Notes directly through Community Plugins on each device, then import its settings profile. This avoids managing hidden plugin folders on iOS.

## Transfer just the settings

Open **Settings → Native Notes**, scroll to **Profiles → Transfer settings**, and choose **Export → Copy**. **Copy** intentionally writes the settings profile to your clipboard when you select it. On the other device, install and enable Native Notes, choose **Import**, paste the JSON, and select **Import** in the dialog. Import replaces your Native Notes appearance, code highlighting, and editor preferences. If automatic clipboard access is unavailable, select the exported text and use your device's Copy command. Profiles contain only Native Notes preferences; they exclude notes, Obsidian's active theme, and the macOS translucent-window preference.

**Save file** and **Choose file** provide an additional JSON-file route. File download behavior has not been checked on physical iPhone or iPad hardware; copying and importing the profile text avoids relying on downloads.

Keep a profile export before trying a different setup. **Restore defaults** resets Native Notes appearance and optional features after confirmation. It does not change note contents.

Native Notes exports version 2 profiles and accepts version 1 profiles. Older preferences convert to the closest theme preset and text-size choice; retained optional switches and the old compact-sidebar choice migrate to their new controls. Theme presets replace individual legacy color, font, and gap settings. Core styling follows the plugin's enabled state in Community plugins.

## Set up code highlighting

Code highlighting is built in and starts on. Open **Settings → Native Notes → Code blocks** to choose defaults for inline highlighting, line numbers, wrapping, and frame style. Individual code fences can specify titles, frames, markers, line numbers, wrapping, and collapsible sections. Colors follow the selected Native Notes preset. See the [code highlighting guide](CODE-HIGHLIGHTING.md) for examples and limits.

## Disable or remove

Disable Native Notes under **Settings → Community plugins** to suspend its styling and behavior while keeping its preferences. The underlying theme remains available. Uninstalling the plugin removes its installation and saved settings; export a profile first if you may want them later. Filename and language edits already saved to your notes remain ordinary Markdown.

## Use the floating outline

**Native Notes → Optional features → Floating outline** starts on for a new installation. Open it from the note toolbar to browse headings, search, collapse nested sections, and follow the current section. Its switch is saved in settings profiles.

## Upgrading from 2.2 or earlier

Version 2.3 removes the iCloud/OneDrive setup section and all associated recovery controls and commands. It stops creating Native Notes snapshots and provides no history browser or restore action. Existing histories, restored copies, and notes are left untouched; your operating system's sync service continues independently. Before updating, review [how to preserve earlier recovery data](SYNC.md) if you used those features.
