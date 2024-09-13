import { Link } from "react-router-dom";
import MarcaCheckbox from "../../InputMarcaCheckbox";
import { alterarEpiPeriferico } from "../../../../Pages/PagePeriferico/api/apiPeriferico";
import { useState } from "react";
import ModalSucess from "../../../Modal/ModalSucess";

const InputPrincipalPeriferico = ({ aoDigitar, objEpi, objPeriferico, setObjPeriferico, objEpiPeriferico, cadastrar, vincular, onClose }) => {

    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [loadingButton, setLoadingButton] = useState(false);

    const alterar = async () => {
        if (!objEpiPeriferico.registroDesvinculacao) {
            alert('Por favor, preencha todos os campos obrigatórios: Registro de Desvinculação!');
            return;
        }
        setLoadingButton(true);

        try {
            const response = await alterarEpiPeriferico(objEpiPeriferico.id, objEpiPeriferico);
            console.log('Resposta da API:', response);
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
            console.error('Erro ao cadastrar/alterar Periferico:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Periferico.');
        } finally {
            setLoadingButton(false);
        }
    };

    return (
        <div>
            {objPeriferico.id || objEpiPeriferico.idPeriferico.id > 0 ? (
                <></>
            ) : (
                <label className="label"> Pesquisar Periféricos:
                    <input className="input" type="text" placeholder="Pesquisar Periféricos Existentes..." />
                </label>
            )}

            <input
                value={objEpi.id || objEpiPeriferico.idEpi.id}
                onChange={aoDigitar}
                name='objEpi.id'
                className="input"
                type="text"
                placeholder="Id Epi"
                hidden
            />

            <input
                value={objPeriferico.id || objEpiPeriferico.idPeriferico.id}
                onChange={aoDigitar}
                name='id'
                className="input"
                type="text"
                placeholder="Id Periferico"
                hidden
            />

            <label className="label"> Nome:
                <input
                    value={objPeriferico.nome || objEpiPeriferico.idPeriferico.nome}
                    onChange={aoDigitar}
                    name='nome'
                    className="input"
                    type="text"
                    placeholder="Nome" />
            </label>

            <label className="label"> Patrimonio:
                <input
                    value={objPeriferico.patrimonio || objEpiPeriferico.idPeriferico.patrimonio}
                    onChange={aoDigitar}
                    name='patrimonio'
                    className="input"
                    type="text"
                    placeholder="Patrimonio" />
            </label>

            <MarcaCheckbox
                id={objEpiPeriferico.idPeriferico.id}
                obj={objEpiPeriferico}
                setObj={setObjPeriferico}
                aoDigitar={aoDigitar}
                objEpiPeriferico={objEpiPeriferico}
            />

            <label className="label"> Data Compra:
                <input
                    value={objPeriferico.dataCompra || objEpiPeriferico.idPeriferico.dataCompra}
                    onChange={aoDigitar}
                    name='dataCompra'
                    className="input"
                    type="date"
                    placeholder="Data de incio" />
            </label>

            <label className="label"> Data Garantia:
                <input
                    value={objPeriferico.dataGarantia || objEpiPeriferico.idPeriferico.dataGarantia}
                    onChange={aoDigitar}
                    name='dataGarantia'
                    className="input"
                    type="date"
                    placeholder="Data de Retorno" />
            </label>

            <div className="container-buttons">
                <div className="container-buttons">
                    {objEpiPeriferico.id > 0 ? (
                        (objPeriferico.id || objEpiPeriferico.idPeriferico.id > 0) ? (
                            <Link onClick={alterar} className="button button-cadastrar" disabled={loadingButton}>
                                {loadingButton ? "Desvinculando..." : "Desvincular"}
                            </Link>
                        ) : null
                    ) : (
                        (objPeriferico.id || objEpiPeriferico.idPeriferico.id > 0) ? (
                            <Link onClick={vincular} className="button button-cadastrar" disabled={loadingButton}>
                                {loadingButton ? "Vinculando..." : "Vincular"}
                            </Link>
                        ) : (
                            <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
                        )
                    )}
                </div>

            </div>

            {sucessAnimation && (
                <ModalSucess
                    id={objEpiPeriferico.id}
                    title=""
                    titleEditar="Periférico Desvinculado!"
                />
            )}
        </div>
    )
}

export default InputPrincipalPeriferico;