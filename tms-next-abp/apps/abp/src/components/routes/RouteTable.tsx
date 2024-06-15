import Table from '../shared/Table';

export default function RouteTable(props) {
    const { loading, routes, handleDelete, setItem, handleEdit } =
        props;

    const cells = [
        "alias",
        "nombre",
        "origen",
        "destino",
        "distancia",
        "tiempoAproxVacio",
        "tiempoAproxCargado",
        "observaciones"
    ];

    const headers = [
        "Alias",
        "Nombre",
        "Origen",
        "Destino",
        "Distancia",
        "Tiempo Aproximado Vacio",
        "Tiempo Aproximado Cargado",
        "Observaciones"
    ];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={routes}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="small"
        />
    );
}
