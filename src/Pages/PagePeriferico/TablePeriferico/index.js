const TablePeriferico = ({ vetor }) => {
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
                    <tr key={obj.id}>
                        <td>{obj.id}</td>
                        <td>{obj.nome}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TablePeriferico;
