import { Link } from "react-router-dom"
import Modal from "../../../../componentes/Modal"
import iconClose from "../../../../assets/icon-close.png"
import TableManutencaoPeriferico from "./TableManutencaoPeriferico"

const ModalManutencaoPeriferico = ({ onClose }) => {
    return (

        <Modal>
            <div className="dialog-title">
                <h1>REGISTRO DE MANUTENÇÃO</h1>

                <Link title="Fechar Modal" onClick={() => onClose()}>
                    <span>
                        <img src={iconClose} alt="icon"></img>
                    </span>
                </Link>
            </div>

            <div className="dialog-content">
                <form>
                    <label className="label"> Descrição:
                        <textarea className="input" type="text" placeholder="Descrição" />
                    </label>

                    <label className="label"> Valor:
                        <input className="input" type="text" placeholder="Valor" />
                    </label>

                    <label className="label"> Data Inicio:
                        <input className="input" type="date" placeholder="Data de incio" />
                    </label>

                    <label className="label"> Data Retorno:
                        <input className="input" type="date" placeholder="Data de Retorno" />
                    </label>

                    <div className="container-buttons">
                        <Link to='/cadastro-epi' className="button button-cadastrar">Cadastrar</Link>
                    </div>
                </form>

                <TableManutencaoPeriferico />
            </div>
        </Modal>
    )
}

export default ModalManutencaoPeriferico;