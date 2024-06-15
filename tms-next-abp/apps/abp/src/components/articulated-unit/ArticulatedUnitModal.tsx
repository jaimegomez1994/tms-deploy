import { useEffect, useState } from 'react';
import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import ArticulatedUnitForm from './ArticulatedUnitForm';
import TractorTruckModal from './tractor-truck/TractorTrucksModal';
import TractorTruckTable from '../tractor-trucks/TractorTruckTable';
import TrailerSection from './trailer/TrailerSection';
import AccessorySection from './accessory/AccessorySection';

export default function ArticulatedUnitModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        setArticulatedUnit,
        articulatedUnit,
        handleSave,
        error,
        isUpdate,
        tractorTrucks,
        tractorTruck,
        setTractorTruck,
        searchBy,
        setSearchBy
    } = props;

    const [loading, setLoading] = useState(false);

    const [isTractorTrucksModalOpen, setIsTractorTrucksModalOpen] =
        useState(false);

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    const enableAddition =
        articulatedUnit?.alias &&
        articulatedUnit?.tipoUnidadArticulada &&
        articulatedUnit?.descripcion &&
        (articulatedUnit?.numeroEconomico ||
            articulatedUnit?.numeroEconomicoTractocamion);

    useEffect(() => {
        if (isModalOpen && articulatedUnit?.numeroEconomico) {
            const tractor = tractorTrucks.filter(
                (tractor) =>
                    tractor.numeroEconomico === articulatedUnit?.numeroEconomico
            );
            setTractorTruck(tractor);
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (articulatedUnit?.numeroEconomicoTractocamion) {
            const tractor = tractorTrucks.filter(
                (tractor) =>
                    tractor.numeroEconomico ===
                    articulatedUnit?.numeroEconomicoTractocamion
            );
            setTractorTruck(tractor);
        }
    }, [articulatedUnit]);

    return (
        <Modal
            title="Unidad Articulada"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="max-h-[75vh] overflow-auto">
                <ArticulatedUnitForm
                    articulatedUnit={articulatedUnit}
                    setArticulatedUnit={setArticulatedUnit}
                />
                <div className="overflow-auto pt-5">
                    <span>Tractocamion:</span>
                    <div className="flex">
                        <TractorTruckTable
                            loading={loading}
                            tractorTrucks={tractorTruck}
                            handleDelete={() => {
                                setArticulatedUnit((prev) => ({
                                    ...prev,
                                    numeroEconomicoTractocamion: ''
                                }));
                                setTractorTruck([]);
                            }}
                            handleEdit={() => {
                                console.log('edit');
                            }}
                        />
                        <button
                            className={`${
                                articulatedUnit?.numeroEconomicoTractocamion &&
                                tractorTruck?.length > 0
                                    ? 'bg-neutral-300'
                                    : 'bg-sky-500'
                            } text-white py-3 px-6 rounded ml-8 max-h-[50px]`}
                            onClick={() => setIsTractorTrucksModalOpen(true)}
                            disabled={
                                articulatedUnit?.numeroEconomicoTractocamion &&
                                tractorTruck?.length > 0
                            }
                        >
                            Agregar
                        </button>
                    </div>
                </div>
                {articulatedUnit?.id && (
                    <>
                        <div className="overflow-auto pt-2">
                            <span>Remolques:</span>
                            <TrailerSection
                                articulatedUnitID={articulatedUnit?.id}
                            />
                        </div>
                        <div className="overflow-auto pt-2">
                            <span>Accesorios:</span>
                            <AccessorySection
                                articulatedUnitID={articulatedUnit?.id}
                            />
                        </div>
                    </>
                )}
                <TractorTruckModal
                    isModalOpen={isTractorTrucksModalOpen}
                    loading={loading}
                    tractorTrucks={tractorTrucks}
                    handleAddition={(id) => {
                        setArticulatedUnit((prev) => ({
                            ...prev,
                            numeroEconomicoTractocamion: id
                        }));
                        setIsTractorTrucksModalOpen(false);
                    }}
                    handleCloseModal={() => {
                        setIsTractorTrucksModalOpen(false);
                        setSearchBy('');
                    }}
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                />
                {error && <ErrorDisplay message={error} />}
                <span className="flex w-[100%] pt-2 border-b"></span>
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleCloseModal}
                        className="bg-neutral-300 text-white py-3 rounded px-6"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={() => {
                            handleSave();
                        }}
                        disabled={!enableAddition}
                        className={`${
                            enableAddition ? 'bg-sky-500' : 'bg-neutral-300'
                        } text-white py-3 px-6 rounded ml-8`}
                    >
                        {label}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
