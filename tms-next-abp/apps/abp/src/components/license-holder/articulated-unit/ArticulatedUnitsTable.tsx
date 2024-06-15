// import { formatDate } from '../../../utils/Format';
import Table from './Table';

export default function ArticulatedUnitsTable(props) {
    const { loading, articulatedUnits, handleAddition } = props;

    const cells = [
        'alias',
        'tipoUnidadArticulada',
        'descripcion',
        'numeroEconomico',
        'marca',
        'modelo',
        'numeroSerie',
        'statusUnidad'
    ];

    const headers = [
        'Alias',
        'Tipo de Unidad Articulada',
        'Descripcion',
        'Numero Economico',
        'Marca',
        'Modelo',
        'Numero de Serie',
        'Estatus de Unidad'
    ];

    function formattedRows(articulatedUnits) {
        return articulatedUnits?.map((tractorTruck) => {
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
            rows={formattedRows(articulatedUnits)}
            handleAddition={handleAddition}
            size="xs"
        />
    );
}
