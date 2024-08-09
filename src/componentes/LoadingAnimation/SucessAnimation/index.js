const SucessAnimation = ({ onClose }) => {
    return (
        <div className="content">
            <svg width="300" height="300">
                <circle
                    fill="none"
                    stroke="#68E534"
                    strokeWidth="15"
                    cx="150"
                    cy="150"
                    r="140"
                    strokeLinecap="round"
                    transform="rotate(-90 150 150)"
                    className="circle"
                />
                <polyline
                    fill="none"
                    stroke="#68E534"
                    points="66,160 130,213 228,103"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tick"
                />
            </svg>
        </div>
    );
};

export default SucessAnimation;
