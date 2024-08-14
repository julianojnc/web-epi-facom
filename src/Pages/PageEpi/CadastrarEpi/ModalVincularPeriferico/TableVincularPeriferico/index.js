const TableVincularPeriferico = () => {
    return (
        <table className="table-manutencao">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DESCRIÇÃO</th>
                    <th>VALOR</th>
                    <th>INCIO</th>
                    <th>RETORNO</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Troca Hd</td>
                    <td>100 reais</td>
                    <td>20/08/2009</td>
                    <td>21/08/2009</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableVincularPeriferico;
