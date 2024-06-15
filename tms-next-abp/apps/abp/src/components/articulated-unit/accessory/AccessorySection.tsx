import { useEffect, useState } from 'react';
import {
    ArticulatedUnitService,
    AccessoryUnitService
} from '@tms_next_abp/proxy';
import AccessoryModal from './AccessoryModal';
import AccessoriesTable from '../../accessory-unit/AccessoryUnitTable';

export default function AccessorySection(props) {
    const { articulatedUnitID } = props;

    const [accessories, setAccessories] = useState([]);
    const [parentAccessories, setParentAccessories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchBy, setSearchBy] = useState('');

    const parentFilteredAccessories = parentAccessories?.filter(
        (parentAccessory) => {
            return JSON.stringify(parentAccessory)
                .toLowerCase()
                .includes(searchBy.toLowerCase());
        }
    );

    function getAccessories(articulatedUnitID) {
        setLoading(true);
        ArticulatedUnitService.getAccessoryFromArticulatedUnit(
            articulatedUnitID
        )
            .then((data) => {
                setAccessories(data.items);
                setLoading(false);
            })
            .catch((error) => {
                setAccessories([]);
                setLoading(false);
                console.log(error);
            });
    }

    function getAllAccessories() {
        setLoading(true);
        AccessoryUnitService.accessoryUnitsGetList()
            .then((data) => {
                setParentAccessories(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const buildBody = (account) => {
        return {
            aliasCuenta: account.aliasCuenta,
            banco: account.banco,
            numeroDeCuenta: account.numeroDeCuenta,
            clabe: account.clabe,
            numeroDeTarjeta: account.numeroDeTarjeta,
            tipoCuentaBancaria: account.tipoCuentaBancaria,
            preDeterminada:
                account?.preDeterminada === 'True' ? 'False' : 'True'
        };
    };

    function addAccessory(accessoryID) {
        console.log('articulatedUnitID', articulatedUnitID);

        ArticulatedUnitService.addAccessoryToArticulatedUnit(
            articulatedUnitID,
            accessoryID
        )
            .then(() => {
                getAccessories(articulatedUnitID);
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

    function deleteAccessory(accessoryID) {
        ArticulatedUnitService.deleteAccessoryFromArticulatedUnit(
            articulatedUnitID,
            accessoryID
        )
            .then(() => getAccessories(articulatedUnitID))
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
        if (articulatedUnitID) getAccessories(articulatedUnitID);
    }, [articulatedUnitID]);

    useEffect(() => {
        getAllAccessories();
    }, []);

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <AccessoriesTable
                    loading={loading}
                    accessoryUnits={accessories}
                    handleDelete={(accessoryID) => deleteAccessory(accessoryID)}
                    handleEdit={() => {
                        console.log('log');
                    }}
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

            <AccessoryModal
                isUpdate={isUpdate}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                    setParentAccessories(undefined);
                }}
                accessories={parentFilteredAccessories}
                error={error}
                handleAddition={(accessoryID) => {
                    addAccessory(accessoryID);
                }}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
            />
        </div>
    );
}
