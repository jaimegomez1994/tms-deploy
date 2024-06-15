import { useState, useEffect } from 'react';
import { LicenseHolderService } from '@tms_next_abp/proxy';
import AddButton from '../../components/shared/AddButton';
import LicenseHolderModal from '../../components/license-holder/LicenseHolderModal';
// import LicenseHolderTable from '../../components/articulated-unit/LicenseHolderTable';
import LicenseHolderTable from '../../components/license-holder/LicenseHolderTable';
import ErrorDisplay from '../../components/shared/ErrorDisplay';
import { validateRFC } from '../../utils/validators';
import { getLegalEntityType } from '../../utils/LegalEntity';

export default function LicenseHolders() {
    const [loading, setLoading] = useState(false);
    const [licenseHolders, setLicenseHolders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [tractorTrucks, setTractorTrucks] = useState([]);
    const [licenseHolder, setLicenseHolder] = useState();
    const [tractorTruck, setTractorTruck] = useState([]);
    const [searchBy, setSearchBy] = useState('');

    const buildBody = (licenseHolder) => {
        const {
            alias,
            nombre,
            rfc,
            tipoEntidadLegal,
            domFiscalCalle,
            domFiscalNumeroExterior,
            domFiscalNumeroInterior,
            domFiscalColonia,
            domFiscalCodigoPostal,
            domFiscalCiudad,
            domFiscalPais,
            domFiscalEstado
        } = licenseHolder;

        return {
            alias: alias,
            nombre: nombre,
            rfc: rfc,
            tipoEntidadLegal: tipoEntidadLegal,
            domFiscalCalle: domFiscalCalle,
            domFiscalNumeroExterior: domFiscalNumeroExterior,
            domFiscalNumeroInterior: domFiscalNumeroInterior,
            domFiscalColonia: domFiscalColonia,
            domFiscalCodigoPostal: domFiscalCodigoPostal,
            domFiscalCiudad: domFiscalCiudad,
            domFiscalEstado: domFiscalEstado,
            domFiscalPais: domFiscalPais
        };
    };

    const filteredTractorTrucks = tractorTrucks?.filter((tractorTruck) => {
        return JSON.stringify(tractorTruck)
            .toLowerCase()
            .includes(searchBy.toLowerCase());
    });

    function getLicenseHolders() {
        setLoading(true);
        LicenseHolderService.licenseHoldersGetList()
            .then((data) => {
                setLicenseHolders(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteLicenseHolder(id) {
        LicenseHolderService.deleteLicenseHolder(id)
            .then(() => getLicenseHolders())
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

    function addLicenseHolder(licenseHolder) {
        LicenseHolderService.addLicenseHolder(buildBody(licenseHolder))
            .then((data) => {
                getLicenseHolders();
                setError('');
                setIsUpdate(true);
                setLicenseHolder((prev) => ({
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

    function updateLicenseHolder(id, licenseHolder) {
        LicenseHolderService.updateLicenseHolder(id, buildBody(licenseHolder))
            .then(() => {
                getLicenseHolders();
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
        const [valid, error] = validateRFC(licenseHolder?.rfc);

        if (!valid) {
            setError(error);
            return;
        }

        licenseHolder.tipoEntidadLegal = getLegalEntityType(licenseHolder.rfc);

        if (isUpdate) {
            updateLicenseHolder(licenseHolder?.id, licenseHolder);
        } else {
            addLicenseHolder(licenseHolder);
        }
    }

    useEffect(() => {
        getLicenseHolders();
    }, []);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <LicenseHolderTable
                loading={loading}
                licenseHolders={licenseHolders}
                handleDelete={(id) => deleteLicenseHolder(id)}
                handleEdit={(licenseHolder) => {
                    setLicenseHolder(licenseHolder);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton
                    setIsModalOpen={setIsModalOpen}
                    label="Permisionario"
                />
            </div>

            <LicenseHolderModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setLicenseHolder(undefined);
                    setTractorTruck(undefined);
                }}
                setLicenseHolder={setLicenseHolder}
                licenseHolder={licenseHolder}
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
