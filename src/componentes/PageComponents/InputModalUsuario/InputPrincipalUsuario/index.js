import { useState } from "react";
import useSWR from 'swr';
import ModalSucess from "../../../Modal/ModalSucess";
import { alterarEpiUsuario, fetchUsers } from "../../../../Pages/PageUsers/api/apiUser";
import InputMask from 'react-input-mask';
import iconUser from "../../../../assets/icon-user-black.png"
import ButtonsVincular from "../../PageCadastroButtonsVincular";

// SWR hook para buscar os periféricos
const fetcher = async () => {
    const response = await fetchUsers(0, 9999); // Limite de itens conforme necessário
    return response.lista;
}

const InputPrincipalUsuario = ({ aoDigitar, onClose, objUser, setObjUsuario, objEpi, objEpiUsuarios, vincular, cadastrar, loadingButton }) => {
    const [pesquisa, setPesquisa] = useState(""); // Estado para a pesquisa
    const [pagina, setPagina] = useState(0); // Controle de página para paginação
    const [showDropdown, setShowDropdown] = useState(false); // DropDown pesquisa
    const itensPorPagina = 10;
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [loadingButtons, setLoadingButtons] = useState(false);

    // Usando o SWR para buscar periféricos, com fetchUsers como fetcher
     const { data: usuarios, error } = useSWR('fetchUsers', fetcher);

     const listaFiltrada = (usuarios || []).filter((usuario) => {
         const nomeFiltrado = (usuario.nome ?? '').toLowerCase().includes(pesquisa.toLowerCase());
         const emailFiltrado = (usuario.patrimonio ?? '').toLowerCase().includes(pesquisa.toLowerCase());
         const telContatoFiltrada = (usuario.serviceTag ?? '').toLowerCase().includes(pesquisa.toLowerCase());
 
         return nomeFiltrado || emailFiltrado || telContatoFiltrada;
     });
 
     const inicio = pagina * itensPorPagina;
     const fim = inicio + itensPorPagina;
     const filtroUsuarios = listaFiltrada.slice(inicio, fim);

    const handlePesquisa = (e) => {
        setPesquisa(e.target.value); // Atualiza o estado de pesquisa
        setPagina(0); // Reseta para a primeira página ao pesquisar
    };

    const alterar = async () => {
        setLoadingButtons(true);
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
            setLoadingButtons(false);
        }
    };

    if (error) return alert("Erro ao carregar os usuários no campo de Pesquisa!");
    console.log(error);

    return (
        <div>
            {objUser.id || objEpiUsuarios.idUsuario.id > 0 ? (
                <></>
            ) : (
                <label className="label"> Pesquisar Usuários:
                    <input
                        className="input"
                        type="text"
                        placeholder="Pesquisar Usuários Existentes..."
                        value={pesquisa}
                        onChange={handlePesquisa}
                        onFocus={() => setShowDropdown(true)}
                    />
                </label>
            )}

            {showDropdown && (
                <ul className="dropdown">
                    {filtroUsuarios.map((usuario) => (
                        <li key={usuario.id} onClick={() => {
                            setObjUsuario(usuario);
                            setShowDropdown(false); // Fechar o dropdown ao selecionar um periférico
                        }}>
                            <span>
                                <img src={iconUser} alt="icon"></img>
                            </span> {usuario.nome}
                        </li>
                    ))}
                </ul>
            )
            }

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

            <ButtonsVincular
                cadastrar={cadastrar}
                vincular={vincular}
                alterar={alterar}
                loadingButtonProp={loadingButtons}
                loadingButton={loadingButton}
                obj={objUser}
                objVinculado={objEpiUsuarios}
                idItem={objEpiUsuarios.idUsuario.id}
            />

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