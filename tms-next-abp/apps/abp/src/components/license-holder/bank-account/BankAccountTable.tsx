import Table from '../../shared/Table';

export default function BankAccountTable(props) {
    const {
        loading,
        accounts,
        handleDelete,
        setItem,
        handleEdit,
        hideEdit = false,
        handleAddition
    } = props;

    const cells = [
        'aliasCuenta',
        'banco',
        'numeroDeCuenta',
        'clabe',
        'numeroDeTarjeta',
        'tipoCuentaBancaria'
    ];
    const customCells = ['preDeterminada'];

    const headers = [
        'alias',
        'banco',
        'numero de cuenta',
        'clabe',
        'numero de tarjeta',
        'tipo de cuenta bancaria',
        'predeterminada'
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
            rows={accounts}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            hideEdit={hideEdit}
            size="small"
        />
    );
}
