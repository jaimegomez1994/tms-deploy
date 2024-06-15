import { useEffect, useState } from 'react';
import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import LicenseHolderForm from './LicenseHolderForm';
import ArticulatedUnitSection from './articulated-unit/ArticulatedUnitSection';
import BankAccountSection from './bank-account/BankAccountSection';
import ContactSection from './contact/ContactSection';

export default function LicenseHolderModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        setLicenseHolder,
        licenseHolder,
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

    const enableAddition = true;
    // const enableAddition =
    //     licenseHolder?.alias &&
    //     licenseHolder?.tipoUnidadArticulada &&
    //     licenseHolder?.descripcion &&
    //     (licenseHolder?.numeroEconomico ||
    //         licenseHolder?.numeroEconomicoTractocamion);

    useEffect(() => {
        if (isModalOpen && licenseHolder?.numeroEconomico) {
            const tractor = tractorTrucks.filter(
                (tractor) =>
                    tractor.numeroEconomico === licenseHolder?.numeroEconomico
            );
            setTractorTruck(tractor);
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (licenseHolder?.numeroEconomicoTractocamion) {
            const tractor = tractorTrucks.filter(
                (tractor) =>
                    tractor.numeroEconomico ===
                    licenseHolder?.numeroEconomicoTractocamion
            );
            setTractorTruck(tractor);
        }
    }, [licenseHolder]);

    return (
        <Modal
            title="Permisionarios"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="max-h-[75vh] overflow-auto">
                <LicenseHolderForm
                    licenseHolder={licenseHolder}
                    setLicenseHolder={setLicenseHolder}
                />
                {licenseHolder?.id && (
                    <>
                        <div className="overflow-auto pt-2">
                            <ArticulatedUnitSection
                                licenseHolderID={licenseHolder?.id}
                            />
                        </div>
                        <div className="overflow-auto pt-2">
                            <BankAccountSection
                                licenseHolderID={licenseHolder?.id}
                            />
                        </div>

                        <div className="overflow-auto pt-2">
                            <ContactSection
                                licenseHolderID={licenseHolder?.id}
                            />
                        </div>
                    </>
                )}
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
