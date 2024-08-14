import MenuBar from "../../../componentes/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { alterarMarca, cadastrarMarcas, excluirMarca, fetchMarcaById } from "../api/apiMarca";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";

const CadastrarMarcas = () => {
    const { id } = useParams(); // Obtenha o ID da URL
    const navigate = useNavigate();
    const [sucessAnimation, setSucessAnimation] = useState(false);

    const marca = {
        nome: ''
    };

    const [objMarca, setObjMarca] = useState(marca);// Funcao para o cadastro de Marca

    const cadastrarOuAlterar = async () => {
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
                alert('Marca excluído com sucesso!');
                navigate('/marcas'); // Redireciona para a lista de Marcas
            } catch (error) {
                console.error('Erro ao excluir Marca:', error);
                alert('Ocorreu um erro ao tentar excluir esta Marca.');
            }
        }
    };

    useEffect(() => {
        if (id) {
            const fetchMarca = async () => {
                const marcaData = await fetchMarcaById(id); // Fetch Epi data by ID
                setObjMarca(marcaData);
            };
            fetchMarca();
        }
    }, [id]);

    const aoDigitar = (e) => {
        setObjMarca({ ...objMarca, [e.target.name]: e.target.value });
    }

    return (
        <section>
            <MenuBar />
            <div className="content-page">
                <CadastroHeader
                    id={id}
                    title="Cadastro de Marca"
                    titleEditar="Editar Marca"
                    hiddenPeriferico={true}
                    hiddenManutencao={true}
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
            </div>

            {sucessAnimation && (
                <ModalSucess title="Marca Cadastrada!" />
            )}
        </section>
    )
}

export default CadastrarMarcas;