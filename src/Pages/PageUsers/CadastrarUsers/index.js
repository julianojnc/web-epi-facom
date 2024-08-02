import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cadastrarUsers } from "../api/apiUser";
import ModalSucess from "../../../componentes/Modal/ModalSucess";

const CadastrarUsers = () => {

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

    const aoDigitar = (e) => {
        setObjUser({ ...objUser, [e.target.name]: e.target.value });
    }

    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Usuários</h1>
                </div>

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

                    <div className="container-buttons">
                        <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar alterar">Alterar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar excluir">Excluir</Link>
                    </div>
                </form>

            </div>

            {sucessAnimation && (
                <ModalSucess />
            )}
        </section>
    )
}

export default CadastrarUsers;