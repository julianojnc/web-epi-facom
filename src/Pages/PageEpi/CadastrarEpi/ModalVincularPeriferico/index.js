import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal"
import iconClose from "../../../../assets/icon-close.png"
import TableVincularPeriferico from "./TableVincularPeriferico";
import { cadastrarPerifericos, fetchEpiPerifericos, vincularEpiPeriferico } from "../../../PagePeriferico/api/apiPeriferico";
import { useEffect, useState } from "react";
import ModalSucess from "../../../../componentes/Modal/ModalSucess";
import Paginacao from "../../../../componentes/Paginacao";
import MediumLoading from "../../../../componentes/LoadingAnimation/MediumLoading";
import InputSecundarioPeriferico from "../../../../componentes/PageComponents/InputModalPeriferico/InputSecundarioPeriferico";
import InputPrincipalPeriferico from "../../../../componentes/PageComponents/InputModalPeriferico/InputPrincipalPeriferico";
import useSWR from 'swr';
import ModalLoading from "../../../../componentes/Modal/ModalLoading";

// Função para carregar todas as páginas de perifericos vinculados ao EPI
const fetchAllPages = async () => {
    const allData = [];
    let currentPage = 0;
    let totalPages = 0;
    const tamanhoPagina = 10; // Definir tamanho de página conforme necessário

    do {
        const result = await fetchEpiPerifericos(currentPage, tamanhoPagina);
        allData.push(...result.lista); // Adiciona a lista de usuários à coleção completa
        currentPage += 1;
        totalPages = result.totalPaginas; // Atualiza o número total de páginas
    } while (currentPage < totalPages);

    return allData;
};

