import { useState, useEffect } from 'react';
import {
    ArticulatedUnitService,
    TractorTruckService
} from '@tms_next_abp/proxy';
import AddButton from '../../components/shared/AddButton';
import ArticulatedUnitModal from '../../components/articulated-unit/ArticulatedUnitModal';
import ArticulatedUnitTable from '../../components/articulated-unit/ArticulatedUnitTable';
import ErrorDisplay from '../../components/shared/ErrorDisplay';

export default function ArticulatedUnits() {
    const [loading, setLoading] = useState(false);
    const [articulatedUnits, setArticulatedUnits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [tractorTrucks, setTractorTrucks] = useState([]);
    const [articulatedUnit, setArticulatedUnit] = useState();
    const [tractorTruck, setTractorTruck] = useState([]);
    const [searchBy, setSearchBy] = useState('');

    const buildBody = (articulatedUnit) => {
        return {
            alias: articulatedUnit.alias,
            tipoUnidadArticulada: articulatedUnit.tipoUnidadArticulada,
            descripcion: articulatedUnit.descripcion,
            numeroEconomicoTractocamion:
                articulatedUnit.numeroEconomicoTractocamion ||
                articulatedUnit.numeroEconomico
        };
    };

    const filteredTractorTrucks = tractorTrucks?.filter((tractorTruck) => {
        return JSON.stringify(tractorTruck)
            .toLowerCase()
            .includes(searchBy.toLowerCase());
    });

    function getArticulatedUnits() {
        setLoading(true);
        ArticulatedUnitService.articulatedUnitsGetList()
            .then((data) => {
                setArticulatedUnits(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteArticulatedUnit(id) {
        ArticulatedUnitService.deleteArticulatedUnit(id)
            .then(() => getArticulatedUnits())
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

    function addArticulatedUnit(articulatedUnit) {
        ArticulatedUnitService.addArticulatedUnit(buildBody(articulatedUnit))
            .then((data) => {
                getArticulatedUnits();
                setError('');
                setIsUpdate(true);
                setArticulatedUnit((prev) => ({
                    ...prev,
                    id: data.id
                }));
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

    function updateArticulatedUnit(id, articulatedUnit) {
        ArticulatedUnitService.updateArticulatedUnit(
            id,
            buildBody(articulatedUnit)
        )
            .then(() => {
                getArticulatedUnits();
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
            updateArticulatedUnit(articulatedUnit?.id, articulatedUnit);
        } else {
            addArticulatedUnit(articulatedUnit);
        }
    }

    function getTractorTrucks() {
        TractorTruckService.tractorTrucksGetList()
            .then((data) => {
                setTractorTrucks(data?.items);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getArticulatedUnits();
        getTractorTrucks();
    }, []);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <ArticulatedUnitTable
                loading={loading}
                articulatedUnits={articulatedUnits}
                handleDelete={(id) => deleteArticulatedUnit(id)}
                handleEdit={(articulatedUnit) => {
                    setArticulatedUnit(articulatedUnit);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton
                    setIsModalOpen={setIsModalOpen}
                    label="Unidad Articulada"
                />
            </div>

            <ArticulatedUnitModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setArticulatedUnit(undefined);
                    setTractorTruck(undefined);
                }}
                setArticulatedUnit={setArticulatedUnit}
                articulatedUnit={articulatedUnit}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
                tractorTrucks={filteredTractorTrucks}
                tractorTruck={tractorTruck}
                setTractorTruck={setTractorTruck}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}
        </>
    );
}
