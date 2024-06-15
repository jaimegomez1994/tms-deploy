import Table from '../shared/Table';

export default function TrailerTable(props) {
    const {
        loading,
        trailers,
        handleDelete,
        setItem,
        handleEdit,
        hideEdit = false
    } = props;

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

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={trailers}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="xs"
            hideEdit={hideEdit}
        />
    );
}
