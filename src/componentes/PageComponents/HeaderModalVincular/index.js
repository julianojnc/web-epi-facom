import { Link } from "react-router-dom";
import iconClose from "../../../assets/icon-close.png"

const HeaderModal = ({ title, onClose }) => {
    return (
        <div className="dialog-title">
            <h1>{title}</h1>

            <Link title="Fechar Modal" onClick={() => onClose()}>
                <span>
                    <img src={iconClose} alt="icon"></img>
                </span>
            </Link>
        </div>
    )
}

export default HeaderModal;
