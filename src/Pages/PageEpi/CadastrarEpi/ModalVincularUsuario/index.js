import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal";
import { useState } from "react";
import iconClose from "../../../../assets/icon-close.png"
import { cadastrarUsers } from "../../../PageUsers/api/apiUser";
import TableVincularUsuario from "./TableVincularUsuario";

const ModalVincularUsuario = ({ onClose, objEpi }) => {

    const user = {
        nome: '',
        email: '',
        telContato: ''
    };

    const [vincularUsuarioPergunta, setVincularUsuarioPergunta] = useState(true);
    const [vincularUsuario, setVincularUsuario] = useState(false);
    const [users, setUsers] = useState([]);
    const [objUser, setObjUser] = useState(user);// Funcao para o cadastro de Usuarios


    const cadastrarVinculoUsuario = () => {
        setVincularUsuario(true);
        setVincularUsuarioPergunta(false)
    }

    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objUser);
        try {
            const response = await cadastrarUsers(objUser);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setUsers([...users, response]);
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
        <Modal>
            {vincularUsuarioPergunta && (
                <>
                    <h1>Deseja Vincular um Usuário ao Equipamento: {objEpi.patrimonio}?</h1>

                    <div className="buttonsModal">
                        <Link className="buttonModalYes" onClick={() => cadastrarVinculoUsuario()}>Sim</Link>
                        <Link className="buttonModalNo" onClick={() => onClose()}>Não</Link>
                    </div>
                </>
            )}
            {
                vincularUsuario && (
                    <>
                        <div className="dialog-title">
                            <h1>Vincular Usuário</h1>

                            <Link title="Fechar Modal" onClick={() => onClose()}>
                                <span>
                                    <img src={iconClose} alt="icon"></img>
                                </span>
                            </Link>
                        </div>

                        <div className="dialog-content">
                            <form>
                                <label className="label"> Pesquisar Usuario:
                                    <input className="input" type="text" placeholder="Pesquisar Usuários Existentes..." />
                                </label>

                                <input
                                    value={objEpi.id}
                                    onChange={aoDigitar}
                                    name='objEpi.id'
                                    className="input"
                                    type="text"
                                    placeholder="Id Epi"
                                    hidden
                                />

                                <input
                                    value={objUser.id}
                                    onChange={aoDigitar}
                                    name='objUser.id'
                                    className="input"
                                    type="text"
                                    placeholder="Id Usuario"
                                    hidden
                                />

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
                                    <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
                                    <Link to='/cadastro-epi' className="button button-cadastrar">Vincular</Link>
                                </div>
                            </form>

                            <TableVincularUsuario />

                        </div>
                    </>
                )
            }
        </Modal>
    )
}

export default ModalVincularUsuario;