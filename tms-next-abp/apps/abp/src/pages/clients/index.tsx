'use client';
import { useEffect, useState } from 'react';
import {
    ClientService,
    CountryService,
    StateService
} from '@tms_next_abp/proxy';
import ClientModal from '../../components/client/ClientModal';
import ClientTable from '../../components/client/ClientTable';
import ClientPagination from '../../components/client/ClientPagination';
import ClientSearch from '../../components/client/ClientSearch';

export default function Clientes() {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchByName, setSearchByName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);

    const ITEMS_PER_PAGE = 10;

    const firstIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;

    const lastIndex = () => {
        const last = (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;
        if (last > totalItems) {
            return totalItems;
        } else {
            return last;
        }
    };

    const filteredClients = clients
        .filter((client) => {
            if (searchByName) {
                if (
                    client.nombre
                        .toUpperCase()
                        .includes(searchByName.toUpperCase())
                ) {
                    return client;
                }
            } else {
                return client;
            }
        })
        .slice(firstIndex - 1, lastIndex());

    function buildClientBody(client) {
        const {
            nombre,
            rfc,
            tipoEntidadLegal,
            calle,
            numeroExterior,
            numeroInterior,
            colonia,
            codigoPostal,
            ciudad,
            estado,
            pais
        } = client;

        return {
            nombre: nombre,
            rfc: rfc,
            tipoEntidadLegal: tipoEntidadLegal,
            calle: calle,
            numeroExterior: numeroExterior,
            numeroInterior: numeroInterior,
            colonia: colonia,
            codigoPostal: codigoPostal,
            ciudad: ciudad,
            estado: estado,
            pais: pais
        };
    }

    function addClient(client) {
        ClientService.addClient(buildClientBody(client))
            .then(() => {
                getClientData();
                setIsModalOpen(false);
                setClient({});
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    function updateClient(client) {
        ClientService.updateClient(client.id, buildClientBody(client))
            .then(() => {
                getClientData();
                setIsModalOpen(false);
                setClient({});
                setError('');
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    function deleteClient(id) {
        ClientService.deleteClient(id).then(() => {
            getClientData();
        });
    }

    function getClientData() {
        setLoading(true);
        ClientService.clientGetList()
            .then((data) => {
                setClients(data?.items);
                setTotalItems(data?.totalCount);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function getCountries() {
        CountryService.countryGetList().then((data) =>
            setCountries(data?.items)
        );
    }

    function getStateData() {
        const data = StateService.statesGetList().then((data) =>
            setStates(data?.items)
        );
    }

    useEffect(() => {
        getClientData();
        getCountries();
        getStateData();
    }, []);

    return (
        <>
            <ClientSearch
                searchByName={searchByName}
                setSearchByName={setSearchByName}
            />

            <ClientTable
                loading={loading}
                clients={filteredClients}
                deleteClient={deleteClient}
                setIsModalOpen={setIsModalOpen}
                setClient={setClient}
                setIsUpdate={setIsUpdate}
            />
            <ClientPagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                onPreviousPage={() => {
                    if (currentPage > 1) {
                        setCurrentPage((prev) => prev - 1);
                    }
                }}
                onNextPage={() => {
                    if (currentPage < totalItems / ITEMS_PER_PAGE)
                        setCurrentPage((prev) => prev + 1);
                }}
                firstIndex={firstIndex}
                lastIndex={lastIndex()}
            />

            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-sky-500 text-white p-3 rounded"
            >
                Agregar Cliente
            </button>

            <ClientModal
                isModalOpen={isModalOpen}
                onCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                }}
                handleSave={(client) => {
                    if (isUpdate) {
                        updateClient(client);
                    } else {
                        addClient(client);
                    }
                }}
                error={error}
                client={client}
                setClient={setClient}
                setError={setError}
                states={states}
                countries={countries}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
            ></ClientModal>
        </>
    );
}
