import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal";
import { useState } from "react";
import iconClose from "../../../../assets/icon-close.png"
import { cadastrarUsers, fetchEpiUser, vincularEpiUser } from "../../../PageUsers/api/apiUser";
import TableVincularUsuario from "./TableVincularUsuario";
import ModalSucess from "../../../../componentes/Modal/ModalSucess";
import Paginacao from "../../../../componentes/Paginacao";
import MediumLoading from "../../../../componentes/LoadingAnimation/MediumLoading";
import InputPrincipalUsuario from "../../../../componentes/PageComponents/InputModalUsuario/InputPrincipalUsuario";
import InputSecundarioUsuario from "../../../../componentes/PageComponents/InputModalUsuario/InputSecundarioUsuario";
import useSWR from 'swr';
import ModalLoading from "../../../../componentes/Modal/ModalLoading";

// Definindo o fetcher para SWR usando o método fetchEpiUser com paginação
const fetcher = (url, page, size) => fetchEpiUser(page, size);

const ModalVincularUsuario = ({ onClose, objEpi }) => {

    const user = {
        nome: '',
        email: '',
        telContato: ''
    };

    const epiUsuario = {
        idEpi: {
            id: ""
        },
        idUsuario: {
            id: "",
            nome: "",
            isVinculado: "",
        }
    }

    const [objUser, setObjUser] = useState(user); // Função para o cadastro de Usuários
    const [objEpiUsuario, setObjEpiUsuario] = useState(epiUsuario);
    const [vincularUsuarioPergunta, setVincularUsuarioPergunta] = useState(true);
    const [vincularUsuario, setVincularUsuario] = useState(false);
    const [inputSecundario, setInputSecundario] = useState(false); // Mostra novos inputs ao selecionar usuario
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);

    const cadastrarVinculoUsuario = () => {
        setVincularUsuario(true);
        setVincularUsuarioPergunta(false);
    };

    // Usando SWR para buscar os periféricos vinculados ao EPI
    const { data, error, isLoading, mutate } = useSWR(
        ['fetchEpiUser', paginaAtual, tamanhoPagina],
        () => fetcher('fetchEpiUser', paginaAtual, tamanhoPagina),
        { revalidateOnFocus: false, revalidateOnReconnect: true }
    );

    if (error) {
        console.error('Erro ao carregar usuarios:', error);
        return null;
    }

    if (isLoading || !data) {
        return (
            <ModalLoading />
        );
    }

    const { lista: epiUsuarios, totalRegistros, totalPaginas } = data;

    // Filtrar usuarios vinculados ao EPI
    const usersFiltrados = epiUsuarios.filter((item) => item.idEpi?.id === objEpi.id);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    // cadastrar novo usuario
    const cadastrar = async () => {
        if (!objUser.nome) {
            alert('Por favor, preencha o campo obrigatório: Nome!');
            return;
        }
        console.log('Objeto a ser enviado:', objUser);
        try {
            const response = await cadastrarUsers(objUser);
            console.log('Resposta da API:', response);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                // // Atualizar o estado com os dados do usuário cadastrado
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    setObjUser(response); // Preenche os inputs com os dados retornados da API
                    mutate();
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Usuario:', error);
            alert('Ocorreu um erro ao tentar cadastrar Usuario!');
        }
    };

    // vincular usuario
    const vincular = async () => {
        try {
            const response = await vincularEpiUser(objEpi.id, objUser.id);
            console.log('Resposta da API - Vinculação:', response);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true); // Exibe animação de sucesso
                setTimeout(() => {
                    setSucessAnimation(false);
                    onClose(); // Fecha modal após sucesso
                    mutate();
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao vincular EPI com usuario:', error);
            alert('Ocorreu um erro ao tentar vincular o EPI com o usuario.');
        }
    };

    // Função para lidar com a seleção do periférico
    const handleSelectUsuario = (usuarioSelecionado) => {
        // Atualizando o objeto objEpiPeriferico com todos os dados relevantes
        setObjEpiUsuario({
            id: usuarioSelecionado.id || '',
            idEpi: {
                id: objEpi?.id || "", // Usando o ID do EPI atual, ou vazio caso não exista
            },
            idUsuario: {
                id: usuarioSelecionado?.idUsuario?.id || "",
                nome: usuarioSelecionado?.idUsuario?.nome || "",
                email: usuarioSelecionado?.idUsuario?.email || "",
                telContato: usuarioSelecionado?.idUsuario?.telContato || "",
                isVinculado: usuarioSelecionado?.idUsuario?.isVinculado || false, // Status de vinculação, ou falso
            },
        });

        // Exibir inputs secundários com mais detalhes sobre o periférico
        setInputSecundario(true);
        // Debug para garantir que os dados foram atualizados corretamente
        console.log("Usuario selecionado:", objEpiUsuario);
    };

    const aoDigitar = (e) => {
        setObjUser({ ...objUser, [e.target.name]: e.target.value });
        setObjEpiUsuario({ ...objEpiUsuario, [e.target.name]: e.target.value });
    };

    console.log(objUser)
    return (
        <Modal>
            {vincularUsuarioPergunta && (
                <>
                    <h1>Deseja Vincular um Usuário ao Equipamento: {objEpi.patrimonio}?</h1>

                    <div className="buttonsModal">
                        <Link className="buttonModalYes" onClick={cadastrarVinculoUsuario}>Sim</Link>
                        <Link className="buttonModalNo" onClick={onClose}>Não</Link>
                    </div>
                </>
            )}
            {vincularUsuario && (
                <>
                    <div className="dialog-title">
                        <h1>Vincular Usuário</h1>

                        <Link title="Fechar Modal" onClick={onClose}>
                            <span>
                                <img src={iconClose} alt="icon" />
                            </span>
                        </Link>
                    </div>

                    <div className="dialog-content">
                        <form className={inputSecundario === true ? "form-periferico" : ""}>

                            <InputPrincipalUsuario
                                objUser={objUser}
                                setObjUsuario={setObjUser}
                                objEpi={objEpi}
                                objEpiUsuarios={objEpiUsuario}
                                vincular={vincular}
                                cadastrar={cadastrar}
                                aoDigitar={aoDigitar}
                                onClose={onClose}
                            />

                            {inputSecundario && (
                                <InputSecundarioUsuario
                                    aoDigitar={aoDigitar}
                                    objEpiUsuario={objEpiUsuario}
                                />
                            )}
                        </form>

                        {isLoading || usersFiltrados.length === 0 ? (
                            <div className="modal-table">
                                <MediumLoading />
                            </div>
                        ) : (
                            <div className="modal-table">
                                <TableVincularUsuario
                                    vetor={usersFiltrados}
                                    onSelect={handleSelectUsuario}
                                />
                                <Paginacao
                                    paginaAtual={paginaAtual}
                                    totalPaginas={totalPaginas}
                                    totalRegistros={totalRegistros}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>

                    {sucessAnimation && (
                        <ModalSucess
                            id={objUser.id}
                            title="Usuário Cadastrado!"
                            titleEditar="Usuário Vinculado!"
                        />
                    )}
                </>
            )}
        </Modal>
    );
};

export default ModalVincularUsuario;
