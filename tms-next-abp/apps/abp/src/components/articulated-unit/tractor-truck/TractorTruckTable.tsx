import Table from '../../shared/Table';

export default function TractorTruckTable(props) {
    const { loading, tractorTruck, handleEdit, handleDelete, setItem } = props;

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

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={tractorTruck}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="small"
            hideEdit={true}
        />
    );
}
