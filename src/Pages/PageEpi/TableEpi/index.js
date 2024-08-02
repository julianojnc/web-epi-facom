const TableEpi = ({ vetor }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMONIO</th>
                    <th>LOCAL</th>
                    <th>SETOR</th>
                    <th>DATA COMPRAR</th>
                    <th>DATA GARANTIA</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map(obj => (
                    <tr key={obj.id}>
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
    )
}

export default TableEpi;
