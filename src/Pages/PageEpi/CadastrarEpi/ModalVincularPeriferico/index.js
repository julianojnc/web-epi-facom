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

    const [perifericos, setPerifericos] = useState([]);
    const [objPeriferico, setObjPeriferico] = useState(periferico);
    const [epiPerifericos, setEpiPerifericos] = useState([]);
    const [objEpiPeriferico, setObjEpiPeriferico] = useState(epiPeriferico);
    const [carregando, setCarregando] = useState(true); // Hook para mostrar animação de Carregamento
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [inputSecundario, setInputSecundario] = useState(false); // Mostra novos inputs ao selecionar periferico
    const [totalRegistros, setTotalRegistros] = useState(0); // Hook para armazenar o total de registros info vinda da api
    const [totalPaginas, setTotalPaginas] = useState(0); // Hook para armazenar o total de paginas info vinda da api
    const [paginaAtual, setPaginaAtual] = useState(0); // Hook para armazenar em qual pagina esta selecionada info vinda da api
    const [tamanhoPagina] = useState(7); // Hook para dizer quantos registro ira ser mostrado na tela

    // Carregando Api epi-periferico
    useEffect(() => {
        const fetchAndSetPeriferico = async () => {
            setCarregando(true); // Ativa o carregamento antes da busca
            const { lista, totalRegistros, totalPaginas } = await fetchEpiPerifericos(paginaAtual, tamanhoPagina);
            setEpiPerifericos(lista);
            setTotalRegistros(totalRegistros);
            setTotalPaginas(totalPaginas);
            setCarregando(false); // Desativa o carregamento após a busca
        };
        fetchAndSetPeriferico();
    }, [paginaAtual, tamanhoPagina]);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    // Filtro das perifericos com base no objEpi.id
    const perifericosFiltrados = epiPerifericos.filter((item) => {
        return (item.idEpi?.id === objEpi.id);
    });

    // cadastrar novo periferico
    const cadastrar = async () => {
        if (!objPeriferico.nome || !objPeriferico.idMarca.id) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome e Marca!');
            return;
        }
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

    // Função para lidar com a seleção do periférico
    const handleSelectPeriferico = (perifericoSelecionado) => {
        // Atualizando o objeto epiPeriferico com todos os dados relevantes
        setObjEpiPeriferico({
            id: perifericoSelecionado.id,
            idEpi: {
                id: objEpi.id, // Usando o ID do EPI atual
            },
            idPeriferico: {
                id: perifericoSelecionado.idPeriferico.id, // ID do periférico selecionado
                nome: perifericoSelecionado.idPeriferico.nome, // Nome do periférico selecionado
                patrimonio: perifericoSelecionado.idPeriferico.patrimonio,
                serviceTag: perifericoSelecionado.idPeriferico.serviceTag,
                expressCode: perifericoSelecionado.idPeriferico.expressCode,
                dataCompra: perifericoSelecionado.idPeriferico.dataCompra,
                dataGarantia: perifericoSelecionado.idPeriferico.dataGarantia,
                idMarca: {
                    id: perifericoSelecionado.idPeriferico.idMarca.id,
                },
                isVinculado: perifericoSelecionado.idPeriferico.isVinculado, // Status de vinculação do periférico
            },
            dataVinculacao: perifericoSelecionado.dataVinculacao || "", // Data de vinculação se disponível
            dataDesvinculacao: perifericoSelecionado.dataDesvinculacao || "", // Data de desvinculação se disponível
            registroDesvinculacao: perifericoSelecionado.registroDesvinculacao || "", // Registro de desvinculação se disponível
        });

        // Exibir inputs secundários com mais detalhes sobre o periférico
        setInputSecundario(true);

        // Debug para garantir que os dados foram atualizados corretamente
        console.log("Periférico selecionado:", objEpiPeriferico);
    };

    const aoDigitar = (e) => {
        setObjPeriferico({ ...objPeriferico, [e.target.name]: e.target.value });
        setObjEpiPeriferico({ ...objEpiPeriferico, [e.target.name]: e.target.value});
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
                        id={id}
                        setObjPeriferico={setObjPeriferico}
                        cadastrar={cadastrar}
                        vincular={vincular}
                        onClose={onClose}
                    />

                    {inputSecundario && (
                        <InputSecundarioPeriferico
                            aoDigitar={aoDigitar}
                            objEpiPeriferico={objEpiPeriferico}
                        />
                    )}
                </form>

                {carregando || perifericosFiltrados.length === 0 ? (
                    <div className="modal-table">
                        <MediumLoading />
                    </div>
                ) : (
                    <div className="modal-table">
                        <TableVincularPeriferico
                            vetor={perifericosFiltrados}
                            onSelect={handleSelectPeriferico}
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
                    id={objPeriferico.id}
                    title="Periférico Cadastrado!"
                    titleEditar="Periférico Vinculado!"
                />
            )}

        </Modal>
    )
}

export default ModalVincularPeriferico;
