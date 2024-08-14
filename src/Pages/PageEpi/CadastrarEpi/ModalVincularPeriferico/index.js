import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal"
import iconClose from "../../../../assets/icon-close.png"
import TableVincularPeriferico from "./TableVincularPeriferico";
import { cadastrarPerifericos } from "../../../PagePeriferico/api/apiPeriferico";
import { useState } from "react";
import MarcaCheckbox from "../../../../componentes/PageComponents/InputMarcaCheckbox";

const ModalVincularPeriferico = ({ onClose, id }) => {

    const periferico = {
        nome: '',
        patrimonio: '',
        serviceTag: '',
        expressCode: '',
        dataCompra: '',
        dataGarantia: '',
        isVinculado: '',
        idMarca: {
            id: '',
        }
    };

    const [perifericos, setPerifericos] = useState([]);
    const [objPeriferico, setObjPeriferico] = useState(periferico);

    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objPeriferico);
        try {
            const response = await cadastrarPerifericos(objPeriferico);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setPerifericos([...perifericos, response]);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Periferico:', error);
            alert('Ocorreu um erro ao tentar cadastrar Periferico.');
        }
    };

    const aoDigitar = (e) => {
        setObjPeriferico({ ...objPeriferico, [e.target.name]: e.target.value });
    }

    return (
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
                        <input
                            value={objPeriferico.nome}
                            onChange={aoDigitar}
                            name='nome'
                            className="input"
                            type="text"
                            placeholder="Nome" />
                    </label>

                    <label className="label"> Patrimonio:
                        <input
                            value={objPeriferico.patrimonio}
                            onChange={aoDigitar}
                            name='patrimonio'
                            className="input"
                            type="text"
                            placeholder="Patrimonio" />
                    </label>

                    <MarcaCheckbox
                        id={id}
                        obj={objPeriferico}
                        setObj={setObjPeriferico}
                        aoDigitar={aoDigitar}
                    />

                    <label className="label"> Data Compra:
                        <input
                            value={objPeriferico.dataCompra}
                            onChange={aoDigitar}
                            name='dataCompra'
                            className="input"
                            type="date"
                            placeholder="Data de incio" />
                    </label>

                    <label className="label"> Data Garantia:
                        <input
                        value={objPeriferico.dataGarantia}
                            onChange={aoDigitar}
                            name='dataGarantia'
                            className="input"
                            type="date"
                            placeholder="Data de Retorno" />
                    </label>

                    {/* <label className="label"> Data Vinculação:
                        <input
                        value={objPeriferico.nome}
                            onChange={aoDigitar}
                            name='nome'
                            className="input"
                            type="date"
                            placeholder="Data Vinculação" />
                    </label>

                    <label className="label"> Data Desvinculação:
                        <input
                            className="input"
                            type="date"
                            placeholder="Data Vinculação" />
                    </label>

                    <label className="label"> Registro Desvinculação:
                        <textarea
                            className="input"
                            type="text"
                            placeholder="Data Vinculação" />
                    </label> */}

                    <div className="container-buttons">
                        <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
                        <Link to='/cadastro-epi' className="button button-cadastrar">Vincular</Link>
                    </div>
                </form>

                <TableVincularPeriferico />
            </div>
        </Modal>
    )
}

export default ModalVincularPeriferico;
