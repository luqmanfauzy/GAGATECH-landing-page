<template>
    <footer class="footer-shell" aria-label="Site footer">
        <div class="footer-card">
            <div class="footer-grid">
                <section class="footer-brand">
                    <UiLogoMark :size="190" />
                    <p>
                        Websites and systems designed to make day-to-day
                        business easier.
                    </p>
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
                    <a href="mailto:gagatech@mail.com"
                        ><span>EMAIL</span>gagatech@mail.com</a
                    >
                    <a
                        href="https://wa.me/62863716131687"
                        target="_blank"
                        rel="noopener noreferrer"
                        ><span>WHATSAPP</span>+62 863 7161 3168</a
                    >
                    <p><span>LOCATION</span>Balikpapan, Indonesia</p>
                </section>
            </div>
            <div class="footer-rule" />
            <div class="footer-meta mono">
                <div class="footer-social">
                    <a
                        href="mailto:gagatech@mail.com"
                        aria-label="Email GAGA TECH"
                        >@</a
                    ><a
                        href="https://wa.me/62863716131687"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp GAGA TECH"
                        >WA</a
                    >
                </div>
                <span
                    >© {{ new Date().getFullYear() }} GAGA TECH. ALL RIGHTS
                    RESERVED.</span
                >
            </div>
            <div class="footer-word" aria-hidden="true">GAGATECH</div>
        </div>
    </footer>
</template>

<style scoped>
.footer-shell {
    width: 100%;
    padding: 36px var(--gutter) 22px;
}
.footer-card {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(2rem, 5vw, 5.8rem) clamp(1.5rem, 5vw, 5.8rem) 0;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 34px 34px 44px 44px;
}
.footer-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) repeat(3, minmax(0, 1fr));
    gap: clamp(2rem, 5vw, 7rem);
    min-height: 310px;
}
.footer-grid section {
    min-width: 0;
    overflow-wrap: anywhere;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
}
.footer-brand {
    justify-content: flex-start;
}
.footer-brand p {
    max-width: 250px;
    margin-top: 18px;
    color: var(--secondary);
    font-size: 14px;
    line-height: 1.65;
}
.footer-grid h2 {
    margin: 0 0 22px;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0;
}
.footer-grid a,
.footer-grid section > p {
    font-size: 14px;
    line-height: 1.35;
    transition:
        color 0.2s,
        transform 0.2s;
}
.footer-grid a:is(:hover, :focus-visible, :active) {
    color: var(--blue);
    text-decoration: underline;
    text-underline-offset: 5px;
}
.footer-grid a:active {
    text-decoration-thickness: 2px;
}
.footer-grid section > p {
    margin: 0;
}
.footer-grid a > span,
.footer-grid p > span {
    display: block;
    margin-bottom: 6px;
    color: var(--accent);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
}
.footer-rule {
    height: 1px;
    background: var(--line);
}
.footer-meta {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 28px 0 18px;
    color: var(--secondary);
    font-size: 10px;
}
.footer-social {
    display: flex;
    gap: 12px;
}
.footer-social a {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 50%;
    font-size: 9px;
    transition:
        background 0.2s,
        color 0.2s;
}
.footer-social a:is(:hover, :focus-visible, :active) {
    background: var(--blue);
    color: var(--blue-foreground);
    border-color: var(--blue);
}
.footer-social a:active {
    background: color-mix(in srgb, var(--blue) 85%, var(--blue-foreground));
}
.footer-word {
    position: relative;
    z-index: -1;
    margin: -0.11em -0.06em -0.2em;
    color: transparent;
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: clamp(4.9rem, 15.1vw, 13.8rem);
    font-weight: 600;
    line-height: 0.82;
    letter-spacing: -0.105em;
    -webkit-text-stroke: 1px var(--mint);
    user-select: none;
}
@media (max-width: 780px) {
    .footer-shell {
        width: 100%;
        padding-top: 20px;
    }
    .footer-card {
        border-radius: 24px 24px 30px 30px;
    }
    .footer-grid {
        grid-template-columns: 1fr 1fr;
        min-height: 0;
        gap: 38px 24px;
    }
    .footer-brand {
        grid-column: 1/-1;
    }
    .footer-brand p {
        margin-top: 2px;
    }
    .footer-grid h2 {
        margin-bottom: 8px;
    }
    .footer-grid section {
        gap: 12px;
    }
    .footer-meta {
        align-items: flex-start;
        flex-direction: column;
        padding-bottom: 14px;
    }
    .footer-word {
        font-size: 20vw;
        letter-spacing: -0.12em;
    }
}
@media (prefers-reduced-motion: reduce) {
    .footer-grid a {
        transition: none;
    }
}
.footer-word {
    -webkit-text-stroke-color: var(--blue);
}
</style>
