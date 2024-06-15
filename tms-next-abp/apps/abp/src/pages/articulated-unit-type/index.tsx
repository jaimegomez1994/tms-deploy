import { useState, useEffect } from 'react';
import { ArticulatedUnitTypeService } from '@tms_next_abp/proxy';
import ArticulatedUnitTypeModal from '../../components/articulated-unit-type/ArticulatedUnitTypeModal';
import ArticulatedUnitTypeTable from '../../components/articulated-unit-type/ArticulatedUnitTypeTable';
import AddButton from '../../components/shared/AddButton';
import ErrorDisplay from '../../components/shared/ErrorDisplay';
import { removeTrailingDot } from '../../utils/Format';

export default function ArticulatedUnitType() {
    const [loading, setLoading] = useState(false);
    const [articulatedUnitTypes, setArticulatedUnitTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [articulatedUnitType, setArticulatedUnitType] = useState();

    const buildBody = (articulatedUnitType) => {
        return {
            nombre: articulatedUnitType.nombre,
            capacidad: removeTrailingDot(articulatedUnitType.capacidad),
            remolques: articulatedUnitType.remolques,
            descripcion: articulatedUnitType.descripcion
        };
    };

    function getArticulatedUnitTypes() {
        setLoading(true);
        ArticulatedUnitTypeService.articulatedUnitTypesGetList()
            .then((data) => {
                setArticulatedUnitTypes(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteArticulatedUnitType(id) {
        ArticulatedUnitTypeService.deleteArticulatedUnitType(id)
            .then(() => getArticulatedUnitTypes())
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

    function addArticulatedUnitType(operator) {
        ArticulatedUnitTypeService.addArticulatedUnitType(buildBody(operator))
            .then(() => {
                getArticulatedUnitTypes();
                setError('');
                setIsModalOpen(false);
                setArticulatedUnitTypes(undefined);
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

    function updateArticulatedUnitType(id, operator) {
        ArticulatedUnitTypeService.updateArticulatedUnitType(
            id,
            buildBody(operator)
        )
            .then(() => {
                getArticulatedUnitTypes();
                setError('');
                setIsModalOpen(false);
                setArticulatedUnitTypes(undefined);
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
            updateArticulatedUnitType(
                articulatedUnitType?.id,
                articulatedUnitType
            );
        } else {
            addArticulatedUnitType(articulatedUnitType);
        }
    }

    useEffect(() => {
        getArticulatedUnitTypes();
    }, []);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <ArticulatedUnitTypeTable
                loading={loading}
                articulatedUnitTypes={articulatedUnitTypes}
                handleDelete={(id) => deleteArticulatedUnitType(id)}
                handleEdit={(ArticulatedUnitType) => {
                    setArticulatedUnitType(ArticulatedUnitType);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton
                    setIsModalOpen={setIsModalOpen}
                    label="Tipo de Unidad Articulada"
                />
            </div>

            <ArticulatedUnitTypeModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setArticulatedUnitType(undefined);
                }}
                setArticulatedUnitType={setArticulatedUnitType}
                articulatedUnitType={articulatedUnitType}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}
        </>
    );
}
