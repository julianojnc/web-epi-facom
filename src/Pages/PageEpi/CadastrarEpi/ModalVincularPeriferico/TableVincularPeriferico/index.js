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
                        <td>{obj.idPeriferico?.nome ? obj.idPeriferico.nome : 'Nome não disponível'}</td>
                        <td>{obj.idPeriferico?.patrimonio ? obj.idPeriferico.patrimonio : 'Patrimônio não disponível'}</td>
                        <td>{obj.dataVinculacao ? obj.dataVinculacao : 'DataVinculacao não disponível'}</td>
                        <td>{(obj.idPeriferico?.isVinculado ? obj.idPeriferico.isVinculado : 'Vinculação não disponível') === 1 ? 'SIM' : 'NÃO'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableVincularPeriferico;
