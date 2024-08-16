import { Link } from "react-router-dom"
import Modal from "../../../../componentes/Modal"
import TableManutencaoEpi from "./TableManutencaoEpi"
import iconClose from "../../../../assets/icon-close.png"

const ModalManutencaoEpi = ({ onClose, objEpi }) => {
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

                    <input
                        value={objEpi.id}
                        name='objEpi.id'
                        className="input"
                        type="text"
                        placeholder="Id Epi"
                        hidden
                    />

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

                <TableManutencaoEpi />
            </div>
        </Modal>
    )
}

export default ModalManutencaoEpi