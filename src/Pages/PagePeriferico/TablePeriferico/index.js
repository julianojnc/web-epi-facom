import { useNavigate } from "react-router-dom";

const TablePeriferico = ({ vetor }) => {

    const navigate = useNavigate();

    const handleClick = (periferico) => {
        navigate(`/cadastro-perifericos/${periferico.id}`);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMÔNIO</th>
                    <th>DATA COMPRA</th>
                    <th>DATA GARANTIA</th>
                </tr>
            </thead>

            <tbody>
                {vetor.map(obj => (
                    <tr key={obj.id} onClick={() => handleClick(obj)}>
                        <td>{obj.id}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.patrimonio}</td>
                        <td>{obj.dataCompra}</td>
                        <td>{obj.dataGarantia}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TablePeriferico;
