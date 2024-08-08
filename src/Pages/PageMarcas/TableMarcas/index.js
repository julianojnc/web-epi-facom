import { useNavigate } from "react-router-dom";

const TableMarcas = ({ vetor }) => {
    const navigate = useNavigate();

    const handleClick = (marca) => {
        navigate(`/cadastro-marcas/${marca.id}`);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                </tr>
            </thead>

            <tbody>
                {vetor.map(obj => (
                    <tr key={obj.id} onClick={() => handleClick(obj)}>
                        <td>{obj.id}</td>
                        <td>{obj.nome}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableMarcas;
