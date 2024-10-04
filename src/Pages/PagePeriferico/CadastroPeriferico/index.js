import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { alterarPeriferico, cadastrarPerifericos, downloadFilePeriferico, excluirPeriferico, fetchPerifericoById, uploadFilePeriferico } from "../api/apiPeriferico";
import useSWR from 'swr';
import PageContent from '../../../componentes/PageComponents/PageContent'
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import MarcaCheckbox from "../../../componentes/PageComponents/InputMarcaCheckbox";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalManutencao from "../../../componentes/Modal/ModalManutencao";
import ModalLoading from "../../../componentes/Modal/ModalLoading";
import UploadDowload from "../../../componentes/PageComponents/PageCadastroUploadDownload";

const CadastrarPeriferico = () => {
    const { id } = useParams(); // Obtenha o ID da URL
    const navigate = useNavigate();
    const [sucessAnimation, setSucessAnimation] = useState(false);
    const [manutencaoOpen, setManutencaoOpen] = useState(false);

    const periferico = {
        nome: '',
        patrimonio: '',
        serviceTag: '',
        expressCode: '',
        dataCompra: '',
        dataGarantia: '',
        isVinculado: '',
        fileName: '',
        idMarca: {
            id: '',
        }
    };

    const [objPeriferico, setObjPeriferico] = useState(periferico);// Funcao para o cadastro de Periferico
    const [selectedFile, setSelectedFile] = useState(null); // Para armazenar o arquivo selecionado

    // Função fetcher para o SWR
    const fetcher = async (id) => {
        const perifericoData = await fetchPerifericoById(id);
        return perifericoData;
    };

    // Configuração do SWR para buscar o Periferico pelo ID
    const { data: perifericoData, error, isLoading } = useSWR(id ? [`fetchPerifericoById`, id] : null, () => fetcher(id));

    useEffect(() => {
        if (perifericoData) {
            setObjPeriferico(perifericoData); // Preenche os campos quando o dado é carregado
        }
    }, [perifericoData]);

    if (id > 0) {
        // Carregando dados
        if (isLoading || !perifericoData) {
            return (
                <PageContent>
                    <ModalLoading />
                </PageContent>
            );
        }
    }

    if (error) {
        console.error('Erro ao buscar o Periferico:', error);
        return <div>Ocorreu um erro ao carregar o periferico.</div>;
    }

    const cadastrarOuAlterar = async () => {
        if (!objPeriferico.nome || !objPeriferico.idMarca.id) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome e Marca!');
            return;
        }

        try {
            const response = id ? await alterarPeriferico(id, objPeriferico) : await cadastrarPerifericos(objPeriferico);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true);
                setTimeout(() => {
                    setSucessAnimation(false);
                    if (!id) navigate(`/cadastro-perifericos/${response.id}`); // Redireciona para edição se for novo cadastro
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Periferico:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Periferico.');
        }
    };

    const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este Periferico?');
        if (confirmDelete) {
            try {
                await excluirPeriferico(id);
                alert('Periferico excluído com sucesso!');
                navigate('/perifericos'); // Redireciona para a lista de Perifericos
            } catch (error) {
                console.error('Erro ao excluir Periferico:', error);
                alert('Ocorreu um erro ao tentar excluir o Periferico.');
            }
        }
    };

    // Função para lidar com o upload do arquivo
    const handleFileUpload = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                await uploadFilePeriferico(id, formData); // Chama a função de upload
                alert('Arquivo carregado com sucesso!');
                navigate(`/perifericos`);
            } catch (error) {
                console.error('Erro ao fazer upload:', error);
                alert('Ocorreu um erro ao tentar fazer upload do arquivo.');
            }
        }
    };

    // Função para lidar com o download do arquivo
    const handleFileDownload = async () => {
        try {
            await downloadFilePeriferico(id); // Chama a função de download
        } catch (error) {
            console.error('Erro ao fazer download:', error);
            alert('Ocorreu um erro ao tentar baixar o arquivo.');
        }
    };

    const aoDigitar = (e) => {
        setObjPeriferico({ ...objPeriferico, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        setManutencaoOpen(false);
    };

    return (
        <PageContent>
            <CadastroHeader
                id={id}
                title="Cadastro de Periférico"
                titleEditar="Editar Periférico"
                hiddenUsuario={true}
                hiddenPeriferico={true}
                hiddenManutencao={false}
                setManutencaoOpen={setManutencaoOpen}
            />

            <form>
                <label className="label"> Nome:
                    <input
                        value={objPeriferico.nome}
                        onChange={aoDigitar}
                        name='nome'
                        className="input"
                        type="text"
                        placeholder="Nome"
                    />
                </label>

                <label className="label"> Patrimônio:
                    <input
                        value={objPeriferico.patrimonio}
                        onChange={aoDigitar}
                        name='patrimonio'
                        className="input"
                        type="text"
                        placeholder="Patrimônio"
                    />
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
                        placeholder="Data Compra"
                    />
                </label>

                <label className="label"> Data Garantia:
                    <input
                        value={objPeriferico.dataGarantia}
                        onChange={aoDigitar}
                        name='dataGarantia'
                        className="input"
                        type="date"
                        placeholder="Data Garantia"
                    />
                </label>

                {/* Funcionalidades para o envio de arquivos e dowloads*/}
                {id > 0 && ( // Condição para renderizar o UploadDownload somente quando o id for maior que 0
                    <UploadDowload
                        handleFileDownload={handleFileDownload}
                        handleFileUpload={handleFileUpload}
                        obj={{ fileName: objPeriferico.fileName }}
                        setSelectedFile={setSelectedFile}
                    />
                )}

                <Buttons
                    id={id}
                    cadastrarOuAlterar={cadastrarOuAlterar}
                    excluir={excluir}
                />
            </form>

            {manutencaoOpen && (
                <ModalManutencao
                    objEpiPeriferico={objPeriferico}
                    onClose={closeModal}
                    isEpi="periferico"
                />
            )}
            {sucessAnimation && (
                <ModalSucess
                    id={id}
                    title="Periférico Cadastrado!"
                    titleEditar="Periférico Editado!"
                />
            )}
        </PageContent>
    )
}

export default CadastrarPeriferico;
