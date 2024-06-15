import { useState, useEffect } from 'react';
import { TrailerService, TrailerTypeService } from '@tms_next_abp/proxy';
import AddButton from '../../components/shared/AddButton';
import TrailerModal from '../../components/trailer/TrailerModal';
import TrailerTable from '../../components/trailer/TrailerTable';
import ErrorDisplay from '../../components/shared/ErrorDisplay';
import { removeTrailingDot } from '../../utils/Format';

export default function Trailers() {
    const [loading, setLoading] = useState(false);
    const [trailers, setTrailers] = useState([]);
    const [trailerTypes, setTrailerTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [trailer, setTrailer] = useState<TractoTruck | undefined>();

    const buildBody = (trailer) => {
        return {
            numeroEconomico: trailer.numeroEconomico,
            marca: trailer.marca,
            modelo: trailer.modelo,
            numeroSerie: trailer.numeroSerie,
            statusUnidad: trailer.statusUnidad,
            capacidadCargaKg: removeTrailingDot(trailer.capacidadCargaKg),
            longitudMetros: removeTrailingDot(trailer.longitudMetros),
            color: trailer.color,
            numeroEjes: trailer.numeroEjes,
            taraKg: removeTrailingDot(trailer.taraKg),
            funcion: trailer.funcion,
            observaciones: trailer.observaciones,
            tipoRemolque: trailer.tipoRemolque
        };
    };

    function getTrailers() {
        setLoading(true);
        TrailerService.trailersGetList()
            .then((data) => {
                setTrailers(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function getTrailerTypes() {
        setLoading(true);
        TrailerTypeService.trailerTypesGetList()
            .then((data) => {
                setTrailerTypes(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteTrailer(id) {
        TrailerService.deleteTrailer(id)
            .then(() => getTrailers())
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

    function addTrailer(trailer) {
        TrailerService.addTrailer(buildBody(trailer))
            .then(() => {
                getTrailers();
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

    function updateTrailer(id, trailer) {
        TrailerService.updateTrailer(id, buildBody(trailer))
            .then(() => {
                getTrailers();
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
            updateTrailer(trailer?.id, trailer);
        } else {
            addTrailer(trailer);
        }
    }

    useEffect(() => {
        getTrailers();
        getTrailerTypes();
    }, []);

    useEffect(() => {
        if (trailer) {
            const id = trailers?.find(
                (item) => item?.numeroEconomico === trailer?.numeroEconomico
            )?.id;
            if (id) {
                setTrailer((prev) => ({ ...prev, id: id }));
            }
        }
    }, [trailers]);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <TrailerTable
                loading={loading}
                trailers={trailers}
                handleDelete={(id) => deleteTrailer(id)}
                handleEdit={(trailer) => {
                    setTrailer(trailer);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton setIsModalOpen={setIsModalOpen} label="Remolque" />
            </div>

            <TrailerModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setTrailer(undefined);
                }}
                setTrailer={setTrailer}
                trailer={trailer}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
                trailerTypes={trailerTypes}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}
        </>
    );
}
