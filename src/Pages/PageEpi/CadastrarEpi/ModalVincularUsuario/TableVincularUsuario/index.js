const TableVincularUsuario = ({ vetor, onSelect }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>CONTATO</th>
                    <th>EMAIL</th>
                    <th>VINCULADO</th>
                </tr>
            </thead>

            <tbody>
                {vetor.map((obj) => (
                    <tr key={obj.id} onClick={() => onSelect(obj.idUsuario)}>
                        <td>{obj.id}</td>
                        <td>{obj.idUsuario.nome}</td>
                        <td>{obj.idUsuario.telContato}</td>
                        <td>{obj.idUsuario.email}</td>
                        <td>{obj.idUsuario.isVinculado === 1 ? 'SIM' : 'NÃO'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableVincularUsuario;
