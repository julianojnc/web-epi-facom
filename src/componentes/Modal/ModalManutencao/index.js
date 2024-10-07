import useSWR from 'swr';
import { useEffect, useState } from "react"
import { cadastrarManutencao, downloadFileManutencao, fetchManutencao, uploadFileManutencao } from "./api/apiManutencao";
import { CurrencyInput } from "react-currency-mask";
import Modal from ".."
import TableManutencao from "./TableManutencao"
import Paginacao from "../../Paginacao"
import ModalSucess from "../ModalSucess";
import MediumLoading from "../../LoadingAnimation/MediumLoading"
import UploadDowload from "../../PageComponents/PageCadastroUploadDownload";
import ModalLoading from "../ModalLoading";
import HeaderModal from "../../PageComponents/HeaderModalVincular";
import { Link } from 'react-router-dom';

// Função para carregar todas as páginas de manutencao vinculados ao EPI ou Periferico
const fetchAllPages = async () => {
    const allData = [];
    let currentPage = 0;
    let totalPages = 0;
    const tamanhoPagina = 10; // Definir tamanho de página conforme necessário

    do {
        const result = await fetchManutencao(currentPage, tamanhoPagina);
        allData.push(...result.lista); // Adiciona a lista de usuários à coleção completa
        currentPage += 1;
        totalPages = result.totalPaginas; // Atualiza o número total de páginas
    } while (currentPage < totalPages);

    return allData;
};

