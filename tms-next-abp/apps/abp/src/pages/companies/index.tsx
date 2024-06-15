import { useEffect, useState } from 'react';
import {
    CompanyService,
    CountryService,
    StateService
} from '@tms_next_abp/proxy';
import CompanyTable from '../../components/company/CompanyTable';
import CompanyModal from '../../components/company/CompanyModal';
import ErrorDisplay from '../../components/shared/ErrorDisplay';

export default function Companies() {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [errorGrid, setErrorGrid] = useState('');
    const [company, setCompany] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    function buildClientBody(company) {
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
        } = company;

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
    }

    function getCompanies() {
        setLoading(true);
        CompanyService.companiesGetList()
            .then((data) => {
                // TODO - update this setCompany to be on a useEffect
                const id = data?.items?.find(
                    (item) => item?.rfc === company?.rfc
                )?.id;
                if (id) {
                    setCompany((prev) => ({ ...prev, id: id }));
                }
                setCompanies(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function updateCompany(company) {
        CompanyService.updateCompany(company.id, buildClientBody(company))
            .then(() => {
                getCompanies();
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

    function addCompany(company) {
        CompanyService.addCompany(buildClientBody(company))
            .then(() => {
                getCompanies();
                setError('');
                setIsUpdate(true);
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

    function deleteCompany(id) {
        CompanyService.deleteCompany(id)
            .then(() => {
                getCompanies();
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));

                parsedError = parsedError?.body?.error?.message;

                setErrorGrid(parsedError);
            });
    }

    const headers = [
        'Alias',
        'Nombre',
        'RFC',
        'Tipo de entidad',
        'Domicilio Fiscal'
    ];

    function getCells() {
        return ['alias', 'nombre', 'rfc'];
    }

    function getCountries() {
        CountryService.countryGetList().then((data) =>
            setCountries(data?.items)
        );
    }

    function getStateData() {
        StateService.statesGetList().then((data) => setStates(data?.items));
    }

    useEffect(() => {
        getCompanies();
        getCountries();
        getStateData();
    }, []);

    return (
        <>
            <CompanyTable
                loading={loading}
                headers={headers}
                companies={companies}
                deleteCompany={deleteCompany}
                setCompany={setCompany}
                setIsUpdate={setIsUpdate}
                cells={getCells()}
                handleEdit={(company) => {
                    setIsModalOpen(true);
                    setCompany(company);
                    setIsUpdate(true);
                }}
                handleDelete={(id) => deleteCompany(id)}
                accounts={['BBVA Pagos', 'Banamex Ingresos']}
                divisions={['Coatza div 1', 'Coatza div 2']}
            />
            {errorGrid && <ErrorDisplay message={errorGrid} />}

            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-sky-500 text-white p-3 rounded"
            >
                Agregar Empresa
            </button>

            <CompanyModal
                isModalOpen={isModalOpen}
                onCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                }}
                handleSave={(company) => {
                    if (isUpdate) {
                        updateCompany(company);
                    } else {
                        addCompany(company);
                    }
                }}
                error={error}
                company={company}
                setCompany={setCompany}
                setError={setError}
                states={states}
                countries={countries}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
            />
        </>
    );
}
