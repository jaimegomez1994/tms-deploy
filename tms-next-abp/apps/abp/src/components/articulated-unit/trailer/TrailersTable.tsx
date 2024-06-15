// import { formatDate } from '../../../utils/Format';
import Table from './Table';

export default function TrailersTable(props) {
    const { loading, trailers, handleAddition } = props;

    const cells = [
        'numeroEconomico',
        'marca',
        'modelo',
        'numeroSerie',
        'statusUnidad',
        'capacidadCargaKg',
        'longitudMetros',
        'color',
        'numeroEjes',
        'taraKg',
        'funcion',
        'observaciones',
        'tipoRemolque'
    ];

    const headers = [
        'Numero Economico',
        'marca',
        'modelo',
        'Numero de Serie',
        'Estatus de Unidad',
        'Capacidad Carga (Kg)',
        'Longitud (Metros)',
        'Color',
        'Numero Ejes',
        'Tara (Kg)',
        'Funcion',
        'Observaciones',
        'Tipo Remolque'
    ];

    function formattedRows(trailers) {
        return trailers?.map((tractorTruck) => {
            return {
                ...tractorTruck
            };
        });
    }

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={formattedRows(trailers)}
            handleAddition={handleAddition}
            size="xs"
        />
    );
}
