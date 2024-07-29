import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";
import iconLink from "../../../assets/icon-link.png"
import iconManutencao from "../../../assets/icon-manutencao.png"
import { useState } from "react";

const CadastrarUsers = () => {

    const user = {
        nome: '',
        email: '',
        telContato: ''
    };

    const [users, setUsers] = useState([]);
    const [objUser, setObjUser] = useState(user);// Funcao para o cadastro de Usuarios

    const cadastrar = () => {
        console.log('Objeto a ser enviado:', objUser); // Adicione esta linha para verificar o objeto

        fetch('http://localhost:4000/api/usuarios', {
            method: 'post',
            body: JSON.stringify(objUser),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => {
                if (!retorno.ok) {
                    throw new Error(`HTTP error! status: ${retorno.status}`);
                }
                return retorno.json();
            })
            .then(retorno_convertido => {
                console.log('Resposta da API:', retorno_convertido); // Adicione esta linha para verificar a resposta

                if (retorno_convertido.mensagem !== undefined) {
                    alert(retorno_convertido.mensagem);
                } else {
                    setUsers([...users, retorno_convertido]);
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar a marca:', error);
                alert('Ocorreu um erro ao tentar cadastrar Usuario.');
            });
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

                    <div className="link-manutencao">
                        <ul>
                            <li>
                                <Link to="/" title='Vincular Periférico'>
                                    <span>
                                        <img src={iconLink} alt="icon"></img>
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <Link to='/' title='Registros de Manutenção'>
                                    <span>
                                        <img src={iconManutencao} alt="icon"></img>
                                    </span>
                                </Link>
                            </li>

                        </ul>
                    </div>
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
        </section>
    )
}

export default CadastrarUsers;