Salesforce Safari — One-page demo site

This is a static, responsive one-page website demo for "Salesforce Safari".

How to view:
- Open `d:\website\index.html` in your browser. For a local webserver (recommended) you can run a simple Python server from the folder:

	```powershell
	python -m http.server 8000
	```

	then open http://localhost:8000

Structure:
- index.html — main page
- css/styles.css — styles
- js/main.js — minimal JS for carousel and nav
- images/ — placeholder images (replace with real assets)

Notes:
- The contact form is a local demo (no backend).
 - Replace `images/map-jaipur.png` with a Google Maps embed if desired. To embed a Google Map, replace the static image in `index.html` with the iframe from Google Maps and add your API/key if using advanced features.

Image replacement and verification:
- To replace the site logo, copy your PNG to `d:\website\images\logo.png`. The header and footer reference this path.
- To replace any placeholder images (hero, blog thumbnails, client logos, landmarks, map), drop your PNG or JPG files into `d:\website\images` and overwrite the filenames:
	- `hero-dashboard.jpg`, `hero-automation.jpg`, `hero-jaipur.jpg`
	- `about-jaipur.jpg`
	- `blog1.jpg`, `blog2.jpg`, `blog3.jpg`
	- `client1.png`, `client2.png`
	- `landmark1.jpg`, `landmark2.jpg`, `landmark3.jpg`
	- `map-jaipur.png`

After replacing, open `d:\website\index.html` (or run a local server) and confirm images render. The site includes an automatic fallback: if an image fails to load the script will replace it with a lightweight SVG placeholder so the layout remains intact.

Deploy to GitHub (recommended - automatic via GitHub Actions):

1. Create a GitHub repository (you already provided: https://github.com/rakesh-attri/salesforce-safari-.git)
2. From PowerShell on your machine run:

```powershell
cd d:\website
git init
git add .
git commit -m "Initial site"
git remote add origin https://github.com/rakesh-attri/salesforce-safari-.git
git branch -M main
git push -u origin main
```

3. The workflow `.github/workflows/deploy-pages.yml` will run on push to `main` and publish the site to GitHub Pages. You can check Actions tab for progress.

4. After deployment, your Pages site will be available under `https://rakesh-attri.github.io/salesforce-safari-/` (GitHub may take a minute to provision). If you prefer a custom domain, set it in repository Settings → Pages.

Design cues:
- Warm Jaipur-inspired palette (saffron, sandstone, ivory)
- Mobile-first responsive layout
