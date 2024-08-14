import MenuBar from "../../../componentes/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { alterarUser, cadastrarUsers, excluirUser, fetchUsersById } from "../api/apiUser";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
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

    const [objUser, setObjUser] = useState(user);// Funcao para o cadastro de Usuarios

    const cadastrarOuAlterar = async () => {
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
            console.error('Erro ao cadastrar/alterar Usuario:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Usuario.');
        }
    };

    const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este Usuario?');
        if (confirmDelete) {
            try {
                await excluirUser(id);
                alert('Usuario excluído com sucesso!');
                navigate('/usuarios'); // Redireciona para a lista de Usuarios
            } catch (error) {
                console.error('Erro ao excluir Usuario:', error);
                alert('Ocorreu um erro ao tentar excluir este Usuario.');
            }
        }
    };

    useEffect(() => {
        if (id) {
            const fetchUsers = async () => {
                const userData = await fetchUsersById(id); // Fetch Epi data by ID
                setObjUser(userData);
            };
            fetchUsers();
        }
    }, [id]);

    const aoDigitar = (e) => {
        setObjUser({ ...objUser, [e.target.name]: e.target.value });
    }

    return (
        <section>
            <MenuBar />
            <div className="content-page">

                <CadastroHeader
                    id={id}
                    title="Cadastro de Usuário"
                    titleEditar="Editar Usuário"
                    hiddenPeriferico={true}
                    hiddenManutencao={true}
                />

                <form>
                    <label className="label"> Nome:
                        <input
                            value={objUser.nome}
                            onChange={aoDigitar}
                            name='nome'
                            className="input"
                            type="text"
                            placeholder="Nome" />
                    </label>

                    <label className="label"> Contato:
                        <input
                            value={objUser.telContato}
                            onChange={aoDigitar}
                            name='telContato'
                            className="input"
                            type="text"
                            placeholder="Contato" />
                    </label>

                    <label className="label"> Email:
                        <input
                            value={objUser.email}
                            onChange={aoDigitar}
                            name='email'
                            className="input"
                            type="text"
                            placeholder="Email" />
                    </label>

                    <Buttons
                        id={id}
                        cadastrarOuAlterar={cadastrarOuAlterar}
                        excluir={excluir}
                    />
                </form>
            </div>

            {sucessAnimation && (
                <ModalSucess title="Usuário Cadastrado!" />
            )}
        </section>
    )
}

export default CadastrarUsers;