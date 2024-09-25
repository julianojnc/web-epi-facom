import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cadastrarEpi, fetchEpiById, alterarEpi, excluirEpi, uploadFile, downloadFile, uploadFileEpi, downloadFileEpi } from "../api/apiEpi";
import MenuBar from "../../../componentes/MenuBar";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import MarcaCheckbox from "../../../componentes/PageComponents/InputMarcaCheckbox";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";
import ModalManutencao from "../../../componentes/Modal/ModalManutencao";
import ModalVincularPeriferico from "./ModalVincularPeriferico";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalVincularUsuario from "./ModalVincularUsuario";
import UploadDowload from "../../../componentes/PageComponents/PageCadastroUploadDownload";

const CadastrarEpi = () => {
    const { id } = useParams(); // Obtenha o ID da URL assim trazendo o equipamento em específico
    const navigate = useNavigate(); // Utilizado para enviar o usuario para outra pagina
    const [manutencaoOpen, setManutencaoOpen] = useState(false); // Modal Manutenção
    const [perifericoOpen, setPerifericoOpen] = useState(false); // Modal Periférico
    const [usuarioOpen, setUsuarioOpen] = useState(false); // Modal Usuário
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso

    const epi = { // Obj epi
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

    const [objEpi, setObjEpi] = useState(epi); // Armazenando o obj digitado em um hook
    const [selectedFile, setSelectedFile] = useState(null); // Para armazenar o arquivo selecionado

    useEffect(() => { // Fetch para mostrar um Epi específico referente ao ID do mesmo assim preenchendo os campos do formulário
        if (id) { // Se id tiver valor será feita a listagem pelo fetchEpi
            const fetchEpi = async () => {
                const epiData = await fetchEpiById(id); // epiData recebe o id
                setObjEpi(epiData); // setObjEpi com o valor de epiData
            };
            fetchEpi();
        }
    }, [id]);

    const cadastrarOuAlterar = async () => { // Cadastro ou Alterar Epi

        if (!objEpi.nome || !objEpi.patrimonio || !objEpi.idMarca.id) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Patrimônio e Marca!');
            return;
        }

        try {
            const response = id ? await alterarEpi(id, objEpi) : await cadastrarEpi(objEpi); // Se Id conter valor alterarEpi com id em questao e o objEpi, se não cadastrarEpi com o objEpi
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    if (!id) navigate(`/cadastro-epi/${response.id}`); // Redireciona para edição se for novo cadastro
                    setUsuarioOpen(true); // Modal Usuario Ativada
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) { // Tratativa de erro
            console.error('Erro ao cadastrar/alterar Epi:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Epi.');
        }
    };

    const excluir = async () => { // Excluir Epi
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este equipamento?'); // Alerta para a confirmação de exclusão
        if (confirmDelete) { // Se confirmado Excluir excluirEpi do id específico
            try {
                await excluirEpi(id);
                alert('EPI excluído com sucesso!'); // Confirmação de exclusão
                navigate('/epi'); // Redireciona para a lista de epi
            } catch (error) { // Tratativa de erros
                console.error('Erro ao excluir Epi:', error);
                alert('Ocorreu um erro ao tentar excluir o EPI.');
            }
        }
    };

    const aoDigitar = (e) => { // Função que armazena o valor digitado nos campos em setObjEpi
        setObjEpi({ ...objEpi, [e.target.name]: e.target.value });
    };

    const closeModal = () => { // Funcção para fechar a Modal "MUDAR ISSO"
        setManutencaoOpen(false);
        setPerifericoOpen(false);
        setUsuarioOpen(false);
    };

    // Função para lidar com o upload do arquivo
    const handleFileUpload = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                await uploadFileEpi(id, formData); // Chama a função de upload
                alert('Arquivo carregado com sucesso!');
                navigate(`/epi`);
            } catch (error) {
                console.error('Erro ao fazer upload:', error);
                alert('Ocorreu um erro ao tentar fazer upload do arquivo.');
            }
        }
    };

    // Função para lidar com o download do arquivo
    const handleFileDownload = async () => {
        try {
            await downloadFileEpi(id); // Chama a função de download
        } catch (error) {
            console.error('Erro ao fazer download:', error);
            alert('Ocorreu um erro ao tentar baixar o arquivo.');
        }
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page">
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

                    {/* Funcionalidades para o envio de arquivos e dowloads*/}
                    {id > 0 && ( // Condição para renderizar o UploadDownload somente quando o id for maior que 0
                        <UploadDowload
                            handleFileDownload={handleFileDownload}
                            handleFileUpload={handleFileUpload}
                            obj={{ fileName: objEpi.fileName }}
                            setSelectedFile={setSelectedFile}
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
            </div>

            {manutencaoOpen && (
                <ModalManutencao onClose={closeModal} objEpiPeriferico={objEpi} isEpi="epi" />
            )}
            {perifericoOpen && (
                <ModalVincularPeriferico onClose={closeModal} objEpi={objEpi} id={id} />
            )}
            {usuarioOpen && (
                <ModalVincularUsuario onClose={closeModal} objEpi={objEpi} />
            )}
            {sucessAnimation && (
                <ModalSucess
                    id={id}
                    title="Equipamento Cadastrado!"
                    titleEditar="Equipamento Editado!"
                />
            )}
        </section>
    );
};

export default CadastrarEpi;
