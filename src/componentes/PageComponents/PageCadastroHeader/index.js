import { Link } from "react-router-dom";
import iconUser from "../../../assets/icon-user-black.png"
import iconLink from "../../../assets/icon-link.png"
import iconManutencao from "../../../assets/icon-manutencao.png"

const CadastroHeader = ({ id, title, titleEditar, hiddenUsuario, hiddenPeriferico, hiddenManutencao, setUsuarioOpen, setPerifericoOpen, setManutencaoOpen }) => {
    return (
        <div className="title">
            <h1>{id ? titleEditar : title}</h1>
            {id ? (
                <div className="link-manutencao">
                    <ul>
                        <li>
                            <Link onClick={() => setUsuarioOpen(true)} hidden={hiddenUsuario} title='Vincular Usuário'>
                                <span>
                                    <img src={iconUser} alt="icon"></img>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setPerifericoOpen(true)} hidden={hiddenPeriferico} title='Vincular Periférico'>
                                <span>
                                    <img src={iconLink} alt="icon"></img>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setManutencaoOpen(true)} hidden={hiddenManutencao} title='Registros de Manutenção'>
                                <span>
                                    <img src={iconManutencao} alt="icon"></img>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="link-manutencao">
                </div>
            )}
        </div>
    )
}

export default CadastroHeader;