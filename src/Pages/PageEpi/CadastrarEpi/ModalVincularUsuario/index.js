import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal";
import { useEffect, useState } from "react";
import iconClose from "../../../../assets/icon-close.png";
import { cadastrarUsers, fetchEpiUser, vincularEpiUser } from "../../../PageUsers/api/apiUser";
import TableVincularUsuario from "./TableVincularUsuario";
import ModalSucess from "../../../../componentes/Modal/ModalSucess";
import Paginacao from "../../../../componentes/Paginacao";
import MediumLoading from "../../../../componentes/LoadingAnimation/MediumLoading";
import InputPrincipalUsuario from "../../../../componentes/PageComponents/InputModalUsuario/InputPrincipalUsuario";
import InputSecundarioUsuario from "../../../../componentes/PageComponents/InputModalUsuario/InputSecundarioUsuario";
import useSWR from 'swr';
import ModalLoading from "../../../../componentes/Modal/ModalLoading";

// Função para carregar todas as páginas de usuários vinculados ao EPI
const fetchAllPages = async () => {
    const allData = [];
    let currentPage = 0;
    let totalPages = 0;
    const tamanhoPagina = 10; // Definir tamanho de página conforme necessário

    do {
        const result = await fetchEpiUser(currentPage, tamanhoPagina);
        allData.push(...result.lista); // Adiciona a lista de usuários à coleção completa
        currentPage += 1;
        totalPages = result.totalPaginas; // Atualiza o número total de páginas
    } while (currentPage < totalPages);

    return allData;
};

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
    };

    const [objUser, setObjUser] = useState(user); // Função para o cadastro de Usuários
    const [objEpiUsuario, setObjEpiUsuario] = useState(epiUsuario);
    const [loadingButton, setLoadingButton] = useState(false);
    const [vincularUsuarioPergunta, setVincularUsuarioPergunta] = useState(true);
    const [vincularUsuario, setVincularUsuario] = useState(false);
    const [inputSecundario, setInputSecundario] = useState(false); // Mostra novos inputs ao selecionar usuario
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [paginaAtual, setPaginaAtual] = useState(0);

    const cadastrarVinculoUsuario = () => {
        setVincularUsuario(true);
        setVincularUsuarioPergunta(false);
    };

    useEffect(() => {
        if (objEpi && objEpi.id) {
            setObjEpiUsuario(prevState => ({
                ...prevState,
                idEpi: { id: objEpi.id }
            }));
        }
    }, [objEpi]);

    // Usando SWR para buscar todos os usuários vinculados ao EPI
    const { data: allEpiUsers, error, isLoading, mutate } = useSWR('fetchAllPages', fetchAllPages, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    if (error) {
        console.error('Erro ao carregar usuarios:', error);
        return <></>;
    }

    if (isLoading || !allEpiUsers) {
        return <ModalLoading />;
    }

    // Filtrar usuários vinculados ao EPI atual
    const epiUsersFiltrados = allEpiUsers.filter((item) => item.idEpi?.id === objEpi.id);

    // Filtrar Usuarios vinculados e dividir em páginas
    const startIndex = paginaAtual * 10; // Posição inicial baseada na página atual
    const endIndex = startIndex + 10; // Posição final para os 10 itens da página atual

    // Pegando apenas os usuários filtrados para a página atual
    const epiUsersFiltradosPorPagina = epiUsersFiltrados.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    // Cadastrar novo usuario
    const cadastrar = async () => {
        if (!objUser.nome) {
            alert('Por favor, preencha o campo obrigatório: Nome!');
            return;
        }
        setLoadingButton(true);
        try {
            const response = await cadastrarUsers(objUser);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                mutate();
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    setObjUser(response); // Preenche os inputs com os dados retornados da API
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Usuario:', error);
            alert('Ocorreu um erro ao tentar cadastrar Usuario!');
        } finally {
            setLoadingButton(false);
        }
    };

    // Vincular usuario
    const vincular = async () => {
        setLoadingButton(true);
        try {
            const response = await vincularEpiUser(objEpi.id, objUser.id);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true); // Exibe animação de sucesso
                mutate();
                setTimeout(() => {
                    setSucessAnimation(false);
                    onClose(); // Fecha modal após sucesso
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao vincular EPI com usuario:', error);
            alert('Ocorreu um erro ao tentar vincular o EPI com o usuario.');
        } finally {
            setLoadingButton(false);
        }
    };

    // Função para lidar com a seleção do usuário
    const handleSelectUsuario = (usuarioSelecionado) => {
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
                isVinculado: usuarioSelecionado?.idUsuario?.isVinculado || false,
            },
        });

        setInputSecundario(true);
    };

    const aoDigitar = (e) => {
        setObjUser({ ...objUser, [e.target.name]: e.target.value });
        setObjEpiUsuario({ ...objEpiUsuario, [e.target.name]: e.target.value });
    };

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
                                loadingButton={loadingButton}
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

                        {isLoading || epiUsersFiltrados.length === 0 ? (
                            <div className="modal-table">
                                <MediumLoading />
                            </div>
                        ) : (
                            <div className="modal-table">
                                <TableVincularUsuario
                                    vetor={epiUsersFiltradosPorPagina}
                                    onSelect={handleSelectUsuario}
                                />
                                <Paginacao
                                    paginaAtual={paginaAtual}
                                    totalPaginas={Math.ceil(epiUsersFiltrados.length / 10)}
                                    totalRegistros={epiUsersFiltrados.length}
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
