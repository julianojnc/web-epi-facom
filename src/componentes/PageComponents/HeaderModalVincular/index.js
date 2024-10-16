import { Link, useNavigate } from "react-router-dom";
import iconClose from "../../../assets/icon-close.png"
import iconLinkIr from "../../../assets/icon-link-ir.png"

const HeaderModal = ({ title, onClose, id, url }) => {
    const navigate = useNavigate();

    return (
        <div className="dialog-title">
            <div>
                <h1>{title}</h1>

                {id ? (
                    <span title={url}>
                        <img src={iconLinkIr} alt="iconLinkIr" onClick={() => navigate(url)}></img>
                    </span>
                ) : (
                    <></>
                )}
            </div>

            <Link title="Fechar Modal" onClick={() => onClose()}>
                <span>
                    <img src={iconClose} alt="icon"></img>
                </span>
            </Link>
        </div>
    )
}

export default HeaderModal;
