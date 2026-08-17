# Manuel Cárdenas Aspajo — Website

Static copy of the Webflow site (https://mca-913f08.webflow.io/), rebuilt to host on GitHub Pages
instead of Webflow. All CSS, JS, fonts, and images have been downloaded locally — nothing points
back to Webflow's CDN anymore.

## Structure

```
index.html                      Inicio
trayectoria/index.html          Trayectoria
especialidades/index.html       Especialidades
contacto/index.html             Contacto
template-pages/proyectos/index.html   Proyectos
css/   js/   fonts/   images/   local copies of every asset
```

Internal links use root-relative paths (e.g. `/contacto`), so the site must be hosted at a
domain root — either a `<username>.github.io` user-page repo, or a project repo with a custom
domain attached.

## ⚠️ Contact form needs a new backend

The Contacto page's form was wired to Webflow's own form-handling service. That won't work on
GitHub Pages (which only serves static files) — submitting it will currently do nothing useful.
Common fixes: point the form at [Formspree](https://formspree.io) or a similar form endpoint, or
replace it with a `mailto:` link. Say the word if you'd like me to wire one of these up.

## Publish to GitHub Pages

Git isn't installed on this machine, so I couldn't push this myself. Once you install
[Git for Windows](https://git-scm.com/download/win) (or use GitHub Desktop), from this folder:

```
git init
git add .
git commit -m "Initial site copy from Webflow"
git branch -M main
git remote add origin https://github.com/<you>/<you>.github.io.git
git push -u origin main
```

Then in the repo's Settings → Pages, set the source to the `main` branch, root folder.
(If the repo is named `<username>.github.io`, Pages publishes automatically with no extra config.)

## Preview locally

```
py -m http.server 8000
```

Then open http://localhost:8000/
