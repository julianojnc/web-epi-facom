import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { alterarMarca, cadastrarMarcas, excluirMarca, fetchMarcaById } from "../api/apiMarca";
import useSWR from 'swr';
import PageContent from "../../../componentes/PageComponents/PageContent"
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalLoading from "../../../componentes/Modal/ModalLoading";

const CadastrarMarcas = () => {
    const { id } = useParams(); // Obtenha o ID da URL
    const navigate = useNavigate();
    const [sucessAnimation, setSucessAnimation] = useState(false);

    const marca = {
        nome: ''
    };

    const [objMarca, setObjMarca] = useState(marca); // Estado para o cadastro de Marca

    // Função fetcher para o SWR
    const fetcher = async (id) => {
        const marcaData = await fetchMarcaById(id);
        return marcaData;
    };

    // Usando SWR para buscar a marca por ID
    const { data: marcaData, error, isLoading } = useSWR(id ? [`fetchMarcaById`, id] : null, () => fetcher(id));

    // Preencher os dados da marca quando carregados
    if (marcaData && !objMarca.nome) {
        setObjMarca(marcaData);
    }

    if (id > 0) {
        // Carregando dados
        if (isLoading || !marcaData) {
            return (
                <PageContent>
                    <ModalLoading />
                </PageContent>
            );
        }
    }

    // Exibir erro, se houver
    if (error) {
        console.error('Erro ao buscar a Marca:', error);
        return <div>Ocorreu um erro ao carregar a marca.</div>;
    }

    const cadastrarOuAlterar = async () => {
        if (!objMarca.nome) {
            alert('Por favor, preencha o campo obrigatório: Nome!');
            return;
        }

        try {
            const response = id ? await alterarMarca(id, objMarca) : await cadastrarMarcas(objMarca);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true);
                setTimeout(() => {
                    setSucessAnimation(false);
                    if (!id) navigate(`/cadastro-marcas/${response.id}`); // Redireciona para edição se for novo cadastro
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Marca:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Marca.');
        }
    };

    const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta Marca?');
        if (confirmDelete) {
            try {
                await excluirMarca(id);
                alert('Marca excluída com sucesso!');
                navigate('/marcas'); // Redireciona para a lista de Marcas
            } catch (error) {
                console.error('Erro ao excluir Marca:', error);
                alert('Ocorreu um erro ao tentar excluir esta Marca.');
            }
        }
    };

    const aoDigitar = (e) => {
        setObjMarca({ ...objMarca, [e.target.name]: e.target.value });
    };

    return (
        <PageContent>
            <CadastroHeader
                id={id}
                title="Cadastro de Marca"
                titleEditar="Editar Marca"
                hiddenPeriferico={true}
                hiddenManutencao={true}
                hiddenUsuario={true}
            />

            <form>
                <label className="label"> Nome da Marca:
                    <input
                        value={objMarca.nome}
                        onChange={aoDigitar}
                        name='nome'
                        className="input"
                        type="text"
                        placeholder="Nome"
                    />
                </label>

                <Buttons
                    id={id}
                    cadastrarOuAlterar={cadastrarOuAlterar}
                    excluir={excluir}
                />
            </form>

            {sucessAnimation && (
                <ModalSucess
                    id={id}
                    title="Marca Cadastrada!"
                    titleEditar="Marca Editada!"
                />
            )}
        </PageContent>
    );
}

export default CadastrarMarcas;
