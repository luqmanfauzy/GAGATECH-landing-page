<template>
  <footer class="footer-shell" aria-label="Site footer">
    <div class="footer-card">
      <div class="footer-grid">
        <section class="footer-brand">
          <UiLogoMark :size="190" />
          <p>Websites and systems designed to make day-to-day business easier.</p>
        </section>
        <section>
          <h2>Navigate</h2>
          <a href="/#work">Selected work</a>
          <a href="/#services">Services</a>
          <a href="/#process">How we work</a>
          <a href="/#faq">FAQ</a>
        </section>
        <section>
          <h2>Services</h2>
          <a href="/#services">Website development</a>
          <a href="/#services">Web applications</a>
          <a href="/#services">Care &amp; optimisation</a>
          <a href="/#contact">Custom request</a>
        </section>
        <section>
          <h2>Contact</h2>
          <a href="mailto:gagatech@mail.com"><span>EMAIL</span>gagatech@mail.com</a>
          <a href="https://wa.me/62863716131687" target="_blank" rel="noopener noreferrer"><span>WHATSAPP</span>+62 863 7161 3168</a>
          <p><span>LOCATION</span>Balikpapan, Indonesia</p>
        </section>
      </div>
      <div class="footer-rule" />
      <div class="footer-meta mono">
        <div class="footer-social"><a href="mailto:gagatech@mail.com" aria-label="Email GAGA TECH">@</a><a href="https://wa.me/62863716131687" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp GAGA TECH">WA</a></div>
        <span>© {{ new Date().getFullYear() }} GAGA TECH. ALL RIGHTS RESERVED.</span>
      </div>
      <div class="footer-word" aria-hidden="true">GAGATECH</div>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell{width:min(1380px,calc(100% - 112px));margin:0 auto;padding:36px 0 22px}.footer-card{position:relative;overflow:hidden;isolation:isolate;padding:clamp(2rem,5vw,5.8rem) clamp(1.5rem,5vw,5.8rem) 0;background:#091413;border:1px solid var(--line);border-radius:34px 34px 44px 44px}.footer-grid{display:grid;grid-template-columns:1.35fr repeat(3,1fr);gap:clamp(2rem,5vw,7rem);min-height:310px}.footer-grid section{display:flex;align-items:flex-start;flex-direction:column;gap:18px}.footer-brand{justify-content:flex-start}.footer-brand p{max-width:250px;margin-top:18px;color:#91b3a3;font-size:14px;line-height:1.65}.footer-grid h2{margin:0 0 22px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;letter-spacing:0}.footer-grid a,.footer-grid section>p{font-size:14px;line-height:1.35;transition:color .2s,transform .2s}.footer-grid a:hover{color:#fff;transform:translateX(4px)}.footer-grid section>p{margin:0}.footer-grid span{display:block;margin-bottom:6px;color:#759d8c;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:9px;letter-spacing:.1em}.footer-rule{height:1px;background:var(--line)}.footer-meta{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:28px 0 18px;color:#91b3a3;font-size:10px}.footer-social{display:flex;gap:12px}.footer-social a{display:grid;width:28px;height:28px;place-items:center;border:1px solid var(--line);border-radius:50%;font-size:9px;transition:background .2s,color .2s}.footer-social a:hover{background:var(--mint);color:var(--bg)}.footer-word{position:relative;z-index:-1;margin:-.11em -.06em -.2em;color:transparent;font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(4.9rem,15.1vw,13.8rem);font-weight:600;line-height:.82;letter-spacing:-.105em;-webkit-text-stroke:1px rgba(64,138,113,.82);user-select:none}@media (max-width:780px){.footer-shell{width:min(100% - 32px,1380px);padding-top:20px}.footer-card{border-radius:24px 24px 30px 30px}.footer-grid{grid-template-columns:1fr 1fr;min-height:0;gap:38px 24px}.footer-brand{grid-column:1/-1}.footer-brand p{margin-top:2px}.footer-grid h2{margin-bottom:8px}.footer-grid section{gap:12px}.footer-meta{align-items:flex-start;flex-direction:column;padding-bottom:14px}.footer-word{font-size:20vw;letter-spacing:-.12em}}@media (prefers-reduced-motion:reduce){.footer-grid a{transition:none}}
</style>
