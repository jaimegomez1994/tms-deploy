import { useState, useEffect } from 'react';
import { ContractService } from '@tms_next_abp/proxy';
import AddButton from '../../components/shared/AddButton';
import ContractModal from '../../components/contracts/ContractModal';
import ContractTable from '../../components/contracts/ContractTable';
import ErrorDisplay from '../../components/shared/ErrorDisplay';
import { removeTrailingDot } from '../../utils/Format';

export default function Contracts() {
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [contractTypes, setContractTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [errorGrid, setErrorGrid] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [contract, setContract] = useState();

    const buildBody = (contract) => {
        return {
            nombre: contract.nombre,
            numeroContrato: contract.numeroContrato,
            montoContrato: contract.montoContrato,
            toneladasContrato: removeTrailingDot(contract.toneladasContrato),
            estadoContrato: contract.estadoContrato,
            tipoContrato: contract.tipoContrato,
            fechaInicio: contract.fechaInicio,
            fechaFinal: contract.fechaFinal,
            observaciones: contract.observaciones
        };
    };

    function getContracts() {
        setLoading(true);
        ContractService.contractsGetList()
            .then((data) => {
                setContracts(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteContract(id) {
        ContractService.deleteContract(id)
            .then(() => getContracts())
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

    function addContract(contract) {
        ContractService.addContract(buildBody(contract))
            .then(() => {
                getContracts();
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

    function updateContract(id, contract) {
        ContractService.updateContract(id, buildBody(contract))
            .then(() => {
                getContracts();
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
            updateContract(contract?.id, contract);
        } else {
            addContract(contract);
        }
    }

    useEffect(() => {
        getContracts();
        // getContractTypes();
    }, []);

    useEffect(() => {
        if (contract) {
            const id = contracts?.find(
                (item) => item?.numeroEconomico === contract?.numeroEconomico
            )?.id;
            if (id) {
                setContract((prev) => ({ ...prev, id: id }));
            }
        }
    }, [contracts]);

    useEffect(() => {
        if (isModalOpen) setErrorGrid('');
    }, [isModalOpen]);

    return (
        <>
            <ContractTable
                loading={loading}
                contracts={contracts}
                handleDelete={(id) => deleteContract(id)}
                handleEdit={(contract) => {
                    setContract(contract);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton setIsModalOpen={setIsModalOpen} label="Contrato" />
            </div>

            <ContractModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setContract(undefined);
                }}
                setContract={setContract}
                contract={contract}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
                contractTypes={contractTypes}
            />

            {errorGrid && <ErrorDisplay message={errorGrid} />}
        </>
    );
}
