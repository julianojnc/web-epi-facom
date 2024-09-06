import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal"
import iconClose from "../../../../assets/icon-close.png"
import TableVincularPeriferico from "./TableVincularPeriferico";
import { cadastrarPerifericos, vincularEpiPeriferico } from "../../../PagePeriferico/api/apiPeriferico";
import { useState } from "react";
import MarcaCheckbox from "../../../../componentes/PageComponents/InputMarcaCheckbox";
import ModalSucess from "../../../../componentes/Modal/ModalSucess";

const ModalVincularPeriferico = ({ onClose, id, objEpi }) => {

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
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso

    // cadastrar novo periferico
    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objPeriferico);
        try {
            const response = await cadastrarPerifericos(objPeriferico);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                // Atualizar o estado com os dados do periferico cadastrado
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    setObjPeriferico(response); // Preenche os inputs com os dados retornados da API
                    setPerifericos([...perifericos, response]);
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Periferico:', error);
            alert('Ocorreu um erro ao tentar cadastrar Periferico.');
        }
    };

    // vincular periferico
    const vincular = async () => {
        try {
            const response = await vincularEpiPeriferico(objEpi.id, objPeriferico.id);
            console.log('Resposta da API - Vinculação:', response);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true); // Exibe animação de sucesso
                setTimeout(() => {
                    setSucessAnimation(false);
                    onClose(); // Fecha modal após sucesso
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao vincular EPI com periférico:', error);
            alert('Ocorreu um erro ao tentar vincular o EPI com o periférico.');
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

                    <label className="label"> Pesquisar Periféricos:
                        <input className="input" type="text" placeholder="Pesquisar Periféricos Existentes..." />
                    </label>

                    <input
                        value={objEpi.id}
                        onChange={aoDigitar}
                        name='objEpi.id'
                        className="input"
                        type="text"
                        placeholder="Id Epi"
                        hidden
                    />

                    <input
                        value={objPeriferico.id}
                        onChange={aoDigitar}
                        name='id'
                        className="input"
                        type="text"
                        placeholder="Id Periferico"
                        hidden
                    />

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

                    <div className="container-buttons">
                        <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
                        <Link onClick={vincular} className="button button-cadastrar">Vincular</Link>
                    </div>
                </form>

                <TableVincularPeriferico />
            </div>

            {sucessAnimation && (
                        <ModalSucess
                            id={objPeriferico.id}
                            title="Periférico Cadastrado!"
                            titleEditar="Periférico Vinculado!"
                        />
                    )}

        </Modal>
    )
}

export default ModalVincularPeriferico;
