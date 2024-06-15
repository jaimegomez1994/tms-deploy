import { useState, useEffect } from 'react';
import { TrailerTypeService } from '@tms_next_abp/proxy';
import TrailerTypeModal from '../../components/trailer-type/TrailerTypeModal';
import TrailerTypeTable from '../../components/trailer-type/TrailerTypeTable';
import AddButton from '../../components/shared/AddButton';
import ErrorDisplay from '../../components/shared/ErrorDisplay';

export default function TrailerType() {
    const [loading, setLoading] = useState(false);
    const [trailerTypes, setTrailerTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [trailerType, setTrailerType] = useState();

    const buildBody = (trailerType) => {
        return {
            nombre: trailerType.nombre,
            descripcion: trailerType.descripcion
        };
    };

    function getTrailerTypes() {
        setLoading(true);
        TrailerTypeService.trailerTypesGetList()
            .then((data) => {
                setTrailerTypes(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteTrailerType(id) {
        TrailerTypeService.deleteTrailerType(id)
            .then(() => getTrailerTypes())
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

    function addTrailerType(operator) {
        TrailerTypeService.addTrailerType(buildBody(operator))
            .then(() => {
                getTrailerTypes();
                setError('');
                setIsModalOpen(false);
                setTrailerType(undefined);
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

    function updateTrailerType(id, operator) {
        TrailerTypeService.updateTrailerType(id, buildBody(operator))
            .then(() => {
                getTrailerTypes();
                setError('');
                setIsModalOpen(false);
                setTrailerType(undefined);
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
            updateTrailerType(trailerType?.id, trailerType);
        } else {
            addTrailerType(trailerType);
        }
    }

    useEffect(() => {
        getTrailerTypes();
    }, []);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <TrailerTypeTable
                loading={loading}
                trailerTypes={trailerTypes}
                handleDelete={(id) => deleteTrailerType(id)}
                handleEdit={(TrailerType) => {
                    setTrailerType(TrailerType);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton
                    setIsModalOpen={setIsModalOpen}
                    label="Tipo de Remolque"
                />
            </div>

            <TrailerTypeModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setTrailerType(undefined);
                }}
                setTrailerType={setTrailerType}
                trailerType={trailerType}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}
        </>
    );
}
