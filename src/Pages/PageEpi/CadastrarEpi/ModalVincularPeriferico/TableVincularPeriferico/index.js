const TableVincularPeriferico = ({ vetor, onSelect }) => {
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
                    <tr key={obj.id} onClick={() => onSelect(obj)}>
                        <td>{obj.id}</td>
                        <td>{obj.idPeriferico.nome}</td>
                        <td>{obj.idPeriferico.patrimonio}</td>
                        <td>{obj.dataVinculacao}</td>
                        <td>{obj.idPeriferico.isVinculado === 1 ? 'SIM' : 'NÃO'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableVincularPeriferico;
