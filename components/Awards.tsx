export default function Awards() {
    return (
        <section className="awards">
            <div className="stag stag-y">06 — Recognition</div>
            <h2 className="awh">
                Awards That Validate <em>Implementation,</em> Not Intent.
            </h2>
            <p
                style={{
                    fontSize: "17px",
                    color: "var(--mid-gray)",
                    lineHeight: 1.75,
                    maxWidth: "600px",
                    marginBottom: "52px",
                }}
            >
                Every recognition here emerged from actual work delivered in market — not
                submitted decks or internal nominations.
            </p>
            <div className="awgrid">
                <div className="aw t">
                    <div className="awico">🏆</div>
                    <div>
                        <div className="awtitle">WOW Awards Asia</div>
                        <p className="awdesc">
                            Recognised in two categories:{" "}
                            <em>Industry/Association Convention of the Year</em> and{" "}
                            <em>Brand Association with a Business Platform</em> — the most
                            prestigious event management honour in Asia.
                        </p>
                    </div>
                </div>
                <div className="aw n">
                    <div className="awico">⭐</div>
                    <div>
                        <div className="awtitle">AIMA Inspiring Loyalty Award</div>
                        <p className="awdesc">
                            National recognition for the Tata Tiscon and Tata Shaktee loyalty
                            programs — among India&apos;s most complex stakeholder relationship
                            architectures ever built in heavy manufacturing.
                        </p>
                    </div>
                </div>
                <div className="aw c">
                    <div className="awico">🥇</div>
                    <div>
                        <div className="awtitle">ACEF Asian Leaders Award 2019</div>
                        <p className="awdesc">
                            Gold for{" "}
                            <em>Excellence in Rural Marketing Retail Communication</em> — Tata
                            Astrum Super — redefining how rural India engages with a premium
                            industrial brand.
                        </p>
                    </div>
                </div>
                <div className="aw y">
                    <div className="awico">🎯</div>
                    <div>
                        <div className="awtitle">Future of Retail Awards 2019</div>
                        <p className="awdesc">
                            Gold for <em>New Brand Launch in Rural Markets</em> — the Tata
                            Astrum Super rural GTM strategy, now a benchmark for legacy
                            industrial brands entering new geographies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
