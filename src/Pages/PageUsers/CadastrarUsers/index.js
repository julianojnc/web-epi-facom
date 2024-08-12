import MenuBar from "../../../componentes/MenuBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cadastrarUsers, fetchUsersById } from "../api/apiUser";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";

const CadastrarUsers = () => {
    const { id } = useParams(); // Obtenha o ID da URL
    const [sucessAnimation, setSucessAnimation] = useState(false);

    const user = {
        nome: '',
        email: '',
        telContato: ''
    };

    const [users, setUsers] = useState([]);
    const [objUser, setObjUser] = useState(user);// Funcao para o cadastro de Usuarios

    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objUser);
        try {
            const response = await cadastrarUsers(objUser);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setUsers([...users, response]);
                setSucessAnimation(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Usuario:', error);
            alert('Ocorreu um erro ao tentar cadastrar Usuario. Confira se não há duplicidade!');
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
                        cadastrar={cadastrar}
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