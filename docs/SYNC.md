# Preserving earlier recovery data

Cloud-folder setup and recovery tools were removed in Native Notes **2.3.0**. This version does not capture new snapshots, browse saved history, or restore versions. Appearance, editing tools, and profiles remain available.

Updating does not move or delete your notes, earlier snapshots, or restored copies. It does not change iCloud, OneDrive, Obsidian Sync, or another service that already transfers your vault. Those services continue independently of Native Notes.

## What to keep

| Earlier data | Where it remains |
| --- | --- |
| Shared recovery snapshots | The hidden `.native-notes-history` folder inside the vault. Include it in a separate, fully downloaded vault backup if you want to preserve these snapshots. An existing sync service may continue transferring these ordinary files. |
| Restored copies | `Native Notes Restored/` inside the vault. These remain ordinary files that you can open and edit. |
| Local recovery history | Obsidian's browser database on the original device. It is not part of the vault or an appearance profile, so copying the vault does not preserve it. Version 2.3 leaves it unused and does not migrate or export it. |
| Earlier recovery preferences | Existing saved settings remain unused. They do not enable capture in version 2.3. |

If you still use 2.2 and need a saved version, use its existing recovery controls to restore a copy before updating. Avoid clearing Obsidian's application data on a device whose local history you still need. Keep the original device and a complete vault backup until you have checked that every needed version was preserved.

Keep a separate backup of your current notes as well as any history you want to retain. Sync can propagate deletion or damage; stored snapshots are not a substitute for a backup.

Return to the [current usage guide](../README.md) or [installation instructions](INSTALL.md).
