import { useState, useEffect } from 'react';
import { AccessoryUnitService } from '@tms_next_abp/proxy';
import AccessoryUnitModal from '../../components/accessory-unit/AccessoryUnitModal';
import AccessoryUnitTable from '../../components/accessory-unit/AccessoryUnitTable';
import AddButton from '../../components/shared/AddButton';
import ErrorDisplay from '../../components/shared/ErrorDisplay';

export default function AccessoryUnit() {
    const [loading, setLoading] = useState(false);
    const [accessoryUnits, setAccessoryUnits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [accessoryUnit, setAccessoryUnit] = useState();

    const buildBody = (accessoryUnit) => {
        return {
            numeroEconomico: accessoryUnit.numeroEconomico,
            numeroSerie: accessoryUnit.numeroSerie,
            nombre: accessoryUnit.nombre,
            descripcion: accessoryUnit.descripcion
        };
    };

    function getAccessoryUnits() {
        setLoading(true);
        AccessoryUnitService.accessoryUnitsGetList()
            .then((data) => {
                setAccessoryUnits(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteAccessoryUnit(id) {
        AccessoryUnitService.deleteAccessoryUnit(id)
            .then(() => getAccessoryUnits())
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

    function addAccessoryUnit(operator) {
        AccessoryUnitService.addAccessoryUnit(buildBody(operator))
            .then(() => {
                getAccessoryUnits();
                setError('');
                setIsModalOpen(false);
                setAccessoryUnits(undefined);
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

    function updateAccessoryUnit(id, operator) {
        AccessoryUnitService.updateAccessoryUnit(id, buildBody(operator))
            .then(() => {
                getAccessoryUnits();
                setError('');
                setIsModalOpen(false);
                setAccessoryUnits(undefined);
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
            updateAccessoryUnit(accessoryUnit?.id, accessoryUnit);
        } else {
            addAccessoryUnit(accessoryUnit);
        }
    }

    useEffect(() => {
        getAccessoryUnits();
    }, []);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <AccessoryUnitTable
                loading={loading}
                accessoryUnits={accessoryUnits}
                handleDelete={(id) => deleteAccessoryUnit(id)}
                handleEdit={(AccessoryUnit) => {
                    setAccessoryUnit(AccessoryUnit);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton
                    setIsModalOpen={setIsModalOpen}
                    label="Unidad Accesorio"
                />
            </div>

            <AccessoryUnitModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setAccessoryUnit(undefined);
                }}
                setAccessoryUnit={setAccessoryUnit}
                accessoryUnit={accessoryUnit}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}
        </>
    );
}
