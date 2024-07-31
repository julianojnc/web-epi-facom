import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal"
import iconClose from "../../../../assets/icon-close.png"

const ModalVincularPeriferico = ({ onClose }) => {
    return(
        <Modal>
            <div className="dialog-title">
                <h1>VINCULAR PERIFÉRICO</h1>

                <Link title="Fechar Modal" onClick={() => onClose()}>
                    <span>
                        <img src={iconClose} alt="icon"></img>
                    </span>
                </Link>
            </div>

            <div className="dialog-content">
                <form>
                    <label className="label"> Nome:
                        <input className="input" type="text" placeholder="Nome" />
                    </label>

                    <label className="label"> Patrimonio:
                        <input className="input" type="text" placeholder="Patrimonio" />
                    </label>

                    <label className="label"> Marca:
                        <input className="input" type="text" placeholder="Marca" />
                    </label>

                    <label className="label"> Service Tag:
                        <input className="input" type="text" placeholder="Service Tag" />
                    </label>

                    <label className="label"> Express Code:
                        <input className="input" type="text" placeholder="Express Code" />
                    </label>

                    <label className="label"> Data Compra:
                        <input className="input" type="date" placeholder="Data de incio" />
                    </label>

                    <label className="label"> Data Garantia:
                        <input className="input" type="date" placeholder="Data de Retorno" />
                    </label>

                    <label className="label"> Data Vinculação:
                        <input className="input" type="date" placeholder="Data Vinculação" />
                    </label>

                    <label className="label"> Data Desvinculação:
                        <input className="input" type="date" placeholder="Data Vinculação" />
                    </label>

                    <label className="label"> Registro Desvinculação:
                        <textarea className="input" type="text" placeholder="Data Vinculação" />
                    </label>

                    <div className="container-buttons">
                        <Link to='/cadastro-epi' className="button button-cadastrar">Cadastrar</Link>
                    </div>
                </form>

                {/* <TableManutencaoEpi /> */}
            </div>
        </Modal>
    )
}

export default ModalVincularPeriferico;
