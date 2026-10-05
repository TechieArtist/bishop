"""Patches pricing.html for the desktop gallery layout.
Run from your site's root folder:  python3 apply_desktop_update.py
Needs css/desktop.css and js/desktop.js to already be in place."""
import os, re, shutil, sys

PAGE = "pricing.html"
for needed in (PAGE, "css/desktop.css", "js/desktop.js"):
    if not os.path.exists(needed):
        sys.exit(f"Missing {needed} - put the files in place first.")

html = open(PAGE, encoding="utf-8").read()
if "desktop.css" in html:
    sys.exit("Already patched - nothing to do.")
shutil.copy(PAGE, PAGE + ".bak")

# 1. Untitled 2025: rebuild the block (removes the comments that swallowed closing </div>s)
fixed = '''<!-- Artwork 6: Untitled 2025 -->
<section class="artwork">
  <div class="artwork-grid">
    <div class="artwork-frame no-zoom">
      <div class="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/Hi8313E4Rk0"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          title="Untitled"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </div>

  <div class="art-info">
    <div class="left">
      <h2>Untitled 2025</h2>
      <p>3D animation · Mixed video · 2025</p>
    </div>
    <div class="right"></div>
  </div>
</section>

 '''
html, n1 = re.subn(r"<!-- Artwork 6.*?(?=<!-- Artwork 7)", lambda m: fixed, html, flags=re.S)

# 2. Stray </a> in Untitled 2023
def drop_a(m): return m.group(0).replace("</a>", "")
html, n2 = re.subn(r"<!-- Artwork 1.*?(?=<!-- Artwork 2)", drop_a, html, flags=re.S)

# 3. Link the new CSS and JS
css_tag = '<link rel="stylesheet" href="css/pricingstyle.css">'
html, n3 = html.replace(css_tag, css_tag + '\n<link rel="stylesheet" href="css/desktop.css">', 1), css_tag in html
html = html.replace("</body>", '<script src="js/desktop.js" defer></script>\n</body>', 1)

# 4. Let desktop.js drive the lightbox
marker = "lightbox.addEventListener('touchstart'"
api = ("window.lightboxAPI = { go: goToLightboxSlide, index: () => currentIndex, "
       "isOpen: () => lightbox.classList.contains('active'), close: closeLightbox };\n\n    ")
html, n4 = html.replace(marker, api + marker, 1), marker in html

open(PAGE, "w", encoding="utf-8").write(html)
print("Success" if all([n1, n2, n3, n4]) else f"Partial - check results: {n1, n2, n3, n4}")
print("Backup saved as pricing.html.bak")
