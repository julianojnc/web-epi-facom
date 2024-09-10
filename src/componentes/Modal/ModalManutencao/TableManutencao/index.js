const TableManutencao = ({ vetor }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DESCRIÇÃO</th>
                    <th>DATA INICIO</th>
                    <th>DATA RETORNO</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map((obj) => (
                    <tr key={obj.id}>
                        <td>{obj.id}</td>
                        <td>{obj.descricao}</td>
                        <td>{obj.dataIniManutencao}</td>
                        <td>{obj.dataRetManutencao}</td>
                        <td>{obj.valor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableManutencao;
