# The Arena of Champions — site

Everything in this folder is plain HTML/CSS/JS with no build step. Copy the
contents of this folder into the root of your GitHub Pages repository and it
works as-is.

```
index.html              Talent tree (with Library and Character Sheet buttons)
library.html            Rulebook covers, password gate, in-page PDF reader,
                        plus the monster token gallery on the same page
CharacterSheet/         Interactive character sheet (opens at
                        CharacterSheet/character_sheet.html and saves locally)
assets/site.css         Styling for the library page
assets/vault.js         Encryption / decryption (AES-256-GCM, PBKDF2-SHA256)
assets/covers/*.jpg     Cover images (public — these are the clickable cards)
assets/books/*.pdf.enc  Encrypted rulebooks
assets/tokens/          Your token images go here
assets/tokens.json      Which token files to show
```

## How the lock works

The rulebook PDFs are **encrypted**, not just hidden. Each `.enc` file is
AES-256-GCM ciphertext; the key is derived from your password with
PBKDF2-SHA256 at 300,000 iterations using a random salt stored in the file.

The password is never in the repository, never in the JavaScript and never
sent anywhere. Someone who downloads `assets/books/arena.pdf.enc` straight
from GitHub gets meaningless bytes. This is real protection, unlike a
JavaScript "if password === ..." check.

The trade-off: if you lose the password the files are gone. Keep a copy of the
original PDFs somewhere off the site.

## Replacing the rulebooks (or changing the password)

The encryption tool is **not** part of the website — it only runs on your
computer. Keep your personal copy of the tool (it works offline in any
browser); ask for a fresh copy from the chat if you lose it.

1. Open the encrypt tool in your browser.
2. Choose the PDF, type your password twice, click **Encrypt & download**.
3. Rename the downloaded file to `arena.pdf.enc` or `bestiary.pdf.enc`
   and put it in `assets/books/`.
4. Use the same password for both books so one unlock opens the library.

To refresh a cover image, replace `assets/covers/arena.jpg` /
`bestiary.jpg` (portrait, roughly A4 proportions).

## Adding tokens

1. Put the image files in `assets/tokens/`.
2. List the filenames in `assets/tokens.json`:

```json
{
  "tokens": [
    "goblin-brute.png",
    { "file": "ancient_red_dragon.png", "name": "Ancient Red Dragon" }
  ]
}
```

A plain string gets its label from the filename (underscores and dashes become
spaces). Tokens are public — no password.

Tokens keep their subfolders, so a `CR 3/orc_warchief.png` inside
`assets/tokens/` shows up as "Orc Warchief — CR 3", and the download-all zip
keeps the CR folders.

## Character sheet

The round character button beside Library opens the interactive character
sheet. Its entries are saved automatically in that browser's local storage,
so they remain after refreshing or reopening the page. The **Reset Character**
button clears that saved character after confirmation.

## Adding a third book

Duplicate one `.book-card` block in `library.html` and point `data-file`,
`data-filename`, `data-title`, `data-book` and the `<img src>` at the new
files. No other changes needed.
