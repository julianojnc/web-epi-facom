import { Link } from "react-router-dom"
import Modal from ".."
import TableManutencao from "./TableManutencao"
import iconClose from "../../../assets/icon-close.png"
import { useEffect, useState } from "react"
import { cadastrarManutencao } from "./api/apiManutencao"
import ModalSucess from "../ModalSucess";

const ModalManutencao = ({ onClose, objEpiPeriferico, isEpi }) => {

    const manutencao = {
        descricao: "",
        valor: "",
        dataIniManutencao: "",
        dataRetManutencao: "",
        idEpi: {
            id: ""
        },
        idPeriferico: {
            id: ""
        }
    };

    const [manutencoes, setManutencoes] = useState([]);
    const [objManutencao, setObjManutencao] = useState(manutencao);
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso

    // Atualiza o idEpi ou idPeriferico baseado no isEpi
    useEffect(() => {
        if (objEpiPeriferico && objEpiPeriferico.id) {
            setObjManutencao(prevState => ({
                ...prevState,
                ...(isEpi === "epi"
                    ? { idEpi: { id: objEpiPeriferico.id } }
                    : { idPeriferico: { id: objEpiPeriferico.id } })
            }));
        }
    }, [objEpiPeriferico, isEpi]);

    // cadastrar manutencao
    const cadastrar = async () => {

        if (!objManutencao.descricao) {
            alert('Por favor, preencha o campo obrigatório: Descrição!');
            return;
        }

        console.log('Objeto a ser enviado antes da modificação:', objManutencao);
        
        // Se enviar o obj com o idEpi e idPeriferico tera bad request 500 entao e removido um antes do post
        // Clonar o objeto para evitar modificar o estado diretamente
        const objEnvio = { ...objManutencao };
    
        // Remover idPeriferico se for EPI e idEpi se for Periférico
        if (isEpi === "epi") {
            delete objEnvio.idPeriferico;
        } else {
            delete objEnvio.idEpi;
        }
    
        console.log('Objeto a ser enviado após modificação:', objEnvio);
    
        try {
            const response = await cadastrarManutencao(objEnvio);
            console.log('Resposta da API:', response);
    
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                // Atualizar o estado com os dados da manutencao cadastrada
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    setObjManutencao(response); // Preenche os inputs com os dados retornados da API
                    setManutencoes([...manutencoes, response]);
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Manutencao:', error);
            alert('Ocorreu um erro ao tentar cadastrar Manutencao!');
        }
    };
    

    console.log(objManutencao)

    const aoDigitar = (e) => {
        setObjManutencao({ ...objManutencao, [e.target.name]: e.target.value });
    }

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
                        value={isEpi === "epi" ? objManutencao.idEpi.id : objManutencao.idPeriferico.id}
                        name={isEpi === "epi" ? 'idEpi.id' : 'idPeriferico.id'}
                        onChange={aoDigitar}
                        className="input"
                        type="text"
                        placeholder={isEpi === "epi" ? "Id EPI" : "Id Periférico"}
                    />

                    <input
                        value={objManutencao.id || ''}
                        name='objManutencao.id'
                        onChange={aoDigitar}
                        className="input"
                        type="text"
                        placeholder="Id Manutencao"
                        hidden
                    />

                    <label className="label"> Descrição:
                        <textarea
                            value={objManutencao.descricao}
                            name="descricao"
                            onChange={aoDigitar}
                            className="input"
                            type="text"
                            placeholder="Descrição"
                        />
                    </label>

                    <label className="label"> Valor:
                        <input
                            value={objManutencao.valor}
                            name="valor"
                            onChange={aoDigitar}
                            className="input"
                            type="text"
                            placeholder="Valor"
                        />
                    </label>

                    <label className="label"> Data Inicio:
                        <input
                            value={objManutencao.dataIniManutencao}
                            name="dataIniManutencao"
                            onChange={aoDigitar}
                            className="input"
                            type="date"
                            placeholder="Data de incio"
                        />
                    </label>

                    <label className="label"> Data Retorno:
                        <input
                            value={objManutencao.dataRetManutencao}
                            name="dataRetManutencao"
                            onChange={aoDigitar}
                            className="input"
                            type="date"
                            placeholder="Data de Retorno"
                        />
                    </label>

                    <div className="container-buttons">
                        <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                    </div>
                </form>

                <TableManutencao />
            </div>

            {sucessAnimation && (
                <ModalSucess
                    id={objManutencao.id}
                    title="Manutencao Cadastrada!"
                    titleEditar="Manutencao Alterada!"
                />
            )}

        </Modal>
    )
}

export default ModalManutencao