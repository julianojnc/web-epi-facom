import { useNavigate } from "react-router-dom";

const TableEpiUsuario = ({ vetor }) => {
    const navigate = useNavigate(); // Utilizado para enviar o usuario para outra pagina

    const handleClick = (epi) => { // Quando clicado usuario sera enviado para a pagina cadastro-epi e adicionado o id do mesmo no final da url
        navigate(`/cadastro-epi/${epi.idEpi.id}`);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMONIO</th>
                    <th>LOCAL</th>
                    <th>USUARIO</th>
                    <th>CONTATO</th>
                    <th>EMAIL</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map(obj => (
                    <tr key={obj.id} onClick={() => handleClick(obj)}>
                        <td>{obj.idEpi.id}</td>
                        <td>{obj.idEpi.nome}</td>
                        <td>{obj.idEpi.patrimonio}</td>
                        <td>{obj.idEpi.local}</td>
                        <td>{obj.idUsuario.nome}</td>
                        <td>{obj.idUsuario.telContato}</td>
                        <td>{obj.idUsuario.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableEpiUsuario;
