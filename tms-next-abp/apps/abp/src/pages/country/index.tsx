'use client';
import { useState, useEffect, useRef } from 'react';
import { CountryService } from '@tms_next_abp/proxy';
import CountryModal from '../../components/country/CountryModal';
import CountryUpdateModal from '../../components/country/CountryUpdateModal';
import Table from '../../components/country/Table';

export default function Countries() {
    const [mounted, setMounted] = useState(false);
    const [countries, setCountries] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCountry, setCurrentCountry] = useState({});
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function addCountry(countryName: string) {
        CountryService.addCountry({
            nombre: countryName
        })
            .then(() => {
                getCountryData();
                setIsModalOpen(false);
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

    function updateCountry(id: string, name: string) {
        CountryService.countryUpdate(id, name)
            .then(() => {
                getCountryData();
            })
            .finally(() => {
                setIsModalUpdateOpen(false);
            })
            .catch((error) => {
                console.error('Error updating country:', error);
            });
    }

    async function getCountryData() {
        setLoading(true);
        CountryService.countryGetList()
            .then((data) => setCountries(data?.items))
            .finally(() => setLoading(false))
            .catch((error) => {
                console.error('Error getting country:', error);
            });
    }

    async function deleteCountry(id: string) {
        CountryService.deleteCountry(id)
            .then(() => {
                setCountries((prev) =>
                    prev.filter((country) => country.id !== id)
                );
            })
            .catch((error) => {
                console.error('Error deleting country:', error);
            });
    }

    useEffect(() => {
        setMounted(true);
        getCountryData();
    }, []);

    return (
        <div>
            <Table
                countries={countries}
                setCurrentCountry={setCurrentCountry}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                deleteCountry={deleteCountry}
                loading={loading}
            />
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-sky-500 text-white p-3 rounded"
            >
                Agregar Pais
            </button>

            <CountryModal
                isModalOpen={isModalOpen}
                onCloseModal={() => setIsModalOpen(false)}
                addCountry={addCountry}
                error={error}
                setError={setError}
            ></CountryModal>
            <CountryUpdateModal
                isModalOpen={isModalUpdateOpen}
                onCloseModal={() => setIsModalUpdateOpen(false)}
                currentCountry={currentCountry}
                updateCountry={(currentCountry) =>
                    updateCountry(currentCountry.id, currentCountry.countryName)
                }
                setCurrentCountry={(country) => setCurrentCountry(country)}
            ></CountryUpdateModal>
        </div>
    );
}
