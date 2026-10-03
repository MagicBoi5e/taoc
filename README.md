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
