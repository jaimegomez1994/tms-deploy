import { useEffect, useState } from 'react';
import {
    LicenseHolderService,
    ArticulatedUnitService
} from '@tms_next_abp/proxy';
import ArticulatedUnitModal from './ArticulatedUnitModal';
import ArticulatedUnitsTable from '../../articulated-unit/ArticulatedUnitTable';

export default function ArticulatedUnitSection(props) {
    const { licenseHolderID } = props;

    const [articulatedUnits, setArticulatedUnits] = useState([]);
    const [parentArticulatedUnits, setParentArticulatedUnits] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchBy, setSearchBy] = useState('');

    const parentFilteredArticulatedUnits = parentArticulatedUnits?.filter(
        (parentArticulatedUnit) => {
            return JSON.stringify(parentArticulatedUnit)
                .toLowerCase()
                .includes(searchBy.toLowerCase());
        }
    );

    function getArticulatedUnits(licenseHolderID) {
        setLoading(true);
        LicenseHolderService.getArticulatedUnitFromLicenseHolder(
            licenseHolderID
        )
            .then((data) => {
                setArticulatedUnits(data.items);
                setLoading(false);
            })
            .catch((error) => {
                setArticulatedUnits([]);
                setLoading(false);
                console.log(error);
            });
    }

    function getAllArticulatedUnits() {
        setLoading(true);
        ArticulatedUnitService.articulatedUnitsGetList()
            .then((data) => {
                setParentArticulatedUnits(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function addArticulatedUnit(articulatedUnitID) {
        LicenseHolderService.addArticulatedUnitToLicenseHolder(
            licenseHolderID,
            articulatedUnitID
        )
            .then(() => {
                getArticulatedUnits(licenseHolderID);
                setIsModalOpen(false);
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

    function deleteArticulatedUnit(articulatedUnitID) {
        LicenseHolderService.deleteArticulatedUnitFromLicenseHolder(
            licenseHolderID,
            articulatedUnitID
        )
            .then(() => getArticulatedUnits(licenseHolderID))
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    useEffect(() => {
        if (licenseHolderID) getArticulatedUnits(licenseHolderID);
    }, [licenseHolderID]);

    useEffect(() => {
        getAllArticulatedUnits();
    }, []);

    return (
        <div className="pt-8">
            <span className="text-lg font-bold">Unidad Articulada</span>
            <div className="flex justify-between">
                <ArticulatedUnitsTable
                    loading={loading}
                    articulatedUnits={articulatedUnits}
                    handleDelete={(articulatedUnitID) =>
                        deleteArticulatedUnit(articulatedUnitID)
                    }
                    handleEdit={() => {
                        console.log('log');
                    }}
                    hideEdit={true}
                />
                <div className="pt-4 pr-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sky-500 text-white p-3 rounded"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            <ArticulatedUnitModal
                isUpdate={isUpdate}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                    setParentArticulatedUnits(undefined);
                }}
                articulatedUnits={parentFilteredArticulatedUnits}
                error={error}
                handleAddition={(articulatedUnitID) => {
                    addArticulatedUnit(articulatedUnitID);
                }}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
            />
        </div>
    );
}
