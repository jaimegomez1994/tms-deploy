import { useEffect, useState } from 'react';
import { OperatorAddressService } from '@tms_next_abp/proxy';
import OperatorAddressModal from './OperatorAddressModal';
import OperatorAddressTable from './OperatorAddressTable';
import useCountry from '../../../hooks/use-country/use-country';
import useStates from '../../../hooks/use-state/use-state';

export default function OperatorAddress(props) {
    const { operatorId } = props;

    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState();

    const { countries } = useCountry();

    const { states } = useStates();

    function getAddresses(operatorId) {
        setLoading(true);
        OperatorAddressService.addressesGetList(operatorId)
            .then((data) => {
                setAddresses([data]);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setAddresses([]);
                console.log(error);
            });
    }

    function deleteAddress(operatorId) {
        OperatorAddressService.deleteAddress(operatorId)
            .then(() => getAddresses(operatorId))
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

    const buildBody = (address) => {
        return {
            calle: address.calle,
            numeroExterior: address.numeroExterior,
            numeroInterior: address.numeroInterior,
            colonia: address.colonia,
            codigoPostal: address.codigoPostal,
            ciudad: address.ciudad,
            estado: address.estado,
            pais: address.pais
        };
    };

    function addAddress(address) {
        OperatorAddressService.addAddress(operatorId, buildBody(address))
            .then(() => {
                getAddresses(operatorId);
                setIsModalOpen(false);
                setError('');
                setAddress(undefined);
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

    useEffect(() => {
        if (operatorId) getAddresses(operatorId);
    }, [operatorId]);

    return (
        <div className="pt-2">
            <span className="text-lg font-bold">Domicilio</span>
            <div className="flex justify-between">
                <OperatorAddressTable
                    loading={loading}
                    addresses={addresses}
                    handleDelete={() => deleteAddress(operatorId)}
                    handleEdit={(address) => {
                        setAddress(address);
                        setIsModalOpen(true);
                        setIsUpdate(true);
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

            <OperatorAddressModal
                isUpdate={isUpdate}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                    setAddress(undefined);
                }}
                address={address}
                setAddress={setAddress}
                error={error}
                handleSave={(address) => {
                    addAddress(address);
                }}
                countries={countries}
                states={states}
            />
        </div>
    );
}
