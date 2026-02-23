export default function CelebStrip() {
    const celebs = [
        "Shabana Azmi", "Javed Akhtar", "Boman Irani",
        "Kabir Bedi", "Harsha Bhogle", "Shiv Khera",
        "Gour Gopal Das", "Arunima Sinha", "Shreya Ghosal",
        "Sonu Nigam", "Sukhwinder Singh", "Monali Thakur",
        "Pawandeep Rajan", "Amit Trivedi", "Shaan",
    ];

    return (
        <div className="celeb-strip">
            <div className="cs-lbl">
                Speakers &amp; Performers Who Have Graced Matrix Platforms
            </div>
            <div className="celebs">
                {celebs.map((name) => (
                    <span key={name} className="celeb">
                        {name}
                    </span>
                ))}
            </div>
        </div>
    );
}
