# Banana Bread Trades

The site is built with Eleventy. You write Markdown files and Eleventy turns them into the finished website in the `_site` folder.

## First-time setup

1. Install Node.js (the LTS version) from nodejs.org.
2. Open a terminal in this folder and run `npm install`.
3. Run `npm start`, then open http://localhost:8080. The page reloads each time you save a file.

## Add a journal entry

1. Save your chart screenshot to `src/images/`, for example `src/images/nvda-2026-10-02.jpg`.
2. Copy `templates/new-journal-entry.md` into `src/journal/` and rename it, for example `2026-10-02-nvda.md`. The file name becomes the page's web address.
3. Fill in the fields at the top and write your post underneath.

The newest entry automatically becomes the homepage feature, shows up in the Trade Journal list and on the Charts page, and is added to its play's page.

To list a title before the post is written, add `comingSoon: true` at the top of the file instead of a date. It shows as "Coming soon" at the bottom of the writing list. When the post is ready, remove that line and add a `date:`.

## Add or edit a play

Each play is a file in `src/playbook/`. The file name (without `.md`) is what a journal entry's `play:` field points to. Remove `sample: true` once a play has your real rules. `order:` sets its position in the playbook.

## Other things you can change

- Site name, start year, disclaimer: `src/_data/site.json`
- Top menu: `src/_data/nav.json`
- About page: `src/about.md`
- Colors and fonts: `src/css/site.css` (the variables at the top)
- Page layouts: `src/_includes/layouts/`

## Put it online (GitHub Pages)

This folder includes `.github/workflows/deploy.yml`, which builds and publishes the site every time you push changes.

1. Create a new repository on github.com and upload this folder to it (GitHub Desktop is the easiest way).
2. In the repository, go to Settings → Pages and set Source to "GitHub Actions".
3. Push a change (or run the "Deploy site" workflow from the Actions tab). The site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
