const TableVincularPeriferico = ({ vetor }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMÔNIO</th>
                    <th>DATA VINCULAÇÃO</th>
                    <th>VINCULADO</th>
                </tr>
            </thead>

            <tbody>
                {vetor.map((obj) => (
                    <tr key={obj.id}>
                        <td>{obj.id}</td>
                        <td>{obj.idPeriferico.nome}</td>
                        <td>{obj.idPeriferico.patrimonio}</td>
                        <td>{obj.dataVinculacao}</td>
                        <td>{obj.idPeriferico.isVinculado}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableVincularPeriferico;
