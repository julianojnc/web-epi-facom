import { useNavigate } from "react-router-dom";

const TableEpi = ({ vetor }) => {
    const navigate = useNavigate(); // Utilizado para enviar o usuario para outra pagina

    const handleClick = (epi) => { // Quando clicado usuario sera enviado para a pagina cadastro-epi e adicionado o id do mesmo no final da url
        navigate(`/cadastro-epi/${epi.id}`);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMONIO</th>
                    <th>LOCAL</th>
                    <th>SETOR</th>
                    <th>DATA COMPRA</th>
                    <th>DATA GARANTIA</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map((obj) => (
                    <tr key={obj.id} onClick={() => handleClick(obj)}>
                        <td>{obj.id}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.patrimonio}</td>
                        <td>{obj.local}</td>
                        <td>{obj.setor}</td>
                        <td>{obj.dataCompra}</td>
                        <td>{obj.dataGarantia}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableEpi;
