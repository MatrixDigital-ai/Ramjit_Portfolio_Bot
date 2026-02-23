export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg1"></div>
            <div className="hero-bg2"></div>
            <div className="hero-grid"></div>
            <div className="hero-left">
                <div className="hero-tag">
                    <span className="dot-live">●</span> Ramjit Ray — Strategic Architect
                </div>
                <h1 className="hero-headline">
                    Scale is a <span className="ac">Choice.</span>
                    <br />
                    Implementation
                    <br />
                    is the <span className="co">Strategy.</span>
                </h1>
                <p className="hero-sub">
                    25 years. Defining brands. Building markets. Architecting
                    transformation for India&apos;s most consequential organisations —
                    across industries, geographies, and generations.
                </p>
                <div className="hero-ctas">
                    <a href="#contact" className="btn-p">
                        Apply for a Strategy Audit
                    </a>
                    <a href="#methodology" className="btn-s">
                        Explore The Grid →
                    </a>
                </div>
            </div>
            <div className="hero-right">
                <div className="hero-card">
                    <div className="hero-card-lbl">Track Record at a Glance</div>
                    <div className="stats-grid">
                        <div className="stat-box">
                            <div className="stat-num">25+</div>
                            <div className="stat-lbl">Years in Field</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-num">40+</div>
                            <div className="stat-lbl">Brands Built</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-num">20+</div>
                            <div className="stat-lbl">Countries</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-num">5L+</div>
                            <div className="stat-lbl">Lives Touched</div>
                        </div>
                    </div>
                    <div className="hero-div"></div>
                    <p className="hero-q">
                        &quot;Most enterprises don&apos;t lack ideas. They lack the
                        architecture to execute them.&quot;
                    </p>
                </div>
            </div>
        </section>
    );
}
