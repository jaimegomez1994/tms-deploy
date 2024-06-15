// import { formatDate } from '../../../utils/Format';
import Table from './Table';

export default function TractorTrucksTable(props) {
    const { loading, tractorTrucks, handleAddition } = props;

    const cells = [
        'numeroEconomico',
        'marca',
        'modelo',
        'numeroSerie',
        'statusUnidad',
        'numeroMotor',
        'color',
        'potenciaMotorHP',
        'capacidadCargaKg',
        'pesoBrutoKg',
        'consumoCombustibleKmPorLitro',
        'cantidadEjes',
        'tipoCombustible',
        'transmision',
        'observaciones'
    ];

    const headers = [
        'Numero Economico',
        'Marca',
        'Modelo',
        'Numero Serie',
        'Estatus Unidad',
        'Numero Motor',
        'Color',
        'Potencia Motor HP',
        'Capacidad Carga Kg',
        'Peso Bruto Kg',
        'Consumo Combustible Km/Litro',
        'Cantidad Ejes',
        'Tipo Combustible',
        'Transmision',
        'Observaciones'
    ];

    function formattedRows(tractorTrucks) {
        return tractorTrucks?.map((tractorTruck) => {
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
            rows={formattedRows(tractorTrucks)}
            handleAddition={handleAddition}
            size="xs"
        />
    );
}
