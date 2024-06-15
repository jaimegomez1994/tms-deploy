import { useState, useEffect } from 'react';
import { RouteService } from '@tms_next_abp/proxy';
import AddButton from '../../components/shared/AddButton';
import RouteModal from '../../components/routes/RouteModal';
import RouteTable from '../../components/routes/RouteTable';
import ErrorDisplay from '../../components/shared/ErrorDisplay';
import Table from '../../components/shared/Table';

export default function Routes() {
    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [route, setRoute] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();

    const buildBody = (route) => {
        return {
            alias: route.alias,
            nombre: route.nombre,
            origen: route.origen,
            destino: route.destino,
            distancia: route.distancia,
            tiempoAproxVacio: route.tiempoAproxVacio,
            tiempoAproxCargado: route.tiempoAproxCargado,
            observaciones: route.observaciones
        };
    };

    function getRoutes() {
        setLoading(true);
        RouteService.routesGetList()
            .then((data) => {
                setRoutes(data?.items);
                setLoading(false);
            })
            .catch((error) => {console.log(error)});
    }

    function deleteRoute(id) {
        RouteService.deleteRoute(id)
            .then(() => getRoutes())
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                if (!parsedError) {
                    setErrorGrid('Error');
                    return;
                }

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = key && value ? `${key}: '${value}'` : 'Error';

                setErrorGrid(resultError);
            });
    }

    function addRoute(route) {
        RouteService.addRoute(buildBody(route))
            .then(() => {
                getRoutes();
                setError('');
                setIsUpdate(true);
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                if (!parsedError) {
                    setError('Error');
                    return;
                }

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = key && value ? `${key}: '${value}'` : 'Error';

                setError(resultError);
            });
    }

    function updateRoute(id, route) {
        RouteService.updateRoute(id, buildBody(route))
            .then(() => {
                getRoutes();
                setError('');
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                if (!parsedError) {
                    setError('Error');
                    return;
                }

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = key && value ? `${key}: '${value}'` : 'Error';

                setError(resultError);
            });
    }

    function handleSave() {
        if (isUpdate) {
            updateRoute(route?.id, route);
        } else {
            addRoute(route);
        }
    }


    useEffect(() => {
        getRoutes()
    }, []);

    return (
        <>
            <RouteTable
                loading={loading}
                routes={routes}
                handleDelete={(id) => deleteRoute(id)}
                handleEdit={(route) => {
                    setRoute(route);
                    setIsUpdate(true);
                    setIsModalOpen(true)
                }}
            />
            <div className="mt-4">
                <AddButton setIsModalOpen={setIsModalOpen} label="Ruta" />
            </div>

            <RouteModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setRoute(undefined);
                }}
                setRoute={setRoute}
                route={route}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}

        </>
    )
}