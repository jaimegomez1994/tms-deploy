import Table from '../../shared/Table';

export default function OperatorAddressTable(props) {
    const { loading, addresses, handleDelete, setItem, handleEdit } = props;

    const cells = [
        'calle',
        'numeroExterior',
        'numeroInterior',
        'colonia',
        'codigoPostal',
        'ciudad',
        'estado',
        'pais'
    ];

    const headers = [
        'calle',
        'numero exterior',
        'numero interior',
        'colonia',
        'codigo postal',
        'ciudad',
        'estado',
        'pais'
    ];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={addresses}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="xs"
            hideEdit={true}
        />
    );
}
