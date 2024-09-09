import { Link } from "react-router-dom";
import Modal from "../../../../componentes/Modal";
import { useState } from "react";
import iconClose from "../../../../assets/icon-close.png"
import { cadastrarUsers, vincularEpiUser } from "../../../PageUsers/api/apiUser";
import TableVincularUsuario from "./TableVincularUsuario";
import ModalSucess from "../../../../componentes/Modal/ModalSucess";
import InputMask from 'react-input-mask';


const ModalVincularUsuario = ({ onClose, objEpi }) => {

    const user = {
        nome: '',
        email: '',
        telContato: ''
    };

    const [vincularUsuarioPergunta, setVincularUsuarioPergunta] = useState(true);
    const [vincularUsuario, setVincularUsuario] = useState(false);
    const [users, setUsers] = useState([]);
    const [objUser, setObjUser] = useState(user); // Função para o cadastro de Usuários
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    
    const cadastrarVinculoUsuario = () => {
        setVincularUsuario(true);
        setVincularUsuarioPergunta(false);
    };

    // cadastrar novo usuario
    const cadastrar = async () => {
        if (!objUser.nome) {
            alert('Por favor, preencha o campo obrigatório: Nome!');
            return;
        }
        console.log('Objeto a ser enviado:', objUser);
        try {
            const response = await cadastrarUsers(objUser);
            console.log('Resposta da API:', response);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                // // Atualizar o estado com os dados do usuário cadastrado
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    setObjUser(response); // Preenche os inputs com os dados retornados da API
                    setUsers([...users, response]);
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Usuario:', error);
            alert('Ocorreu um erro ao tentar cadastrar Usuario!');
        }
    };

    // vincular usuario
    const vincular = async () => {
        try {
            const response = await vincularEpiUser(objEpi.id, objUser.id);
            console.log('Resposta da API - Vinculação:', response);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true); // Exibe animação de sucesso
                setTimeout(() => {
                    setSucessAnimation(false);
                    onClose(); // Fecha modal após sucesso
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao vincular EPI com usuario:', error);
            alert('Ocorreu um erro ao tentar vincular o EPI com o usuario.');
        }
    };

    const aoDigitar = (e) => {
        setObjUser({ ...objUser, [e.target.name]: e.target.value });
    };

    return (
        <Modal>
            {vincularUsuarioPergunta && (
                <>
                    <h1>Deseja Vincular um Usuário ao Equipamento: {objEpi.patrimonio}?</h1>

                    <div className="buttonsModal">
                        <Link className="buttonModalYes" onClick={cadastrarVinculoUsuario}>Sim</Link>
                        <Link className="buttonModalNo" onClick={onClose}>Não</Link>
                    </div>
                </>
            )}
            {vincularUsuario && (
                <>
                    <div className="dialog-title">
                        <h1>Vincular Usuário</h1>

                        <Link title="Fechar Modal" onClick={onClose}>
                            <span>
                                <img src={iconClose} alt="icon" />
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
                                value={objUser.id || ''}
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

                            <div className="container-buttons">
                                <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
                                <Link onClick={vincular} className="button button-cadastrar">Vincular</Link>
                            </div>
                        </form>

                        <TableVincularUsuario />
                    </div>

                    {sucessAnimation && (
                        <ModalSucess
                            id={objUser.id}
                            title="Usuário Cadastrado!"
                            titleEditar="Usuário Vinculado!"
                        />
                    )}
                </>
            )}
        </Modal>
    );
};

export default ModalVincularUsuario;