const ModalManutencao = ({ onClose, objEpiPeriferico, isEpi }) => {

    const manutencao = {
        descricao: "",
        valor: "",
        dataIniManutencao: "",
        dataRetManutencao: "",
        fileName: '',
        idEpi: {
            id: ""
        },
        idPeriferico: {
            id: ""
        }
    };

    const [objManutencao, setObjManutencao] = useState(manutencao);
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [selectedFile, setSelectedFile] = useState(null); // Para armazenar o arquivo selecionado
    const [paginaAtual, setPaginaAtual] = useState(0);

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

    // Usando SWR para buscar todos os usuários vinculados ao EPI
    const { data: allManutencoes, error, isLoading, mutate } = useSWR('fetchAllPages', fetchAllPages, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    if (error) {
        console.error('Erro ao carregar manutencoes:', error);
        return <></>;
    }

    if (isLoading || !allManutencoes) {
        return <ModalLoading />;
    }

    // Filtrar manutencoes vinculadas a EPI e Periferico
    const manutencoesFiltradas = allManutencoes.filter((item) =>
        (isEpi === "epi" && item.idEpi?.id === objEpiPeriferico.id) ||
        (isEpi !== "epi" && item.idPeriferico?.id === objEpiPeriferico.id)
    );

    // Filtrar manutencoes vinculados e dividir em páginas
    const startIndex = paginaAtual * 10; // Posição inicial baseada na página atual
    const endIndex = startIndex + 10; // Posição final para os 10 itens da página atual

    // Pegando apenas os usuários filtrados para a página atual
    const manutencoesFiltradasPorPagina = manutencoesFiltradas.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    // cadastrar manutencao
    const cadastrar = async () => {
        if (!objManutencao.descricao) {
            alert('Por favor, preencha o campo obrigatório: Descrição!');
            return;
        }

        // Se enviar o obj com o idEpi e idPeriferico tera erro 500 no backend entao é removido um antes do post
        // Clonar o objeto para evitar modificar o estado diretamente
        const objEnvio = { ...objManutencao };

        // Remover idPeriferico se for EPI e idEpi se for Periférico
        if (isEpi === "epi") {
            delete objEnvio.idPeriferico;
        } else {
            delete objEnvio.idEpi;
        }

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
                    mutate();
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Manutencao:', error);
            alert('Ocorreu um erro ao tentar cadastrar Manutencao!');
        }
    };

    // Função para lidar com a seleção da manutenção
    const handleSelectManutencao = (manutencaoSelecionada) => {
        // Atualizando o objeto objManutencao com todos os dados relevantes
        setObjManutencao({
            ...manutencaoSelecionada,
            id: manutencaoSelecionada.id || '',
            descricao: manutencaoSelecionada.descricao || '',
            valor: manutencaoSelecionada.valor || '',
            dataIniManutencao: manutencaoSelecionada.dataIniManutencao || '',
            dataRetManutencao: manutencaoSelecionada.dataRetManutencao || '',
            fileName: manutencaoSelecionada.fileName || '',
            idEpi: manutencaoSelecionada.idEpi ? manutencaoSelecionada.idEpi : { id: "" },
            idPeriferico: manutencaoSelecionada.idPeriferico ? manutencaoSelecionada.idPeriferico : { id: "" }
        });
    };

    // Função para lidar com o upload do arquivo
    const handleFileUpload = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                await uploadFileManutencao(objManutencao.id, formData); // Chama a função de upload
                alert('Arquivo carregado com sucesso!');
            } catch (error) {
                console.error('Erro ao fazer upload:', error);
                alert('Ocorreu um erro ao tentar fazer upload do arquivo.');
            }

            onClose();
        }
    };

    // Função para lidar com o download do arquivo
    const handleFileDownload = async () => {
        try {
            await downloadFileManutencao(objManutencao.id); // Chama a função de download
        } catch (error) {
            console.error('Erro ao fazer download:', error);
            alert('Ocorreu um erro ao tentar baixar o arquivo.');
        }
    };

    const aoDigitar = (e) => {
        setObjManutencao({ ...objManutencao, [e.target.name]: e.target.value });
    }

    const aoDigitarValor = (name) => {
        // Tente converter o valor para número
        const numericValue = Number(name);

        // Verifique se a conversão foi bem-sucedida
        if (!isNaN(numericValue)) {
            setObjManutencao({ ...objManutencao, valor: numericValue });
        } else {
            console.error("O valor não é um número:", name);
        }
    };

    return (
        <Modal>
        <HeaderModal
                title={"REGISTRO DE MANUTENÇÃO"}
                onClose={onClose} />

            <div className="dialog-content">
                <form>

                    <input
                        value={isEpi === "epi" ? objManutencao.idEpi.id : objManutencao.idPeriferico.id}
                        name={isEpi === "epi" ? 'idEpi.id' : 'idPeriferico.id'}
                        onChange={aoDigitar}
                        className="input"
                        type="text"
                        placeholder={isEpi === "epi" ? "Id EPI" : "Id Periférico"}
                        hidden
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
                        <CurrencyInput
                            value={objManutencao.valor}
                            name="valor"
                            onChange={aoDigitar}
                            onChangeValue={(value, name, values) => {
                                aoDigitarValor(name);
                            }}
                            className="input"
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

                    {/* Funcionalidades para o envio de arquivos e dowloads*/}
                    {objManutencao.id > 0 && ( // Condição para renderizar o UploadDownload somente quando o id for maior que 0
                        <UploadDowload
                            handleFileDownload={handleFileDownload}
                            handleFileUpload={handleFileUpload}
                            obj={{ fileName: objManutencao.fileName }}
                            setSelectedFile={setSelectedFile}
                        />
                    )}

                    <div className="container-buttons">
                        <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                    </div>
                </form>

                {isLoading || manutencoesFiltradas.length === 0 ? (
                    <div className="modal-table">
                        <MediumLoading />
                    </div>
                ) : (
                    <div className="modal-table">
                        <TableManutencao
                            vetor={manutencoesFiltradasPorPagina}
                            onSelect={handleSelectManutencao}
                        />
                        <Paginacao
                            paginaAtual={paginaAtual}
                            totalPaginas={Math.ceil(manutencoesFiltradas.length / 10)}
                            totalRegistros={manutencoesFiltradas.length}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
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