import { useState } from "react";
import ModalSucess from "../../../Modal/ModalSucess";
import { alterarEpiUsuario } from "../../../../Pages/PageUsers/api/apiUser";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";

const InputPrincipalUsuario = ({ aoDigitar, onClose, objUser, objEpi, objEpiUsuarios, vincular, cadastrar }) => {

    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [loadingButton, setLoadingButton] = useState(false);

    const alterar = async () => {
        setLoadingButton(true);

        try {
            const response = await alterarEpiUsuario(objEpiUsuarios.id, objEpiUsuarios);
            console.log('Resposta da API:', response);
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
            console.error('Erro ao cadastrar/alterar Usuario:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Usuario.');
        } finally {
            setLoadingButton(false);
        }
    };

    return (
        <div>
            {objUser.id || objEpiUsuarios.idUsuario.id > 0? (
                <></>
            ) : (
                <label className="label"> Pesquisar Usuario:
                    <input className="input" type="text" placeholder="Pesquisar Usuários Existentes..." />
                </label>
            )}

            <input
                value={objEpi.id || objEpiUsuarios.id}
                onChange={aoDigitar}
                name='objEpi.id'
                className="input"
                type="text"
                placeholder="Id Epi"
                hidden
            />

            <input
                value={objUser.id || objEpiUsuarios.idUsuario.id}
                onChange={aoDigitar}
                name='objUser.id'
                className="input"
                type="text"
                placeholder="Id Usuario"
                hidden
            />

            <label className="label"> Nome:
                <input
                    value={objUser.nome || objEpiUsuarios.idUsuario.nome}
                    onChange={aoDigitar}
                    name='nome'
                    className="input"
                    type="text"
                    placeholder="Nome"
                />
            </label>

            <label className="label"> Contato:
                <InputMask
                    value={objUser.telContato || objEpiUsuarios.idUsuario.telContato}
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
                    value={objUser.email || objEpiUsuarios.idUsuario.email}
                    onChange={aoDigitar}
                    name='email'
                    className="input"
                    type="text"
                    placeholder="Email"
                />
            </label>

            <div className="container-buttons">
                <div className="container-buttons">
                    {objEpiUsuarios.id > 0 ? (
                        (objUser.id || objEpiUsuarios.idUsuario.id > 0) ? (
                            <Link onClick={alterar} className="button button-cadastrar" disabled={loadingButton}>
                                {loadingButton ? "Desvinculando..." : "Desvincular"}
                            </Link>
                        ) : null
                    ) : (
                        (objUser.id || objEpiUsuarios.idUsuario.id > 0) ? (
                            <Link onClick={vincular} className="button button-cadastrar" disabled={loadingButton}>
                                {loadingButton ? "Vinculando..." : "Vincular"}
                            </Link>
                        ) : (
                            <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
                        )
                    )}
                </div>
            </div>

            {sucessAnimation && (
                <ModalSucess
                    id={objEpiUsuarios.id}
                    title=""
                    titleEditar="Usuario Desvinculado!"
                />
            )}
        </div>
    )
}

export default InputPrincipalUsuario;