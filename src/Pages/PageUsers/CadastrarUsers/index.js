import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { alterarUser, cadastrarUsers, excluirUser, fetchUsersById } from "../api/apiUser";
import useSWR from 'swr';
import PageContent from "../../../componentes/PageComponents/PageContent";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalLoading from "../../../componentes/Modal/ModalLoading";
import InputMask from 'react-input-mask';
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";

const CadastrarUsers = () => {
    const { id } = useParams(); // Obtenha o ID da URL
    const navigate = useNavigate();
    const [sucessAnimation, setSucessAnimation] = useState(false);

    const user = {
        nome: '',
        email: '',
        telContato: ''
    };

    const [objUser, setObjUser] = useState(user); // Estado para o cadastro de Usuarios

    // Função fetcher para o SWR
    const fetcher = async (id) => {
        const userData = await fetchUsersById(id);
        return userData;
    };

    // Usando SWR para buscar o usuário por ID
    const { data: userData, error, isLoading } = useSWR(id ? [`fetchUsersById`, id] : null, () => fetcher(id));

    // Preencher os dados do usuário quando carregados
    if (userData && !objUser.nome) {
        setObjUser(userData);
    }

    if (id > 0) {
        // Carregando dados
        if (isLoading || !userData) {
            return (
                <PageContent>
                    <ModalLoading />
                </PageContent>
            );
        }
    }

    // Exibir erro, se houver
    if (error) {
        console.error('Erro ao buscar o Usuário:', error);
        return <div>Ocorreu um erro ao carregar o usuário.</div>;
    }

    const cadastrarOuAlterar = async () => {
        if (!objUser.nome) {
            alert('Por favor, preencha o campo obrigatório: Nome!');
            return;
        }

        try {
            const response = id ? await alterarUser(id, objUser) : await cadastrarUsers(objUser);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true);
                setTimeout(() => {
                    setSucessAnimation(false);
                    if (!id) navigate(`/cadastro-usuarios/${response.id}`); // Redireciona para edição se for novo cadastro
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Usuário:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Usuário.');
        }
    };

    const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este Usuário?');
        if (confirmDelete) {
            try {
                await excluirUser(id);
                alert('Usuário excluído com sucesso!');
                navigate('/usuarios'); // Redireciona para a lista de Usuários
            } catch (error) {
                console.error('Erro ao excluir Usuário:', error);
                alert('Ocorreu um erro ao tentar excluir este Usuário.');
            }
        }
    };

    const aoDigitar = (e) => {
        setObjUser({ ...objUser, [e.target.name]: e.target.value });
    };

    return (
        <PageContent>

            <CadastroHeader
                id={id}
                title="Cadastro de Usuário"
                titleEditar="Editar Usuário"
                hiddenPeriferico={true}
                hiddenManutencao={true}
                hiddenUsuario={true}
            />

            <form>
                <label className="label"> Nome:
                    <input
                        value={objUser.nome}
                        onChange={aoDigitar}
                        name='nome'
                        className="input"
                        type="text"
                        placeholder="Nome"
                    />
                </label>

                <label className="label"> Contato:
                    <InputMask
                        value={objUser.telContato}
                        onChange={aoDigitar}
                        name='telContato'
                        className="input"
                        type="text"
                        placeholder="Contato"
                        mask="(99)99999-9999"
                    />
                </label>

                <label className="label"> Email:
                    <input
                        value={objUser.email}
                        onChange={aoDigitar}
                        name='email'
                        className="input"
                        type="text"
                        placeholder="Email"
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
                    title="Usuário Cadastrado!"
                    titleEditar="Usuário Editado!"
                />
            )}
        </PageContent>
    );
};

export default CadastrarUsers;
