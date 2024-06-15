import { useEffect, useState } from 'react';
import { ClientService, ContractService } from '@tms_next_abp/proxy';
import ContractModal from './ContractModal';
import ContractsTable from '../../contracts/ContractTable';

export default function ContractSection(props) {
    const { clientID } = props;

    const [contracts, setContracts] = useState([]);
    const [parentContracts, setParentContracts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchBy, setSearchBy] = useState('');

    const parentFilteredContracts = parentContracts?.filter(
        (parentContract) => {
            return JSON.stringify(parentContract)
                .toLowerCase()
                .includes(searchBy.toLowerCase());
        }
    );

    function getContracts(clientID) {
        setLoading(true);
        ClientService.getContractFromClients(clientID)
            .then((data) => {
                setContracts(data.items);
                setLoading(false);
            })
            .catch((error) => {
                setContracts([]);
                setLoading(false);
                console.log(error);
            });
    }

    function getAllContracts() {
        setLoading(true);
        ContractService.contractsGetList()
            .then((data) => {
                setParentContracts(data?.items);
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

    function addContract(contractID) {
        ClientService.addContractToClients(clientID, contractID)
            .then(() => {
                getContracts(clientID);
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

    function deleteContract(contractID) {
        ClientService.deleteContractFromClients(clientID, contractID)
            .then(() => getContracts(clientID))
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
        if (clientID) getContracts(clientID);
    }, [clientID]);

    useEffect(() => {
        getAllContracts();
    }, []);

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <ContractsTable
                    loading={loading}
                    contracts={contracts}
                    handleDelete={(contractID) => deleteContract(contractID)}
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

            <ContractModal
                isUpdate={isUpdate}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                    setParentContracts(undefined);
                }}
                contracts={parentFilteredContracts}
                error={error}
                handleAddition={(contractID) => {
                    addContract(contractID);
                }}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
            />
        </div>
    );
}
