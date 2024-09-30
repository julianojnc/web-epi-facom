import { useEffect, useState } from "react";
import ModalSucess from "../../../Modal/ModalSucess";
import { alterarEpiUsuario, fetchUsers } from "../../../../Pages/PageUsers/api/apiUser";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import iconUser from "../../../../assets/icon-user-black.png"

const InputPrincipalUsuario = ({ aoDigitar, onClose, objUser, setObjUsuario, objEpi, objEpiUsuarios, vincular, cadastrar }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [filtroUsuarios, setFiltroUsuarios] = useState([]); // Lista filtrada de usuarios
    const [pesquisa, setPesquisa] = useState(""); // Estado para a pesquisa
    const [pagina, setPagina] = useState(0); // Controle de página para paginação
    const [showDropdown, setShowDropdown] = useState(false); // DropDown pesquisa
    const itensPorPagina = 10;
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        // Função para buscar todos os periféricos ao montar o componente
        const buscarUsuarios = async () => {
            try {
                const data = await fetchUsers(0, 9999); // Buscando até 1000 periféricos, ajuste conforme necessário
                setUsuarios(data.lista); // Armazenando a lista completa de periféricos
                setFiltroUsuarios(data.lista.slice(0, itensPorPagina)); // Exibindo apenas os 10 primeiros inicialmente
            } catch (error) {
                console.error("Erro ao buscar usuarios:", error);
            }
        };

        buscarUsuarios();
    }, []);

    useEffect(() => {
        // Atualiza a lista filtrada quando a pesquisa mudar
        const listaFiltrada = usuarios.filter((usuario) => {
            const nomeFiltrado = (usuario.nome ?? '').toLowerCase().includes(pesquisa.toLowerCase());
            const emailFiltrado = (usuario.email ?? '').toLowerCase().includes(pesquisa.toLowerCase());
            const telContatoFiltrado = (usuario.telContato ?? '').toLowerCase().includes(pesquisa.toLowerCase());

            // Retorna verdadeiro se algum dos campos corresponder ao termo de pesquisa
            return nomeFiltrado || emailFiltrado || telContatoFiltrado;
        });

        // Paginação simples
        const inicio = pagina * itensPorPagina;
        const fim = inicio + itensPorPagina;

        // Atualiza a lista com os itens paginados
        setFiltroUsuarios(listaFiltrada.slice(inicio, fim));
    }, [pesquisa, pagina, usuarios, itensPorPagina]);

    const handlePesquisa = (e) => {
        setPesquisa(e.target.value); // Atualiza o estado de pesquisa
        setPagina(0); // Reseta para a primeira página ao pesquisar
    };

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