const ModalVincularPeriferico = ({ onClose, objEpi }) => {

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
        },
    };

    const epiPeriferico = {
        idEpi: {
            id: "",
        },
        idPeriferico: {
            id: "",
            nome: "",
            isVinculado: "",
        },
        dataVinculacao: "",
        dataDesvinculacao: "",
        registroDesvinculacao: ""
    };

    const [objPeriferico, setObjPeriferico] = useState(periferico);
    const [objEpiPeriferico, setObjEpiPeriferico] = useState(epiPeriferico);
    const [loadingButton, setLoadingButton] = useState(false);
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [inputSecundario, setInputSecundario] = useState(false); // Mostra novos inputs ao selecionar periferico
    const [paginaAtual, setPaginaAtual] = useState(0);

    useEffect(() => {
        if (objEpi && objEpi.id) {
            setObjEpiPeriferico(prevState => ({
                ...prevState,
                idEpi: { id: objEpi.id }
            }));
        }
    }, [objEpi]);

    // Usando SWR para buscar todos os usuários vinculados ao EPI
    const { data: allEpiPerifericos, error, isLoading, mutate } = useSWR('fetchAllPages', fetchAllPages, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    if (error) {
        console.error('Erro ao carregar perifericos:', error);
        return <></>;
    }

    if (isLoading || !allEpiPerifericos) {
        return <ModalLoading />;
    }

    // Filtrar usuários vinculados ao EPI atual
    const epiPerifericosFiltrados = allEpiPerifericos.filter((item) => item.idEpi?.id === objEpi.id);

    // Filtrar Usuarios vinculados e dividir em páginas
    const startIndex = paginaAtual * 10; // Posição inicial baseada na página atual
    const endIndex = startIndex + 10; // Posição final para os 10 itens da página atual

    // Pegando apenas os usuários filtrados para a página atual
    const epiPerifericosFiltradosPorPagina = epiPerifericosFiltrados.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    // cadastrar novo periferico
    const cadastrar = async () => {
        if (!objPeriferico.nome || !objPeriferico.idMarca.id) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome e Marca!');
            return;
        }
        console.log('Objeto a ser enviado:', objPeriferico);

        setLoadingButton(true);
        try {
            const response = await cadastrarPerifericos(objPeriferico);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                // Atualizar o estado com os dados do periferico cadastrado
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                mutate();
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    setObjPeriferico(response); // Preenche os inputs com os dados retornados da API
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Periferico:', error);
            if (error.response && error.response.data) {
                alert(error.response.data); // Exibe a mensagem de erro da resposta da API
            } else {
                alert('Ocorreu um erro ao tentar cadastrar Periferico.'); // Mensagem genérica se não houver detalhes
            }
        } finally {
            setLoadingButton(false);
        }
    };

    // vincular periferico
    const vincular = async () => {

        setLoadingButton(true);
        try {
            const response = await vincularEpiPeriferico(objEpi.id, objPeriferico.id);
            console.log('Resposta da API - Vinculação:', response);

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
            console.error('Erro ao vincular EPI com periférico:', error);
            if (error.response && error.response.data) {
                alert(error.response.data); // Exibe a mensagem de erro da resposta da API
            } else {
                alert('Ocorreu um erro ao tentar vincular o EPI com o periférico.'); // Mensagem genérica se não houver detalhes
            }
        } finally {
            setLoadingButton(false);
        }
    };

    // Função para lidar com a seleção do periférico
    const handleSelectPeriferico = (perifericoSelecionado) => {
        // Atualizando o objeto objEpiPeriferico com todos os dados relevantes
        setObjEpiPeriferico({
            id: perifericoSelecionado.id || '',
            idEpi: {
                id: objEpi?.id || "", // Usando o ID do EPI atual, ou vazio caso não exista
            },
            idPeriferico: {
                id: perifericoSelecionado?.idPeriferico?.id || "", // ID do periférico selecionado, ou vazio
                nome: perifericoSelecionado?.idPeriferico?.nome || "", // Nome do periférico selecionado, ou vazio
                patrimonio: perifericoSelecionado?.idPeriferico?.patrimonio || "", // Patrimônio do periférico, ou vazio
                serviceTag: perifericoSelecionado?.idPeriferico?.serviceTag || "", // Service tag do periférico, ou vazio
                expressCode: perifericoSelecionado?.idPeriferico?.expressCode || "", // Express code do periférico, ou vazio
                dataCompra: perifericoSelecionado?.idPeriferico?.dataCompra || "", // Data de compra do periférico, ou vazio
                dataGarantia: perifericoSelecionado?.idPeriferico?.dataGarantia || "", // Data de garantia do periférico, ou vazio
                idMarca: {
                    id: perifericoSelecionado?.idPeriferico?.idMarca?.id || "", // ID da marca do periférico, ou vazio
                },
                isVinculado: perifericoSelecionado?.idPeriferico?.isVinculado || false, // Status de vinculação, ou falso
            },
            dataVinculacao: perifericoSelecionado?.dataVinculacao || "", // Data de vinculação, ou vazio
            dataDesvinculacao: perifericoSelecionado?.dataDesvinculacao || "", // Data de desvinculação, ou vazio
            registroDesvinculacao: perifericoSelecionado?.registroDesvinculacao || "", // Registro de desvinculação, ou vazio
        });

        // Exibir inputs secundários com mais detalhes sobre o periférico
        setInputSecundario(true);

        // Debug para garantir que os dados foram atualizados corretamente
        console.log("Periférico selecionado:", objEpiPeriferico);
    };

    const aoDigitar = (e) => {
        setObjPeriferico({ ...objPeriferico, [e.target.name]: e.target.value });
        setObjEpiPeriferico({ ...objEpiPeriferico, [e.target.name]: e.target.value });
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
                <form className={inputSecundario === true ? "form-periferico" : ""}>
                    <InputPrincipalPeriferico
                        aoDigitar={aoDigitar}
                        objPeriferico={objPeriferico}
                        objEpiPeriferico={objEpiPeriferico}
                        objEpi={objEpi}
                        setObjPeriferico={setObjPeriferico}
                        cadastrar={cadastrar}
                        vincular={vincular}
                        loadingButton={loadingButton}
                        onClose={onClose}
                    />

                    {inputSecundario && (
                        <InputSecundarioPeriferico
                            aoDigitar={aoDigitar}
                            objEpiPeriferico={objEpiPeriferico}
                        />
                    )}
                </form>

                {isLoading || epiPerifericosFiltrados.length === 0 ? (
                    <div className="modal-table">
                        <MediumLoading />
                    </div>
                ) : (
                    <div className="modal-table">
                        <TableVincularPeriferico
                            vetor={epiPerifericosFiltradosPorPagina}
                            onSelect={handleSelectPeriferico}
                        />
                        <Paginacao
                            paginaAtual={paginaAtual}
                            totalPaginas={Math.ceil(epiPerifericosFiltrados.length / 10)}
                            totalRegistros={epiPerifericosFiltrados.length}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
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
