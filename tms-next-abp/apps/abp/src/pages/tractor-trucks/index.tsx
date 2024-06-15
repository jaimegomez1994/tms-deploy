import { useState, useEffect } from 'react';
import { TractorTruckService } from '@tms_next_abp/proxy';
import AddButton from '../../components/shared/AddButton';
import TractorTruckModal from '../../components/tractor-trucks/TractorTruckModal';
import TractorTruckTable from '../../components/tractor-trucks/TractorTruckTable';
import ErrorDisplay from '../../components/shared/ErrorDisplay';
import { removeTrailingDot } from '../../utils/Format';

export default function TractorTrucks() {
    const [loading, setLoading] = useState(false);
    const [tractorTrucks, setTractorTrucks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [tractorTruck, setTractorTruck] = useState<TractoTruck | undefined>();

    const buildBody = (tractorTruck) => {
        return {
            numeroEconomico: tractorTruck.numeroEconomico,
            marca: tractorTruck.marca,
            modelo: tractorTruck.modelo,
            numeroSerie: tractorTruck.numeroSerie,
            statusUnidad: tractorTruck.statusUnidad,
            numeroMotor: tractorTruck.numeroMotor,
            color: tractorTruck.color,
            potenciaMotorHP: tractorTruck.potenciaMotorHP,
            capacidadCargaKg: removeTrailingDot(tractorTruck.capacidadCargaKg),
            pesoBrutoKg: removeTrailingDot(tractorTruck.pesoBrutoKg),
            consumoCombustibleKmPorLitro: removeTrailingDot(
                tractorTruck.consumoCombustibleKmPorLitro
            ),
            cantidadEjes: tractorTruck.cantidadEjes,
            tipoCombustible: tractorTruck.tipoCombustible,
            transmision: tractorTruck.transmision,
            observaciones: tractorTruck.observaciones
        };
    };

    function getTractorTrucks() {
        setLoading(true);
        TractorTruckService.tractorTrucksGetList()
            .then((data) => {
                setTractorTrucks(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteTractorTruck(id) {
        TractorTruckService.deleteTractorTruck(id)
            .then(() => getTractorTrucks())
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

    function addTractorTruck(tractorTruck) {
        TractorTruckService.addTractorTruck(buildBody(tractorTruck))
            .then(() => {
                getTractorTrucks();
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

    function updateTractorTruck(id, tractorTruck) {
        TractorTruckService.updateTractorTruck(id, buildBody(tractorTruck))
            .then(() => {
                getTractorTrucks();
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
            updateTractorTruck(tractorTruck?.id, tractorTruck);
        } else {
            addTractorTruck(tractorTruck);
        }
    }

    useEffect(() => {
        getTractorTrucks();
    }, []);

    useEffect(() => {
        if (tractorTruck) {
            const id = tractorTrucks?.find(
                (item) =>
                    item?.numeroEconomico === tractorTruck?.numeroEconomico
            )?.id;
            if (id) {
                setTractorTruck((prev) => ({ ...prev, id: id }));
            }
        }
    }, [tractorTrucks]);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <TractorTruckTable
                loading={loading}
                tractorTrucks={tractorTrucks}
                handleDelete={(id) => deleteTractorTruck(id)}
                handleEdit={(tractorTruck) => {
                    setTractorTruck(tractorTruck);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton setIsModalOpen={setIsModalOpen} label="Tracto" />
            </div>

            <TractorTruckModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setTractorTruck(undefined);
                }}
                setTractorTruck={setTractorTruck}
                tractorTruck={tractorTruck}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}
        </>
    );
}
