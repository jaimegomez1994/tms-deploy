// import { formatDate } from '../../../utils/Format';
import Table from './Table';

export default function ContractsTable(props) {
    const { loading, contracts, handleAddition } = props;

    const cells = [
        'nombre',
        'numeroContrato',
        'montoContrato',
        'toneladasContrato',
        'estadoContrato',
        'tipoContrato',
        'fechaInicio',
        'fechaFinal',
        'observaciones'
    ];

    const headers = [
        'Nombre',
        'Numero de Contrato',
        'Monto de Contrato',
        'Toneladas Contrato',
        'Estado Contrato',
        'Tipo Contrato',
        'Fecha Inicio',
        'Fecha Final',
        'Observaciones'
    ];

    function formattedRows(contracts) {
        return contracts?.map((contract) => {
            return {
                ...contract
            };
        });
    }

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={formattedRows(contracts)}
            handleAddition={handleAddition}
            size="xs"
        />
    );
}
