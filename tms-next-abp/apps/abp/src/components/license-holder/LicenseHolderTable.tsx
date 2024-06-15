import Table from '../shared/Table';

export default function LicenseHolderTable(props) {
    const { loading, licenseHolders, handleDelete, setItem, handleEdit } =
        props;

    const cells = [
        'nombre',
        'rfc',
        'tipoEntidadLegal',
        'domFiscalCalle',
        'domFiscalNumeroExterior',
        'domFiscalNumeroInterior',
        'domFiscalColonia',
        'domFiscalCodigoPostal',
        'domFiscalCiudad',
        'domFiscalEstado',
        'domFiscalPais'
    ];

    const headers = [
        'Nombre',
        'RFC',
        'Tipo de Entidad Legal',
        'Calle',
        'Numero Exterior',
        'Numero Interior',
        'Colonia',
        'Codigo Postal',
        'Ciudad',
        'Estado',
        'Pais'
    ];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={licenseHolders}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="small"
        />
    );
}
