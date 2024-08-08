import { useNavigate } from "react-router-dom";

const TableUsers = ({ vetor }) => {
    const navigate = useNavigate();

    const handleClick = (usuario) => {
        navigate(`/cadastro-usuarios/${usuario.id}`);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>CONTATO</th>
                    <th>EMAIL</th>
                </tr>
            </thead>

            <tbody>
                {vetor.map(obj => (
                    <tr key={obj.id} onClick={() => handleClick(obj)}>
                        <td>{obj.id}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.telContato}</td>
                        <td>{obj.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableUsers;
