export default function Ticker() {
    const brands = [
        "Tata Steel", "ITC Limited", "Pepsi India", "Lafarge India",
        "Aditya Birla Group", "Taj Hotels", "Hutch India", "Jindal Steel",
        "UNICEF", "Govt. of West Bengal", "Govt. of Odisha", "Hindustan Times",
        "Keventers", "Lakme", "Berger Paints", "Colgate",
    ];

    const renderBrands = () =>
        brands.map((b, i) => (
            <span key={i}>
                {i > 0 && <span className="dot">·</span>}
                <span>{b}</span>
            </span>
        ));

    return (
        <div className="ticker">
            <div className="ticker-lbl">Trusted By</div>
            <div className="ticker-inner">
                {renderBrands()}
                {renderBrands()}
            </div>
        </div>
    );
}
