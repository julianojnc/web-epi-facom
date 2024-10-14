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
                    <tr key={obj.id} onClick={() => onSelect(obj)}>
                        <td>{obj.id}</td>
                        <td>{obj.idUsuario?.nome ? obj.idUsuario.nome : 'Nome não disponível'}</td>
                        <td>{obj.idUsuario?.telContato ? obj.idUsuario.telContato : 'TelContato não disponível'}</td>
                        <td>{obj.idUsuario?.email ? obj.idUsuario.email : 'Email não disponível'}</td>
                        <td>
                            {obj.dataFim ? 'NÃO' : 'SIM'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableVincularUsuario;
