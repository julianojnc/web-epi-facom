import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEpiById, cadastrarEpi, alterarEpi, excluirEpi, uploadFileEpi, downloadFileEpi } from "../api/apiEpi";
import useSWR from 'swr';
import PageContent from "../../../componentes/PageComponents/PageContent"
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import MarcaCheckbox from "../../../componentes/PageComponents/InputMarcaCheckbox";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";
import ModalManutencao from "../../../componentes/Modal/ModalManutencao";
import ModalVincularPeriferico from "./ModalVincularPeriferico";
import ModalVincularUsuario from "./ModalVincularUsuario";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalLoading from "../../../componentes/Modal/ModalLoading";
import UploadDowload from "../../../componentes/PageComponents/PageCadastroUploadDownload";

const CadastrarEpi = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manutencaoOpen, setManutencaoOpen] = useState(false);
    const [perifericoOpen, setPerifericoOpen] = useState(false);
    const [usuarioOpen, setUsuarioOpen] = useState(false);
    const [sucessAnimation, setSucessAnimation] = useState(false);

    const epi = {
        nome: '',
        patrimonio: '',
        serviceTag: '',
        expressCode: '',
        local: '',
        setor: '',
        dataCompra: '',
        dataGarantia: '',
        fileName: '',
        idMarca: {
            id: '',
        }
    };

    const [objEpi, setObjEpi] = useState(epi);
    const [selectedFile, setSelectedFile] = useState(null);

    // Função fetcher para o SWR
    const fetcher = async (id) => {
        const epiData = await fetchEpiById(id);
        return epiData;
    };

    // Configuração do SWR para buscar o EPI pelo ID
    const { data: epiData, error, isLoading } = useSWR(id ? [`fetchEpiById`, id] : null, () => fetcher(id));

    useEffect(() => {
        if (epiData) {
            setObjEpi(epiData); // Preenche os campos quando o dado é carregado
        }
    }, [epiData]);

    if (id > 0) {
        // Carregando dados
        if (isLoading || !epiData) {
            return (
                <PageContent>
                    <ModalLoading />
                </PageContent>
            );
        }
    }

    if (error) {
        console.error('Erro ao buscar o EPI:', error);
        return <div>Ocorreu um erro ao carregar o equipamento.</div>;
    }

    const cadastrarOuAlterar = async () => {
        if (!objEpi.nome || !objEpi.patrimonio || !objEpi.idMarca.id) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Patrimônio e Marca!');
            return;
        }

        try {
            const response = id ? await alterarEpi(id, objEpi) : await cadastrarEpi(objEpi);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true);
                setTimeout(() => {
                    setSucessAnimation(false);
                    if (!id) navigate(`/cadastro-epi/${response.id}`);
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Epi:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Epi.');
        }
    };

    const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este equipamento?');
        if (confirmDelete) {
            try {
                await excluirEpi(id);
                alert('EPI excluído com sucesso!');
                navigate('/epi');
            } catch (error) {
                console.error('Erro ao excluir Epi:', error);
                alert('Ocorreu um erro ao tentar excluir o EPI.');
            }
        }
    };

    const aoDigitar = (e) => {
        setObjEpi({ ...objEpi, [e.target.name]: e.target.value });
    };

    const closeModal = () => {
        setManutencaoOpen(false);
        setPerifericoOpen(false);
        setUsuarioOpen(false);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                await uploadFileEpi(id, formData);
                alert('Arquivo carregado com sucesso!');
                navigate(`/epi`);
            } catch (error) {
                console.error('Erro ao fazer upload:', error);
                alert('Ocorreu um erro ao tentar fazer upload do arquivo.');
            }
        }
    };

    const handleFileDownload = async () => {
        try {
            await downloadFileEpi(id);
        } catch (error) {
            console.error('Erro ao fazer download:', error);
            alert('Ocorreu um erro ao tentar baixar o arquivo.');
        }
    };

    return (
        <PageContent>
            <CadastroHeader
                id={id}
                title="Cadastro de Equipamento"
                titleEditar="Editar Equipamento"
                hiddenUsuario={false}
                hiddenPeriferico={false}
                hiddenManutencao={false}
                setUsuarioOpen={setUsuarioOpen}
                setPerifericoOpen={setPerifericoOpen}
                setManutencaoOpen={setManutencaoOpen}
            />
            <form>
                <label className="label"> Nome:
                    <input
                        value={objEpi.nome}
                        onChange={aoDigitar}
                        name='nome'
                        className="input"
                        type="text"
                        placeholder="Nome"
                    />
                </label>

                <label className="label"> Patrimônio:
                    <input
                        value={objEpi.patrimonio}
                        onChange={aoDigitar}
                        name='patrimonio'
                        className="input"
                        type="text"
                        placeholder="Patrimônio" />
                </label>

                <MarcaCheckbox
                    id={id}
                    obj={objEpi}
                    setObj={setObjEpi}
                    aoDigitar={aoDigitar}
                    isEpi={true}
                />

                <label className="label"> Local:
                    <input
                        value={objEpi.local}
                        onChange={aoDigitar}
                        name='local'
                        className="input"
                        type="text"
                        placeholder="Local" />
                </label>

                <label className="label"> Setor:
                    <input
                        value={objEpi.setor}
                        onChange={aoDigitar}
                        name='setor'
                        className="input"
                        type="text"
                        placeholder="Setor" />
                </label>

                <label className="label"> Data da Compra:
                    <input
                        value={objEpi.dataCompra}
                        onChange={aoDigitar}
                        name='dataCompra'
                        className="input"
                        type="date"
                        placeholder="Data da Compra" />
                </label>

                <label className="label"> Data de Vencimento:
                    <input
                        value={objEpi.dataGarantia}
                        onChange={aoDigitar}
                        name='dataGarantia'
                        className="input"
                        type="date"
                        placeholder="Data de Vencimento da Garantia" />
                </label>

                {id > 0 && (
                    <UploadDowload
                        handleFileDownload={handleFileDownload}
                        handleFileUpload={handleFileUpload}
                        obj={{ fileName: objEpi.fileName, filePath: objEpi.filePath }}
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                    />
                )}

                <Buttons
                    id={id}
                    cadastrarOuAlterar={cadastrarOuAlterar}
                    excluir={excluir}
                    objEpi={objEpi}
                    handleFileUpload={handleFileUpload}
                    handleFileDownload={handleFileDownload}
                />

            </form>


            {manutencaoOpen && (
                <ModalManutencao onClose={closeModal} objEpiPeriferico={objEpi} isEpi="epi" />
            )}
            {perifericoOpen && (
                <ModalVincularPeriferico onClose={closeModal} objEpi={objEpi} id={id} />
            )}
            {usuarioOpen && (
                <ModalVincularUsuario onClose={closeModal} objEpi={objEpi} id={id} />
            )}
            {sucessAnimation && (
                <ModalSucess
                    id={id}
                    title="Equipamento Cadastrado!"
                    titleEditar="Equipamento Editado!"
                />
            )}
        </PageContent>
    );
}

export default CadastrarEpi;
